import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'
import type { ReportStatus, Severity } from '@/lib/types'
import {
  computeResearcherStats,
  type ScoringReport,
} from '@/lib/scoring/researcher-stats'

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
 * researcher in two parallel round-trips:
 *
 *   1. Every report they own — feeds `computeResearcherStats()` for the
 *      five derived fields (totalReports, acceptedReports, totalRewards,
 *      points, reputation). `pendingTriage` is also derived from the
 *      same rows.
 *   2. Every researcher's reports (lightweight projection) so we can
 *      compute everyone's points and rank the current researcher
 *      against them.
 *
 * The persisted `profiles.points / profiles.reputation` columns are
 * intentionally not read — the helper is the single source of truth
 * (see CLAUDE.md > "Researcher stats are derived from reports").
 * Sufficient for the demo dataset (~10 researchers, single-digit
 * report rows each); at scale, replace the second round-trip with a
 * SQL view or RPC that returns ranked points.
 */
export async function getResearcherDashboardStats(
  client: Client,
  researcherId: string,
): Promise<ResearcherDashboardStats> {
  const [reportsRes, allReportsRes] = await Promise.all([
    client
      .from('reports')
      .select('severity, status, reward_amount')
      .eq('researcher_id', researcherId),
    client
      .from('reports')
      .select('researcher_id, severity, status, reward_amount')
      .not('researcher_id', 'is', null),
  ])

  if (reportsRes.error) throw reportsRes.error
  if (allReportsRes.error) throw allReportsRes.error

  const myReports = (reportsRes.data ?? []) as Array<{
    severity: Severity
    status: ReportStatus
    reward_amount: number | null
  }>

  const myStats = computeResearcherStats(myReports)
  const pendingTriage = myReports.filter((r) =>
    PENDING_STATUSES.includes(r.status),
  ).length

  // Rank: compute every researcher's points from the same dataset.
  const allReportsRows = (allReportsRes.data ?? []) as Array<{
    researcher_id: string | null
    severity: Severity
    status: ReportStatus
    reward_amount: number | null
  }>
  const byResearcher = new Map<string, ScoringReport[]>()
  for (const r of allReportsRows) {
    if (!r.researcher_id) continue
    const list = byResearcher.get(r.researcher_id) ?? []
    list.push({
      severity: r.severity,
      status: r.status,
      reward_amount: r.reward_amount,
    })
    byResearcher.set(r.researcher_id, list)
  }
  // Make sure the current researcher is in the ranking even when they
  // have zero reports — otherwise a brand-new account would skip the
  // bottom of the list and pretend to be unranked.
  if (!byResearcher.has(researcherId)) byResearcher.set(researcherId, [])

  const ranked = Array.from(byResearcher.entries())
    .map(([id, reports]) => ({
      id,
      points: computeResearcherStats(reports).points,
    }))
    .sort((a, b) => b.points - a.points)
  const rankIndex = ranked.findIndex((r) => r.id === researcherId)
  const rank = rankIndex >= 0 ? rankIndex + 1 : ranked.length + 1

  return {
    totalReports: myStats.reportsSubmitted,
    acceptedReports: myStats.reportsAccepted,
    pendingTriage,
    totalRewards: myStats.totalRewards,
    reputationScore: myStats.reputation,
    rank,
  }
}

// ─── Organization dashboard ───────────────────────────────────────────────

export interface OrganizationDashboardStats {
  totalReports: number
  openReports: number
  avgTriageHours: number | null
  criticalFindings: number
  rewardsPaid: number
  resolvedThisMonth: number
}

const OPEN_STATUSES: ReportStatus[] = ['pending', 'triaged']
const RESOLVED_STATUSES: ReportStatus[] = ['resolved', 'rewarded']

/**
 * Aggregates the six KPI tiles + supporting numbers on the organization
 * dashboard for the org currently signed in.
 *
 * `avgTriageHours` is computed from `report_timeline_events`: for every
 * report the org owns, the gap between the `submitted` event and the
 * first `triaged` event is averaged. Reports that have not been triaged
 * yet are skipped. Returns `null` when no triaged events exist (rendered
 * as `—`).
 */
export async function getOrganizationDashboardStats(
  client: Client,
  organizationId: string,
): Promise<OrganizationDashboardStats> {
  const reportsRes = await client
    .from('reports')
    .select(
      'id, severity, status, reward_amount, submitted_at, program:programs!inner(organization_id)',
    )
    .eq('program.organization_id', organizationId)

  if (reportsRes.error) throw reportsRes.error
  const rows = (reportsRes.data ?? []) as Array<{
    id: string
    severity: Severity
    status: ReportStatus
    reward_amount: number | null
    submitted_at: string
  }>

  const totalReports = rows.length
  const openReports = rows.filter((r) => OPEN_STATUSES.includes(r.status)).length
  const criticalFindings = rows.filter((r) => r.severity === 'critical').length
  const rewardsPaid = rows.reduce(
    (sum, r) =>
      sum + (typeof r.reward_amount === 'number' ? r.reward_amount : 0),
    0,
  )

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const resolvedThisMonth = rows.filter(
    (r) =>
      RESOLVED_STATUSES.includes(r.status) &&
      new Date(r.submitted_at) >= monthStart,
  ).length

  // Average triage time from report_timeline_events: pair each `submitted`
  // event with its report's first `triaged` event. We bound the query by
  // the report ids we just loaded so RLS / scope stay tight.
  let avgTriageHours: number | null = null
  if (rows.length > 0) {
    const reportIds = rows.map((r) => r.id)
    const eventsRes = await client
      .from('report_timeline_events')
      .select('report_id, event_type, created_at')
      .in('report_id', reportIds)
      .in('event_type', ['submitted', 'triaged'])
      .order('created_at', { ascending: true })

    if (eventsRes.error) throw eventsRes.error
    const events = (eventsRes.data ?? []) as Array<{
      report_id: string
      event_type: 'submitted' | 'triaged'
      created_at: string
    }>

    const submittedAt = new Map<string, number>()
    const deltas: number[] = []
    for (const e of events) {
      const ts = new Date(e.created_at).getTime()
      if (e.event_type === 'submitted') {
        if (!submittedAt.has(e.report_id)) submittedAt.set(e.report_id, ts)
      } else {
        const start = submittedAt.get(e.report_id)
        if (start !== undefined && ts >= start) {
          deltas.push((ts - start) / (1000 * 60 * 60))
          submittedAt.delete(e.report_id)
        }
      }
    }
    if (deltas.length > 0) {
      const total = deltas.reduce((s, d) => s + d, 0)
      avgTriageHours = Math.round(total / deltas.length)
    }
  }

  return {
    totalReports,
    openReports,
    avgTriageHours,
    criticalFindings,
    rewardsPaid,
    resolvedThisMonth,
  }
}

// ─── Chart aggregations (shared shapes for recharts) ──────────────────────

export interface ChartTimelinePoint {
  month: string
  reports: number
  resolved?: number
}

export interface ChartSeverityPoint {
  name: string
  value: number
  fill: string
  severity: Severity
}

export interface ChartPipelinePoint {
  status: ReportStatus
  count: number
  fill: string
}

export interface ChartTopAsset {
  asset: string
  reports: number
  severity: Severity
}

export interface OrganizationChartData {
  timeline: ChartTimelinePoint[]
  severity: ChartSeverityPoint[]
  pipeline: ChartPipelinePoint[]
  topAssets: ChartTopAsset[]
}

export interface ResearcherChartData {
  timeline: ChartTimelinePoint[]
  severity: ChartSeverityPoint[]
}

const SEVERITY_FILLS: Record<Severity, string> = {
  critical: 'var(--chart-5)',
  high: 'var(--chart-4)',
  medium: 'var(--chart-1)',
  low: 'var(--chart-2)',
  informational: 'var(--chart-3)',
}

const PIPELINE_FILLS: Partial<Record<ReportStatus, string>> = {
  pending: 'var(--chart-1)',
  triaged: 'var(--chart-2)',
  resolved: 'var(--chart-3)',
  rewarded: 'var(--chart-4)',
  duplicate: 'var(--chart-5)',
  invalid: 'var(--chart-5)',
}

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const SEVERITY_DISPLAY: Record<Severity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  informational: 'Info',
}

/**
 * Returns the last `monthsBack` calendar months in chronological order
 * as `{key, label}` pairs. `key` is `YYYY-MM` for grouping; `label` is
 * the short month name for the chart axis.
 */
function lastNMonths(
  monthsBack: number,
  now = new Date(),
): Array<{ key: string; label: string }> {
  const out: Array<{ key: string; label: string }> = []
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    out.push({ key, label: SHORT_MONTHS[d.getMonth()] })
  }
  return out
}

function monthKeyOf(date: string): string {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function buildSeverityPoints(
  rows: Array<{ severity: Severity }>,
): ChartSeverityPoint[] {
  const counts: Record<Severity, number> = {
    critical: 0, high: 0, medium: 0, low: 0, informational: 0,
  }
  for (const r of rows) counts[r.severity]++
  const order: Severity[] = ['critical', 'high', 'medium', 'low', 'informational']
  return order.map((sev) => ({
    name: SEVERITY_DISPLAY[sev],
    value: counts[sev],
    fill: SEVERITY_FILLS[sev],
    severity: sev,
  }))
}

function buildTimelinePoints(
  rows: Array<{ submitted_at: string; status: ReportStatus }>,
  monthsBack = 6,
  withResolved = false,
): ChartTimelinePoint[] {
  const months = lastNMonths(monthsBack)
  const counts = new Map<string, { reports: number; resolved: number }>()
  for (const m of months) counts.set(m.key, { reports: 0, resolved: 0 })
  for (const r of rows) {
    const k = monthKeyOf(r.submitted_at)
    const bucket = counts.get(k)
    if (!bucket) continue
    bucket.reports++
    if (RESOLVED_STATUSES.includes(r.status)) bucket.resolved++
  }
  return months.map((m) => {
    const bucket = counts.get(m.key) ?? { reports: 0, resolved: 0 }
    return withResolved
      ? { month: m.label, reports: bucket.reports, resolved: bucket.resolved }
      : { month: m.label, reports: bucket.reports }
  })
}

/** Pipeline counts (status buckets) for the org dashboard horizontal bar. */
function buildPipelinePoints(
  rows: Array<{ status: ReportStatus }>,
): ChartPipelinePoint[] {
  const counts: Record<ReportStatus, number> = {
    draft: 0,
    pending: 0,
    triaged: 0,
    resolved: 0,
    rewarded: 0,
    duplicate: 0,
    invalid: 0,
  }
  for (const r of rows) counts[r.status]++
  // Order: most useful first for the org operator.
  const order: ReportStatus[] = [
    'pending',
    'triaged',
    'resolved',
    'rewarded',
    'duplicate',
    'invalid',
  ]
  return order
    .filter((s) => counts[s] > 0)
    .map((s) => ({
      status: s,
      count: counts[s],
      fill: PIPELINE_FILLS[s] ?? 'var(--chart-1)',
    }))
}

/** Top 5 assets reported against, with the highest severity seen on each. */
function buildTopAssets(
  rows: Array<{ asset: string | null; severity: Severity }>,
): ChartTopAsset[] {
  const severityRank: Record<Severity, number> = {
    critical: 4, high: 3, medium: 2, low: 1, informational: 0,
  }
  const buckets = new Map<string, { reports: number; severity: Severity }>()
  for (const r of rows) {
    if (!r.asset) continue
    const cur = buckets.get(r.asset)
    if (!cur) {
      buckets.set(r.asset, { reports: 1, severity: r.severity })
    } else {
      cur.reports++
      if (severityRank[r.severity] > severityRank[cur.severity]) {
        cur.severity = r.severity
      }
    }
  }
  return Array.from(buckets.entries())
    .sort((a, b) => b[1].reports - a[1].reports)
    .slice(0, 5)
    .map(([asset, agg]) => ({
      asset,
      reports: agg.reports,
      severity: agg.severity,
    }))
}

export async function getOrganizationChartData(
  client: Client,
  organizationId: string,
): Promise<OrganizationChartData> {
  const { data, error } = await client
    .from('reports')
    .select(
      'id, severity, status, asset, submitted_at, program:programs!inner(organization_id)',
    )
    .eq('program.organization_id', organizationId)

  if (error) throw error
  const rows = (data ?? []) as Array<{
    severity: Severity
    status: ReportStatus
    asset: string | null
    submitted_at: string
  }>

  return {
    timeline: buildTimelinePoints(rows, 6, true),
    severity: buildSeverityPoints(rows),
    pipeline: buildPipelinePoints(rows),
    topAssets: buildTopAssets(rows),
  }
}

export async function getResearcherChartData(
  client: Client,
  researcherId: string,
): Promise<ResearcherChartData> {
  const { data, error } = await client
    .from('reports')
    .select('severity, status, submitted_at')
    .eq('researcher_id', researcherId)

  if (error) throw error
  const rows = (data ?? []) as Array<{
    severity: Severity
    status: ReportStatus
    submitted_at: string
  }>

  return {
    timeline: buildTimelinePoints(rows, 6, false),
    severity: buildSeverityPoints(rows),
  }
}

// ─── Org activity feed ────────────────────────────────────────────────────

export interface OrgActivityItem {
  id: string
  type: 'submitted' | 'triaged' | 'resolved' | 'rewarded' | 'commented' | 'closed' | 'duplicate' | 'invalid' | 'status_changed'
  reportId: string
  reportTitle: string
  createdAt: string
}

/**
 * The most recent timeline events on reports owned by this organization.
 * Drives the "Recent activity" widget on the org dashboard.
 */
export async function getOrganizationActivity(
  client: Client,
  organizationId: string,
  limit = 6,
): Promise<OrgActivityItem[]> {
  // Step 1: find the report ids for this org (small set) so we can scope
  // the timeline-event query.
  const reportsRes = await client
    .from('reports')
    .select('id, title, program:programs!inner(organization_id)')
    .eq('program.organization_id', organizationId)
    .limit(200)
  if (reportsRes.error) throw reportsRes.error
  const reportRows = (reportsRes.data ?? []) as Array<{
    id: string
    title: string
  }>
  if (reportRows.length === 0) return []

  const titleById = new Map(reportRows.map((r) => [r.id, r.title]))

  const { data, error } = await client
    .from('report_timeline_events')
    .select('id, report_id, event_type, created_at')
    .in(
      'report_id',
      reportRows.map((r) => r.id),
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((row) => ({
    id: row.id as string,
    type: row.event_type as OrgActivityItem['type'],
    reportId: row.report_id as string,
    reportTitle: titleById.get(row.report_id as string) ?? '',
    createdAt: row.created_at as string,
  }))
}
