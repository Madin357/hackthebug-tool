import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'
import type { Report, Severity } from '@/lib/types'
import { mapReport, type ReportRowWithProgram } from '@/lib/supabase/mappers'

type Client = SupabaseClient<Database>

/**
 * Reports filed by one researcher. Used by the researcher dashboard.
 */
export async function listReportsForResearcher(
  client: Client,
  researcherId: string,
  limit = 25,
): Promise<Report[]> {
  const { data, error } = await client
    .from('reports')
    .select('*, program:programs(name, slug)')
    .eq('researcher_id', researcherId)
    .order('submitted_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((row) => mapReport(row as ReportRowWithProgram))
}

/**
 * Reports filed against any program owned by a given organization. Used by
 * the organization dashboard.
 */
export async function listReportsForOrganization(
  client: Client,
  organizationId: string,
  limit = 50,
): Promise<Report[]> {
  // Filter via the joined programs.organization_id — the !inner join makes
  // it a real filter rather than a left join.
  const { data, error } = await client
    .from('reports')
    .select('*, program:programs!inner(name, slug, organization_id)')
    .eq('program.organization_id', organizationId)
    .order('submitted_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((row) => mapReport(row as ReportRowWithProgram))
}

/** All reports for the platform (admin / overview surfaces). */
export async function listRecentReports(
  client: Client,
  limit = 25,
): Promise<Report[]> {
  const { data, error } = await client
    .from('reports')
    .select('*, program:programs(name, slug)')
    .order('submitted_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((row) => mapReport(row as ReportRowWithProgram))
}

/** Single report (with program join) for future detail pages. */
export async function getReportById(
  client: Client,
  id: string,
): Promise<Report | null> {
  const { data, error } = await client
    .from('reports')
    .select('*, program:programs(name, slug)')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data ? mapReport(data as ReportRowWithProgram) : null
}

export interface CreateReportParams {
  programId: string
  researcherId: string
  title: string
  severity: Severity
  weaknessType?: string | null
  asset?: string | null
  summary?: string | null
  stepsToReproduce?: string | null
  proofOfConcept?: string | null
  impact?: string | null
  remediation?: string | null
  cvssScore?: number | null
}

/**
 * Persists a new vulnerability report from a researcher and writes the
 * matching `submitted` timeline event. Returns the freshly-mapped report
 * so the caller can show the real Supabase-generated UUID.
 *
 * RLS requirements (see MEMORY.md "One-time Supabase setup" entry for
 * the SQL): the researcher must be authenticated and the policies
 * `researcher_inserts_own_reports` (on `reports`) +
 * `researcher_inserts_own_report_timeline_events` (on
 * `report_timeline_events`) must exist.
 */
export async function createReport(
  client: Client,
  params: CreateReportParams,
): Promise<Report> {
  const { data, error } = await client
    .from('reports')
    .insert({
      program_id: params.programId,
      researcher_id: params.researcherId,
      title: params.title,
      severity: params.severity,
      status: 'pending',
      weakness_type: params.weaknessType ?? null,
      asset: params.asset ?? null,
      summary: params.summary ?? null,
      steps_to_reproduce: params.stepsToReproduce ?? null,
      proof_of_concept: params.proofOfConcept ?? null,
      impact: params.impact ?? null,
      remediation: params.remediation ?? null,
      cvss_score: params.cvssScore ?? null,
    })
    .select('*, program:programs(name, slug)')
    .single()

  if (error) throw error
  if (!data) throw new Error('Insert succeeded but Supabase returned no row.')

  const reportRow = data as ReportRowWithProgram

  // Best-effort timeline event. If RLS blocks it the report itself is
  // still saved, so don't bubble the error up to the caller.
  const { error: eventError } = await client
    .from('report_timeline_events')
    .insert({
      report_id: reportRow.id,
      actor_id: params.researcherId,
      event_type: 'submitted',
      from_status: null,
      to_status: 'pending',
      message: null,
    })

  if (eventError) {
    // eslint-disable-next-line no-console
    console.warn('[reports] timeline event insert failed', eventError)
  }

  return mapReport(reportRow)
}
