import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ProfileRow } from '@/lib/supabase/database.types'
import type { ReportStatus, Researcher, Severity } from '@/lib/types'
import { mapResearcher } from '@/lib/supabase/mappers'
import {
  computeResearcherStats,
  type ScoringReport,
} from '@/lib/scoring/researcher-stats'

type Client = SupabaseClient<Database>

/**
 * Raw profile row by id. Used by the auth provider to enrich a Supabase
 * Auth user with display name + role + organization link.
 */
export async function getProfileById(
  client: Client,
  id: string,
): Promise<ProfileRow | null> {
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data ?? null
}

/** Profile lookup by email — fallback when we don't have an auth uid yet. */
export async function getProfileByEmail(
  client: Client,
  email: string,
): Promise<ProfileRow | null> {
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  if (error) throw error
  return data ?? null
}

/**
 * Researcher leaderboard. Pulls every researcher profile and every
 * report in parallel, then computes scoring fields (points, reputation,
 * report counts, total rewards) from the reports via
 * `computeResearcherStats`. The persisted `profiles.points/...` columns
 * are snapshots and intentionally ignored — the helper is the single
 * source of truth, see CLAUDE.md > "Researcher stats are derived from
 * reports". Final order is by computed points descending; rank is
 * 1-based on that order.
 */
export async function listResearchers(
  client: Client,
  limit = 50,
): Promise<Researcher[]> {
  const [profilesRes, reportsRes] = await Promise.all([
    client
      .from('profiles')
      .select('*')
      .eq('role', 'researcher')
      .limit(limit),
    client
      .from('reports')
      .select('researcher_id, severity, status, reward_amount'),
  ])

  if (profilesRes.error) throw profilesRes.error
  if (reportsRes.error) throw reportsRes.error

  const profiles = (profilesRes.data ?? []) as ProfileRow[]
  const reportRows = (reportsRes.data ?? []) as Array<{
    researcher_id: string | null
    severity: Severity
    status: ReportStatus
    reward_amount: number | null
  }>

  const byResearcher = new Map<string, ScoringReport[]>()
  for (const r of reportRows) {
    if (!r.researcher_id) continue
    const list = byResearcher.get(r.researcher_id) ?? []
    list.push({
      severity: r.severity,
      status: r.status,
      reward_amount: r.reward_amount,
    })
    byResearcher.set(r.researcher_id, list)
  }

  const enriched = profiles.map((row) => ({
    row,
    stats: computeResearcherStats(byResearcher.get(row.id) ?? []),
  }))

  enriched.sort((a, b) => {
    if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points
    if (b.stats.reportsAccepted !== a.stats.reportsAccepted) {
      return b.stats.reportsAccepted - a.stats.reportsAccepted
    }
    return a.row.display_name.localeCompare(b.row.display_name)
  })

  return enriched.map(({ row, stats }, index) =>
    mapResearcher(row, index + 1, stats),
  )
}

/**
 * Promote the freshly-created researcher profile (auto-inserted by the
 * `on_auth_user_created` trigger) into an organization profile linked to
 * the just-created org. The CHECK constraint on profiles requires
 * `role = 'organization' AND organization_id IS NOT NULL` together, so
 * the UPDATE sets both columns in one statement.
 */
export async function completeOrganizationProfile(
  client: Client,
  params: {
    profileId: string
    organizationId: string
    displayName?: string
  },
): Promise<ProfileRow> {
  const update: Database['public']['Tables']['profiles']['Update'] = {
    role: 'organization',
    organization_id: params.organizationId,
  }
  if (params.displayName) update.display_name = params.displayName
  const { data, error } = await client
    .from('profiles')
    .update(update)
    .eq('id', params.profileId)
    .select('*')
    .single()
  if (error) throw error
  return data
}

/** Update a researcher's display name / handle after sign-up. */
export async function updateResearcherProfile(
  client: Client,
  params: {
    profileId: string
    displayName?: string
    handle?: string | null
  },
): Promise<ProfileRow> {
  const update: Database['public']['Tables']['profiles']['Update'] = {}
  if (params.displayName) update.display_name = params.displayName
  if (params.handle !== undefined) update.handle = params.handle
  const { data, error } = await client
    .from('profiles')
    .update(update)
    .eq('id', params.profileId)
    .select('*')
    .single()
  if (error) throw error
  return data
}
