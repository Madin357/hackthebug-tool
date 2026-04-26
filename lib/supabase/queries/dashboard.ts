import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'
import type { ReportStatus } from '@/lib/types'

type Client = SupabaseClient<Database>

export interface ResearcherDashboardStats {
  totalReports: number
  acceptedReports: number
  pendingTriage: number
  totalRewards: number
  reputationScore: number
  rank: number
}

/**
 * Statuses we treat as "accepted" — the schema has no literal 'accepted'
 * value, so a report counts as accepted once the org has moved it past
 * triage and either resolved or rewarded it.
 */
const ACCEPTED_STATUSES: ReportStatus[] = ['resolved', 'rewarded']

/**
 * Statuses we treat as "pending review" for the researcher — the report
 * has been submitted (`pending`) or the org is actively looking at it
 * (`triaged`) but has not yet been accepted or rejected.
 */
const PENDING_STATUSES: ReportStatus[] = ['pending', 'triaged']

/**
 * Aggregates the six KPI tiles on the researcher dashboard for a single
 * researcher in three parallel round-trips:
 *
 *   1. The researcher's own profile row (for `points` / `reputation`).
 *   2. Every report they own (for the count + sum buckets).
 *   3. All researcher profiles ordered by `points` desc (for rank).
 *
 * Rank is computed by `findIndex` on the points-ordered list — sufficient
 * for the demo dataset (~10 researchers). At scale this should switch to
 * `count(*) WHERE points > $me.points + 1` to avoid the round-trip.
 */
export async function getResearcherDashboardStats(
  client: Client,
  researcherId: string,
): Promise<ResearcherDashboardStats> {
  const [profileRes, reportsRes, rankingRes] = await Promise.all([
    client
      .from('profiles')
      .select('id, points, reputation, total_rewards')
      .eq('id', researcherId)
      .maybeSingle(),
    client
      .from('reports')
      .select('status, reward_amount')
      .eq('researcher_id', researcherId),
    client
      .from('profiles')
      .select('id, points')
      .eq('role', 'researcher')
      .order('points', { ascending: false }),
  ])

  if (profileRes.error) throw profileRes.error
  if (reportsRes.error) throw reportsRes.error
  if (rankingRes.error) throw rankingRes.error

  const profile = profileRes.data
  const reports = (reportsRes.data ?? []) as Array<{
    status: ReportStatus
    reward_amount: number | null
  }>
  const ranking = (rankingRes.data ?? []) as Array<{
    id: string
    points: number
  }>

  const totalReports = reports.length
  const acceptedReports = reports.filter((r) =>
    ACCEPTED_STATUSES.includes(r.status),
  ).length
  const pendingTriage = reports.filter((r) =>
    PENDING_STATUSES.includes(r.status),
  ).length
  const totalRewards = reports.reduce(
    (sum, r) =>
      sum + (typeof r.reward_amount === 'number' ? r.reward_amount : 0),
    0,
  )

  // Reputation: prefer the DB value; if missing or zero, derive a safe
  // fallback from the accepted/submitted ratio. Brand-new researchers
  // with zero reports get 0.
  const dbReputation = profile?.reputation ?? 0
  const reputationScore =
    dbReputation > 0
      ? dbReputation
      : totalReports > 0
        ? Math.round((acceptedReports / totalReports) * 100)
        : 0

  const rankIndex = ranking.findIndex((r) => r.id === researcherId)
  const rank = rankIndex >= 0 ? rankIndex + 1 : ranking.length + 1

  return {
    totalReports,
    acceptedReports,
    pendingTriage,
    totalRewards,
    reputationScore,
    rank,
  }
}
