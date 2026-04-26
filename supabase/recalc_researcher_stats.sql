-- Recalculates the five "snapshot" scoring columns on every researcher
-- profile from the actual `reports` rows. Run this in the Supabase SQL
-- Editor whenever the snapshots drift (e.g. after seed updates, manual
-- inserts, or status corrections).
--
-- Source of truth for the formulas is
-- `lib/scoring/researcher-stats.ts > computeResearcherStats()`.
-- Keep the constants here in sync with that file in the same change.
--
--   Points        = sum over reports of (severity_base * status_multiplier)
--   Reputation    = round(min(100, accepted_ratio * 80 + min(total, 20)))
--                   where accepted_ratio = (resolved+rewarded) / total
--                   returns 0 when total = 0
--   reports_*     = simple counts
--   total_rewards = sum(reward_amount) with NULLs treated as 0

WITH per_researcher AS (
  SELECT
    r.researcher_id AS researcher_id,
    COUNT(*)::int AS reports_submitted,
    COUNT(*) FILTER (WHERE r.status IN ('resolved', 'rewarded'))::int
      AS reports_accepted,
    COALESCE(SUM(COALESCE(r.reward_amount, 0)), 0)::numeric AS total_rewards,
    COALESCE(
      SUM(
        CASE r.severity
          WHEN 'informational' THEN 10
          WHEN 'low'           THEN 25
          WHEN 'medium'        THEN 75
          WHEN 'high'          THEN 200
          WHEN 'critical'      THEN 500
          ELSE 0
        END
        *
        CASE r.status
          WHEN 'rewarded'  THEN 1.5
          WHEN 'resolved'  THEN 1.2
          WHEN 'triaged'   THEN 0.6
          WHEN 'pending'   THEN 0.3
          WHEN 'duplicate' THEN 0.1
          ELSE 0
        END
      ),
      0
    ) AS points_raw
  FROM public.reports r
  WHERE r.researcher_id IS NOT NULL
  GROUP BY r.researcher_id
)
UPDATE public.profiles AS p
SET
  reports_submitted = COALESCE(pr.reports_submitted, 0),
  reports_accepted  = COALESCE(pr.reports_accepted, 0),
  total_rewards     = COALESCE(pr.total_rewards, 0),
  points            = COALESCE(ROUND(pr.points_raw)::int, 0),
  reputation        = CASE
    WHEN COALESCE(pr.reports_submitted, 0) = 0 THEN 0
    ELSE LEAST(
      100,
      ROUND(
        (pr.reports_accepted::numeric / pr.reports_submitted::numeric) * 80
        + LEAST(pr.reports_submitted, 20)
      )
    )::int
  END,
  updated_at = now()
FROM per_researcher AS pr
RIGHT JOIN public.profiles AS p_join ON p_join.id = pr.researcher_id
WHERE p.id = p_join.id
  AND p.role = 'researcher';

-- Researchers with zero reports never appear in `per_researcher` (LEFT JOIN
-- would help, but a RIGHT JOIN produces null rows we'd have to coalesce).
-- Reset their snapshots in a second pass so a researcher with no reports
-- doesn't keep a stale points/reputation from a previous seed.
UPDATE public.profiles
SET
  reports_submitted = 0,
  reports_accepted  = 0,
  total_rewards     = 0,
  points            = 0,
  reputation        = 0,
  updated_at        = now()
WHERE role = 'researcher'
  AND id NOT IN (
    SELECT DISTINCT researcher_id
    FROM public.reports
    WHERE researcher_id IS NOT NULL
  );

-- Sanity check: the leaderboard should now match the values the frontend
-- helper computes.
SELECT
  display_name,
  handle,
  reports_submitted,
  reports_accepted,
  total_rewards,
  points,
  reputation
FROM public.profiles
WHERE role = 'researcher'
ORDER BY points DESC;
