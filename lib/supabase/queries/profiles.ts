import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ProfileRow } from '@/lib/supabase/database.types'
import type { Researcher } from '@/lib/types'
import { mapResearcher } from '@/lib/supabase/mappers'

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
 * Researcher leaderboard. Returns researchers ordered by points descending,
 * with a 1-based `rank` attached. Only `role = 'researcher'`.
 */
export async function listResearchers(
  client: Client,
  limit = 50,
): Promise<Researcher[]> {
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('role', 'researcher')
    .order('points', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((row, index) => mapResearcher(row, index + 1))
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
