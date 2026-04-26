import type { ReportStatus, Severity } from '@/lib/types'

/**
 * Base points awarded per accepted/rewarded report by severity. Multiplied
 * by the status multiplier below to produce the contribution of a single
 * report to a researcher's total points.
 */
export const SEVERITY_POINTS: Record<Severity, number> = {
  informational: 10,
  low: 25,
  medium: 75,
  high: 200,
  critical: 500,
}

/**
 * Status multiplier applied on top of the severity base. `rewarded` and
 * `resolved` are full credit (and a small bonus), `triaged`/`pending` are
 * partial (in-flight reports still count for momentum), `duplicate` is a
 * tiny credit (researcher did the work even if someone beat them to it),
 * `invalid` and `draft` award zero.
 */
export const STATUS_MULTIPLIER: Record<ReportStatus, number> = {
  rewarded: 1.5,
  resolved: 1.2,
  triaged: 0.6,
  pending: 0.3,
  duplicate: 0.1,
  invalid: 0,
  draft: 0,
}

const ACCEPTED_STATUSES: ReadonlyArray<ReportStatus> = ['resolved', 'rewarded']

/**
 * Minimal report shape required for scoring. Anything that has the three
 * fields can be passed in — both raw Supabase rows (`reward_amount: number
 * | null`) and mapped domain `Report` objects (where `reward` is optional)
 * fit, after a tiny shape-normalising adapter at the call site.
 */
export interface ScoringReport {
  severity: Severity
  status: ReportStatus
  reward_amount: number | null
}

export interface ResearcherStats {
  reportsSubmitted: number
  reportsAccepted: number
  totalRewards: number
  points: number
  reputation: number
}

/**
 * Single source of truth for the five researcher scoring fields. The
 * matching SQL recalc lives at `supabase/recalc_researcher_stats.sql`
 * and MUST keep the same constants — when you tweak one, mirror the
 * other in the same change.
 *
 * Points = sum over reports of `SEVERITY_POINTS[severity] *
 * STATUS_MULTIPLIER[status]`, rounded to an integer.
 *
 * Reputation = `round(min(100, accepted_ratio*80 + min(total, 20)))`
 * where `accepted_ratio` counts `resolved` + `rewarded`. Returns 0 when
 * the researcher has no reports so freshly seeded accounts don't land at
 * a misleadingly high score.
 */
export function computeResearcherStats(
  reports: ReadonlyArray<ScoringReport>,
): ResearcherStats {
  const reportsSubmitted = reports.length
  const reportsAccepted = reports.filter((r) =>
    ACCEPTED_STATUSES.includes(r.status),
  ).length
  const totalRewards = reports.reduce(
    (sum, r) =>
      sum + (typeof r.reward_amount === 'number' ? r.reward_amount : 0),
    0,
  )
  const pointsRaw = reports.reduce((sum, r) => {
    const base = SEVERITY_POINTS[r.severity] ?? 0
    const mult = STATUS_MULTIPLIER[r.status] ?? 0
    return sum + base * mult
  }, 0)
  const points = Math.round(pointsRaw)
  const reputation =
    reportsSubmitted === 0
      ? 0
      : Math.round(
          Math.min(
            100,
            (reportsAccepted / reportsSubmitted) * 80 +
              Math.min(reportsSubmitted, 20),
          ),
        )
  return { reportsSubmitted, reportsAccepted, totalRewards, points, reputation }
}
