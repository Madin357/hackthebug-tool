import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'
import type { Program, ProgramStatus, ProgramType, Severity } from '@/lib/types'
import {
  mapProgramSummary,
  mapProgramDetail,
  type ProgramRowWithOrg,
  type ProgramRowWithRelations,
} from '@/lib/supabase/mappers'

type Client = SupabaseClient<Database>

/**
 * Programs list (cards). Joins the parent organization name only — keeps
 * the payload tight for the directory grid.
 */
export async function listPrograms(client: Client): Promise<Program[]> {
  const { data, error } = await client
    .from('programs')
    .select('*, organization:organizations(name)')
    .order('last_updated', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapProgramSummary(row as ProgramRowWithOrg))
}

/** Featured-flag subset, used by the home page. */
export async function listFeaturedPrograms(
  client: Client,
  limit = 3,
): Promise<Program[]> {
  const { data, error } = await client
    .from('programs')
    .select('*, organization:organizations(name)')
    .eq('featured', true)
    .order('last_updated', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((row) => mapProgramSummary(row as ProgramRowWithOrg))
}

/** All programs owned by a single organization (org-dashboard list). */
export async function listProgramsForOrganization(
  client: Client,
  organizationId: string,
): Promise<Program[]> {
  const { data, error } = await client
    .from('programs')
    .select('*, organization:organizations(name)')
    .eq('organization_id', organizationId)
    .order('last_updated', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapProgramSummary(row as ProgramRowWithOrg))
}

/** Single program by slug, with scopes + rewards. Returns null if missing. */
export async function getProgramBySlug(
  client: Client,
  slug: string,
): Promise<Program | null> {
  const { data, error } = await client
    .from('programs')
    .select(
      `*,
       organization:organizations(id, name),
       scopes:program_scopes(*),
       rewards:program_rewards(*)`,
    )
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return mapProgramDetail(data as unknown as ProgramRowWithRelations)
}

// ─── Reward tiers used by the create-program form ──────────────────────────
// Same values as the SQL seed; centralised here so the org-create flow and
// the seed stay in lock-step.

export type RewardTierKey = 'low' | 'standard' | 'high' | 'top'

interface RewardTierDefinition {
  rewardMin: number
  rewardMax: number
  responseFirst: string
  responseTriage: string
  responseResolution: string
  rewards: Array<{
    severity: Severity
    minReward: number
    maxReward: number
    sla: string
  }>
}

export const REWARD_TIERS: Record<RewardTierKey, RewardTierDefinition> = {
  low: {
    rewardMin: 50,
    rewardMax: 3500,
    responseFirst: '< 12 hours',
    responseTriage: '< 48 hours',
    responseResolution: '< 30 days',
    rewards: [
      { severity: 'critical',      minReward: 1500, maxReward: 3500, sla: '24 hours' },
      { severity: 'high',          minReward: 600,  maxReward: 1200, sla: '48 hours' },
      { severity: 'medium',        minReward: 200,  maxReward: 450,  sla: '72 hours' },
      { severity: 'low',           minReward: 50,   maxReward: 125,  sla: '5 days' },
      { severity: 'informational', minReward: 0,    maxReward: 25,   sla: '7 days' },
    ],
  },
  standard: {
    rewardMin: 75,
    rewardMax: 5000,
    responseFirst: '< 8 hours',
    responseTriage: '< 24 hours',
    responseResolution: '< 21 days',
    rewards: [
      { severity: 'critical',      minReward: 2000, maxReward: 5000, sla: '24 hours' },
      { severity: 'high',          minReward: 700,  maxReward: 1500, sla: '48 hours' },
      { severity: 'medium',        minReward: 250,  maxReward: 550,  sla: '72 hours' },
      { severity: 'low',           minReward: 75,   maxReward: 175,  sla: '5 days' },
      { severity: 'informational', minReward: 0,    maxReward: 50,   sla: '7 days' },
    ],
  },
  high: {
    rewardMin: 100,
    rewardMax: 7000,
    responseFirst: '< 4 hours',
    responseTriage: '< 16 hours',
    responseResolution: '< 14 days',
    rewards: [
      { severity: 'critical',      minReward: 3500, maxReward: 7000, sla: '12 hours' },
      { severity: 'high',          minReward: 1200, maxReward: 2500, sla: '24 hours' },
      { severity: 'medium',        minReward: 350,  maxReward: 800,  sla: '48 hours' },
      { severity: 'low',           minReward: 100,  maxReward: 250,  sla: '5 days' },
      { severity: 'informational', minReward: 0,    maxReward: 100,  sla: '7 days' },
    ],
  },
  top: {
    rewardMin: 150,
    rewardMax: 9000,
    responseFirst: '< 2 hours',
    responseTriage: '< 12 hours',
    responseResolution: '< 10 days',
    rewards: [
      { severity: 'critical',      minReward: 4500, maxReward: 9000, sla: '8 hours' },
      { severity: 'high',          minReward: 1500, maxReward: 3000, sla: '24 hours' },
      { severity: 'medium',        minReward: 400,  maxReward: 1000, sla: '48 hours' },
      { severity: 'low',           minReward: 150,  maxReward: 300,  sla: '3 days' },
      { severity: 'informational', minReward: 0,    maxReward: 150,  sla: '5 days' },
    ],
  },
}

const COMMON_OUT_OF_SCOPE = [
  'Production systems and real user data',
  'Social engineering of employees, partners, or customers',
  'Denial of service or load testing',
  'Physical security testing',
  'Aggressive scanning or brute-force attempts',
  'Third-party integrations not owned by the organization',
]

const COMMON_RULES = [
  'No live testing of real systems is authorized',
  'Use only synthetic test data; never touch production',
  'Report findings only through the official channel once it exists',
  'Do not publicly disclose findings without coordination',
  'Respect operational safety, user privacy, and applicable law',
]

export interface CreateProgramScope {
  target: string
  type: 'web' | 'api' | 'mobile' | 'cloud' | 'network' | 'other'
}

export interface CreateProgramInput {
  organizationId: string
  industry: string
  slug: string
  name: string
  description: string
  longDescription?: string | null
  status: ProgramStatus
  programType: ProgramType
  tier: RewardTierKey
  featured: boolean
  inScope: CreateProgramScope[]
  /** Optional extra out-of-scope items (the COMMON ones are always added). */
  extraOutOfScope?: string[]
  tags?: string[]
}

/**
 * Compose a new program: insert the program row, then its scopes (in-scope
 * + the COMMON out-of-scope baseline), then the 5 severity reward rows
 * for the chosen tier. Returns the new slug for redirect.
 *
 * Errors aren't caught here — let them bubble up so the form can render
 * a clear message.
 */
export async function createProgramWithScopesAndRewards(
  client: Client,
  input: CreateProgramInput,
): Promise<{ id: string; slug: string }> {
  const tier = REWARD_TIERS[input.tier]

  const tags = input.tags && input.tags.length > 0
    ? input.tags
    : ['Sample']

  // 1. Program row.
  const { data: program, error: programError } = await client
    .from('programs')
    .insert({
      organization_id: input.organizationId,
      slug: input.slug,
      name: input.name,
      description: input.description,
      long_description: input.longDescription ?? null,
      industry: input.industry,
      status: input.status,
      program_type: input.programType,
      reward_min: tier.rewardMin,
      reward_max: tier.rewardMax,
      assets_count: input.inScope.length,
      featured: input.featured,
      response_first: tier.responseFirst,
      response_triage: tier.responseTriage,
      response_resolution: tier.responseResolution,
      tags,
      rules: COMMON_RULES,
      last_updated: new Date().toISOString().slice(0, 10),
    })
    .select('id, slug')
    .single()

  if (programError) throw programError

  const programId = program.id
  const programSlug = program.slug

  // 2. Scope rows.
  const scopeRows: Database['public']['Tables']['program_scopes']['Insert'][] = []
  for (const scope of input.inScope) {
    scopeRows.push({
      program_id: programId,
      in_scope: true,
      target: scope.target,
      asset_type: scope.type,
      description: 'Pending official authorization',
    })
  }
  for (const oos of [...COMMON_OUT_OF_SCOPE, ...(input.extraOutOfScope ?? [])]) {
    scopeRows.push({
      program_id: programId,
      in_scope: false,
      target: oos,
      asset_type: 'other',
      description: null,
    })
  }
  if (scopeRows.length > 0) {
    const { error: scopesError } = await client.from('program_scopes').insert(scopeRows)
    if (scopesError) throw scopesError
  }

  // 3. Reward rows.
  const rewardRows = tier.rewards.map((r) => ({
    program_id: programId,
    severity: r.severity,
    min_reward: r.minReward,
    max_reward: r.maxReward,
    sla: r.sla,
  }))
  const { error: rewardsError } = await client.from('program_rewards').insert(rewardRows)
  if (rewardsError) throw rewardsError

  return { id: programId, slug: programSlug }
}
