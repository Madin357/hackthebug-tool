import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'
import type { Report } from '@/lib/types'
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
