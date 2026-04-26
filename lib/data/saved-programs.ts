'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Per-researcher "saved / bookmarked programs" list, persisted to
 * `localStorage` under `htb-saved-programs:<profileId>`. This is a
 * deliberate localStorage shim — there is no `saved_programs` table in
 * the current Supabase schema. When that table lands the consumers
 * (researcher dashboard widget, program detail bookmark button) only
 * need this helper swapped for a Supabase-backed one; the call sites
 * stay identical.
 *
 * IMPORTANT: this is **not real persistence** — clearing the browser
 * wipes the list, and it doesn't sync across devices. Only call from
 * researcher-role code paths; the bookmark UI itself is hidden for
 * other roles.
 */

const KEY_PREFIX = 'htb-saved-programs:'

function storageKey(profileId: string): string {
  return `${KEY_PREFIX}${profileId}`
}

function readSet(profileId: string): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(storageKey(profileId))
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((v): v is string => typeof v === 'string'))
  } catch {
    return new Set()
  }
}

function writeSet(profileId: string, set: Set<string>): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      storageKey(profileId),
      JSON.stringify(Array.from(set)),
    )
    // Notify same-tab listeners — `storage` event only fires across tabs.
    window.dispatchEvent(
      new CustomEvent('htb-saved-programs-change', {
        detail: { profileId },
      }),
    )
  } catch {
    /* quota exceeded / serialization error — silently ignore for the demo */
  }
}

export function listSavedProgramIds(profileId: string): string[] {
  return Array.from(readSet(profileId))
}

export function isProgramSaved(profileId: string, programId: string): boolean {
  return readSet(profileId).has(programId)
}

export function toggleSavedProgram(
  profileId: string,
  programId: string,
): { saved: boolean; ids: string[] } {
  const set = readSet(profileId)
  let saved: boolean
  if (set.has(programId)) {
    set.delete(programId)
    saved = false
  } else {
    set.add(programId)
    saved = true
  }
  writeSet(profileId, set)
  return { saved, ids: Array.from(set) }
}

/**
 * React hook returning the live set of saved program ids for a profile.
 * Updates immediately within the same tab via the
 * `htb-saved-programs-change` custom event, and across tabs via the
 * native `storage` event.
 */
export function useSavedProgramIds(
  profileId: string | null | undefined,
): {
  ids: string[]
  isSaved: (programId: string) => boolean
  toggle: (programId: string) => boolean
} {
  const [ids, setIds] = useState<string[]>(() =>
    profileId ? listSavedProgramIds(profileId) : [],
  )

  useEffect(() => {
    if (!profileId) {
      setIds([])
      return
    }
    setIds(listSavedProgramIds(profileId))

    const sync = () => setIds(listSavedProgramIds(profileId))
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey(profileId)) sync()
    }
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ profileId: string }>).detail
      if (!detail || detail.profileId === profileId) sync()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('htb-saved-programs-change', onCustom)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('htb-saved-programs-change', onCustom)
    }
  }, [profileId])

  const isSaved = useCallback(
    (programId: string) => ids.includes(programId),
    [ids],
  )

  const toggle = useCallback(
    (programId: string): boolean => {
      if (!profileId) return false
      const result = toggleSavedProgram(profileId, programId)
      setIds(result.ids)
      return result.saved
    },
    [profileId],
  )

  return { ids, isSaved, toggle }
}
