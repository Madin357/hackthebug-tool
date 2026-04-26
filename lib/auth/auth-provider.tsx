'use client'

/**
 * DEMO ONLY — frontend mock auth.
 *
 * The "session" lives in localStorage under `htb-session`. There is no
 * cryptographic signing, no expiry enforcement, no httpOnly cookie, no
 * server-side check. Anyone with browser dev tools can edit it. This is
 * acceptable ONLY because the hackathon prototype has no real data behind
 * any of the dashboards.
 *
 * When a real backend lands:
 *   - replace login() with a fetch to a real auth endpoint
 *   - move the session token to an HttpOnly + Secure cookie set by the server
 *   - add server-side route guards (middleware) instead of relying on
 *     client-only RoleGate
 *   - add SİMA identity verification before granting researcher role
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Session, UserRole } from '@/lib/types'
import { findCredential } from '@/lib/auth/mock-users'

const STORAGE_KEY = 'htb-session'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type LoginResult =
  | { ok: true; session: Session }
  | { ok: false; error: 'invalid-credentials' | 'missing-fields' }

interface AuthContextValue {
  status: AuthStatus
  session: Session | null
  login: (email: string, password: string) => LoginResult
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function isSession(value: unknown): value is Session {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<Session>
  return (
    typeof v.userId === 'string' &&
    typeof v.email === 'string' &&
    (v.role === 'researcher' || v.role === 'organization') &&
    typeof v.displayName === 'string' &&
    typeof v.issuedAt === 'string'
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as unknown
        if (isSession(parsed)) {
          setSession(parsed)
          setStatus('authenticated')
          return
        }
      }
    } catch {
      // ignore parse / storage errors and fall through to unauthenticated
    }
    setStatus('unauthenticated')
  }, [])

  const login = useCallback((email: string, password: string): LoginResult => {
    if (!email || !password) {
      return { ok: false, error: 'missing-fields' }
    }
    const cred = findCredential(email, password)
    if (!cred) {
      return { ok: false, error: 'invalid-credentials' }
    }
    const next: Session = {
      userId: cred.user.id,
      email: cred.user.email,
      role: cred.user.role,
      displayName: cred.user.displayName,
      researcherId: cred.user.researcherId,
      organizationId: cred.user.organizationId,
      issuedAt: new Date().toISOString(),
    }
    setSession(next)
    setStatus('authenticated')
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore — auth still works for the current tab
    }
    return { ok: true, session: next }
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    setStatus('unauthenticated')
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ status, session, login, logout }),
    [status, session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return ctx
}

export function dashboardPathForRole(role: UserRole): string {
  return role === 'researcher'
    ? '/dashboard/researcher'
    : '/dashboard/organization'
}
