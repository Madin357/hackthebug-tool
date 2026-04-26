import type {
  Organization,
  Program,
  ProgramUpdate,
  Report,
  Researcher,
  ScopeItem,
  RewardTier,
  Severity,
  ReportStatus,
  ProgramStatus,
  ProgramType,
} from '@/lib/types'
import type {
  OrganizationRow,
  ProfileRow,
  ProgramRewardRow,
  ProgramRow,
  ProgramScopeRow,
  ReportRow,
} from '@/lib/supabase/database.types'
import type { ResearcherStats } from '@/lib/scoring/researcher-stats'

/**
 * DB row → app domain type. The frontend components were written against
 * `lib/types.ts` (camelCase, nested `rewardRange` / `responseTime` etc.);
 * mapping here keeps every page & component unchanged when the data source
 * flips from `lib/mock-data.ts` to live Supabase queries.
 *
 * Conventions:
 *   - snake_case → camelCase
 *   - `rewardRange = { min, max }` is composed from `reward_min` / `reward_max`
 *   - `responseTime = { firstResponse, triage, resolution }` from the three
 *     `response_*` columns
 *   - `program_type` → `type`
 *   - Joined columns (`organization`, `scopes`, `rewards`, etc.) are
 *     accepted as optional inputs.
 */

export function mapOrganization(row: OrganizationRow): Organization {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    industry: row.industry,
  }
}

export function mapScope(row: ProgramScopeRow): ScopeItem {
  return {
    target: row.target,
    type: (row.asset_type ?? 'other') as ScopeItem['type'],
    description: row.description ?? undefined,
  }
}

export function mapReward(row: ProgramRewardRow): RewardTier {
  return {
    severity: row.severity as Severity,
    minReward: row.min_reward,
    maxReward: row.max_reward,
    sla: row.sla ?? '',
  }
}

/** A row from `programs` joined with the parent organization (name only). */
export interface ProgramRowWithOrg extends ProgramRow {
  organization: { name: string } | { name: string }[] | null
}

/** A row from `programs` joined with org + scopes + rewards (program detail). */
export interface ProgramRowWithRelations extends ProgramRow {
  organization: { name: string; id: string } | { name: string; id: string }[] | null
  scopes: ProgramScopeRow[] | null
  rewards: ProgramRewardRow[] | null
}

function pickJoinedOne<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null
  if (Array.isArray(value)) return value[0] ?? null
  return value
}

function orgNameFromJoin(value: ProgramRowWithOrg['organization']): string {
  const one = pickJoinedOne(value)
  return one?.name ?? ''
}

function baseProgram(row: ProgramRow, organizationName: string): Program {
  return {
    id: row.id,
    name: row.name,
    organization: organizationName,
    slug: row.slug,
    description: row.description,
    longDescription: row.long_description ?? undefined,
    industry: row.industry,
    status: row.status as ProgramStatus,
    type: row.program_type as ProgramType,
    rewardRange: { min: row.reward_min, max: row.reward_max },
    assetsCount: row.assets_count,
    lastUpdated: row.last_updated ?? row.updated_at,
    tags: row.tags ?? [],
    featured: row.featured,
    inScope: [],
    outOfScope: [],
    rewards: [],
    rules: row.rules ?? [],
    updates: [],
    hallOfFame: [],
    responseTime: {
      firstResponse: row.response_first ?? '',
      triage: row.response_triage ?? '',
      resolution: row.response_resolution ?? '',
    },
  }
}

/** For program cards / directory listings (no scopes / rewards / details). */
export function mapProgramSummary(row: ProgramRowWithOrg): Program {
  return baseProgram(row, orgNameFromJoin(row.organization))
}

/** For the `/programs/[slug]` detail view (full join). */
export function mapProgramDetail(row: ProgramRowWithRelations): Program {
  const program = baseProgram(row, orgNameFromJoin(row.organization))
  const scopes = row.scopes ?? []
  program.inScope = scopes.filter((s) => s.in_scope).map(mapScope)
  program.outOfScope = scopes.filter((s) => !s.in_scope).map((s) => s.target)

  // Order severities critical → informational so the table reads top-down.
  const severityOrder: Record<Severity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
    informational: 4,
  }
  program.rewards = (row.rewards ?? [])
    .map(mapReward)
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  // `updates` and `hallOfFame` aren't modelled in the MVP DB. The detail
  // page renders empty states for both; keep the arrays for type safety.
  program.updates = [] as ProgramUpdate[]
  program.hallOfFame = []
  return program
}

/**
 * Researcher card / leaderboard / profile lookup.
 *
 * `stats` is the canonical source of truth for the five scoring fields
 * (`points`, `reputation`, `reports*`, `totalRewards`) and MUST be
 * provided by the query layer — the `profiles` table columns of the
 * same names are snapshots that drift. See
 * `lib/scoring/researcher-stats.ts` for how they're computed.
 */
export function mapResearcher(
  row: ProfileRow,
  rank: number,
  stats: ResearcherStats,
): Researcher {
  return {
    id: row.id,
    name: row.display_name,
    handle: row.handle ?? row.display_name.toLowerCase().replace(/\s+/g, ''),
    avatar: row.avatar_url ?? undefined,
    country: row.country,
    countryCode: row.country_code,
    points: stats.points,
    reportsAccepted: stats.reportsAccepted,
    reportsSubmitted: stats.reportsSubmitted,
    reputation: stats.reputation,
    rank,
    badges: [],
    joinedDate: row.joined_at,
    totalRewards: stats.totalRewards,
  }
}

/** A row from `reports` joined with the parent program (name only). */
export interface ReportRowWithProgram extends ReportRow {
  program: { name: string; slug: string } | { name: string; slug: string }[] | null
}

export function mapReport(row: ReportRowWithProgram): Report {
  const program = pickJoinedOne(row.program)
  return {
    id: row.id,
    title: row.title,
    programId: row.program_id,
    programName: program?.name ?? '',
    severity: row.severity as Severity,
    status: row.status as ReportStatus,
    submittedDate: row.submitted_at,
    lastUpdated: row.updated_at,
    reward: row.reward_amount ?? undefined,
    asset: row.asset ?? '',
    weaknessType: row.weakness_type ?? '',
  }
}
