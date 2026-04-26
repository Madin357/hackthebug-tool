'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/**
 * User-selectable accent color. Overrides `--primary` (and the related
 * ring / sidebar tokens) on `<html>` so primary CTAs, focus rings, the
 * `.glow-cyan` shadow, and active selection states pick up the change.
 *
 * Persisted to `localStorage` under `htb-accent`.
 *
 * Hydration-safe by design: the provider only writes CSS variables in
 * a `useEffect`, never into the SSR markup. Default accent is
 * `'cyan'` (the historical primary) so unstyled first paint matches
 * the saved preference for the most common user.
 */

export type AccentId =
  | 'cyan'
  | 'purple'
  | 'blue'
  | 'red'
  | 'emerald'
  | 'amber'

interface AccentDefinition {
  id: AccentId
  /** i18n key for the user-facing label. */
  labelKey: string
  /** Solid swatch color, used for the picker dot. */
  swatch: string
  /** Token override values applied to <html> when this accent is active. */
  tokens: {
    primary: string
    primaryForeground: string
    ring: string
  }
}

export const ACCENTS: AccentDefinition[] = [
  {
    id: 'cyan',
    labelKey: 'settings.accent.cyan',
    swatch: 'oklch(0.75 0.18 195)',
    tokens: {
      primary: 'oklch(0.75 0.18 195)',
      primaryForeground: 'oklch(0.12 0.01 250)',
      ring: 'oklch(0.75 0.18 195)',
    },
  },
  {
    id: 'purple',
    labelKey: 'settings.accent.purple',
    swatch: 'oklch(0.70 0.20 295)',
    tokens: {
      primary: 'oklch(0.70 0.20 295)',
      primaryForeground: 'oklch(0.12 0.01 250)',
      ring: 'oklch(0.70 0.20 295)',
    },
  },
  {
    id: 'blue',
    labelKey: 'settings.accent.blue',
    swatch: 'oklch(0.65 0.18 250)',
    tokens: {
      primary: 'oklch(0.65 0.18 250)',
      primaryForeground: 'oklch(0.99 0.003 250)',
      ring: 'oklch(0.65 0.18 250)',
    },
  },
  {
    id: 'red',
    labelKey: 'settings.accent.red',
    swatch: 'oklch(0.65 0.22 25)',
    tokens: {
      primary: 'oklch(0.65 0.22 25)',
      primaryForeground: 'oklch(0.99 0.003 250)',
      ring: 'oklch(0.65 0.22 25)',
    },
  },
  {
    id: 'emerald',
    labelKey: 'settings.accent.emerald',
    swatch: 'oklch(0.70 0.16 155)',
    tokens: {
      primary: 'oklch(0.70 0.16 155)',
      primaryForeground: 'oklch(0.12 0.01 250)',
      ring: 'oklch(0.70 0.16 155)',
    },
  },
  {
    id: 'amber',
    labelKey: 'settings.accent.amber',
    swatch: 'oklch(0.78 0.16 70)',
    tokens: {
      primary: 'oklch(0.78 0.16 70)',
      primaryForeground: 'oklch(0.12 0.01 250)',
      ring: 'oklch(0.78 0.16 70)',
    },
  },
]

export const DEFAULT_ACCENT: AccentId = 'cyan'

const STORAGE_KEY = 'htb-accent'

function isAccentId(value: unknown): value is AccentId {
  return typeof value === 'string' && ACCENTS.some((a) => a.id === value)
}

interface AccentContextValue {
  accent: AccentId
  setAccent: (next: AccentId) => void
  /** Convenience for the picker UI: the full list of options. */
  accents: typeof ACCENTS
}

const AccentContext = createContext<AccentContextValue | null>(null)

function applyAccent(id: AccentId) {
  if (typeof document === 'undefined') return
  const def = ACCENTS.find((a) => a.id === id) ?? ACCENTS[0]
  const root = document.documentElement
  root.style.setProperty('--primary', def.tokens.primary)
  root.style.setProperty('--primary-foreground', def.tokens.primaryForeground)
  root.style.setProperty('--ring', def.tokens.ring)
  root.style.setProperty('--sidebar-primary', def.tokens.primary)
  root.style.setProperty(
    '--sidebar-primary-foreground',
    def.tokens.primaryForeground,
  )
  root.style.setProperty('--sidebar-ring', def.tokens.ring)
  root.dataset.accent = id
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentId>(DEFAULT_ACCENT)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isAccentId(stored)) {
        setAccentState(stored)
        applyAccent(stored)
      } else {
        applyAccent(DEFAULT_ACCENT)
      }
    } catch {
      applyAccent(DEFAULT_ACCENT)
    }
  }, [])

  const setAccent = useCallback((next: AccentId) => {
    setAccentState(next)
    applyAccent(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* quota exceeded — silently ignore */
    }
  }, [])

  const value = useMemo<AccentContextValue>(
    () => ({ accent, setAccent, accents: ACCENTS }),
    [accent, setAccent],
  )

  return (
    <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
  )
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext)
  if (!ctx) {
    throw new Error('useAccent must be used inside an AccentProvider')
  }
  return ctx
}
