'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import {
  getProgramBySlug,
  listFeaturedPrograms,
  listPrograms,
  listProgramsForOrganization,
} from '@/lib/supabase/queries/programs'
import { listResearchers } from '@/lib/supabase/queries/profiles'
import { getOrganizationById } from '@/lib/supabase/queries/organizations'
import type { Organization } from '@/lib/types'
import {
  listReportsForOrganization,
  listReportsForResearcher,
} from '@/lib/supabase/queries/reports'
import type { Program, Report, Researcher } from '@/lib/types'



/**
 * Tiny dependency-free `useAsync` — returns `{ data, loading, error, refetch }`.
 * No request deduplication / cache; sufficient for the hackathon. Switch to
 * SWR or TanStack Query when the app grows.
 */

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

function useAsync<T>(
  fetcher: () => Promise<T>,
  deps: ReadonlyArray<unknown>,
): AsyncState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [tick, setTick] = useState(0)
  const seqRef = useRef(0)

  const refetch = useCallback(() => setTick((n) => n + 1), [])

  useEffect(() => {
    const seq = ++seqRef.current
    let cancelled = false
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (cancelled || seq !== seqRef.current) return
        setData(result)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (cancelled || seq !== seqRef.current) return
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  return { data, loading, error, refetch }
}

// ─── Programs ─────────────────────────────────────────────────────────────

export function usePrograms(): AsyncState<Program[]> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(() => listPrograms(client), [])
}

export function useFeaturedPrograms(limit = 3): AsyncState<Program[]> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(() => listFeaturedPrograms(client, limit), [limit])
}

export function useProgram(slug: string): AsyncState<Program | null> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(() => getProgramBySlug(client, slug), [slug])
}

/** Programs owned by a single organization (org dashboard "my programs"). */
export function useOrganizationPrograms(
  organizationId: string | null | undefined,
): AsyncState<Program[]> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(
    () =>
      organizationId
        ? listProgramsForOrganization(client, organizationId)
        : Promise.resolve<Program[]>([]),
    [organizationId],
  )
}

// ─── Researchers ──────────────────────────────────────────────────────────

export function useResearchers(limit = 50): AsyncState<Researcher[]> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(() => listResearchers(client, limit), [limit])
}

// ─── Reports ──────────────────────────────────────────────────────────────

export function useResearcherReports(
  researcherId: string | null | undefined,
  limit = 25,
): AsyncState<Report[]> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(
    () =>
      researcherId
        ? listReportsForResearcher(client, researcherId, limit)
        : Promise.resolve<Report[]>([]),
    [researcherId, limit],
  )
}

export function useOrganizationReports(
  organizationId: string | null | undefined,
  limit = 50,
): AsyncState<Report[]> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(
    () =>
      organizationId
        ? listReportsForOrganization(client, organizationId, limit)
        : Promise.resolve<Report[]>([]),
    [organizationId, limit],
  )
}

// ─── Organizations ────────────────────────────────────────────────────────

export function useOrganization(
  id: string | null | undefined,
): AsyncState<Organization | null> {
  const client = useMemo(() => getSupabaseClient(), [])
  return useAsync(
    () =>
      id
        ? getOrganizationById(client, id)
        : Promise.resolve<Organization | null>(null),
    [id],
  )
}
