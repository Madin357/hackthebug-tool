'use client'

/**
 * Supabase-backed AuthProvider.
 *
 * Every async path is wrapped in try/catch and a hard 8-second safety
 * timeout flips status to `'unauthenticated'` if neither
 * `getSession()` nor `onAuthStateChange` has resolved by then. That
 * way the UI (in particular `RoleGate`) never gets stuck on
 * "Checking your session…" if the network is slow or the profile
 * lookup fails.
 *
 * The hook surface (`useAuth().status / .session / .login / .logout`,
 * plus `dashboardPathForRole`) is unchanged so consumers
 * (RoleGate, Navigation, /login, dashboards, /register) keep working.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Session as AuthSession } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase/client'
import {
  getProfileByEmail,
  getProfileById,
} from '@/lib/supabase/queries/profiles'
import type { ProfileRow } from '@/lib/supabase/database.types'
import type { Session, UserRole } from '@/lib/types'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type LoginResult =
  | { ok: true; session: Session }
  | {
      ok: false
      error:
        | 'invalid-credentials'
        | 'missing-fields'
        | 'profile-not-found'
        | 'unknown'
      message?: string
    }

interface AuthContextValue {
  status: AuthStatus
  session: Session | null
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => Promise<void>
  /** Re-fetches the profile row for the current auth user. Useful right
   *  after sign-up or after editing the profile. */
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const BOOT_TIMEOUT_MS = 8000

function profileToSession(profile: ProfileRow): Session {
  return {
    userId: profile.id,
    email: profile.email,
    role: profile.role as UserRole,
    displayName: profile.display_name,
    researcherId: profile.role === 'researcher' ? profile.id : undefined,
    organizationId: profile.organization_id ?? undefined,
    issuedAt: new Date().toISOString(),
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')
  const cancelledRef = useRef(false)

  const resolveProfile = useCallback(
    async (
      authUserId: string,
      email: string | undefined,
    ): Promise<ProfileRow | null> => {
      const byId = await getProfileById(supabase, authUserId)
      if (byId) return byId
      if (email) return await getProfileByEmail(supabase, email)
      return null
    },
    [supabase],
  )

  const applyAuthSession = useCallback(
    async (authSession: AuthSession | null) => {
      if (cancelledRef.current) return
      try {
        if (!authSession) {
          setSession(null)
          setStatus('unauthenticated')
          return
        }
        const profile = await resolveProfile(
          authSession.user.id,
          authSession.user.email ?? undefined,
        )
        if (cancelledRef.current) return
        if (!profile) {
          // Auth user exists but no profile row — bail out cleanly. Fire
          // signOut without awaiting so a slow network call can't hold
          // the bootstrap hostage.
          void supabase.auth.signOut()
          setSession(null)
          setStatus('unauthenticated')
          return
        }
        setSession(profileToSession(profile))
        setStatus('authenticated')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[auth] failed to apply auth session', err)
        if (!cancelledRef.current) {
          setSession(null)
          setStatus('unauthenticated')
        }
      }
    },
    [resolveProfile, supabase],
  )

  useEffect(() => {
    cancelledRef.current = false

    // Hard timeout: if we're still 'loading' after BOOT_TIMEOUT_MS, force
    // 'unauthenticated' so RoleGate redirects to /login instead of
    // hanging on the loader forever.
    const timer = setTimeout(() => {
      if (cancelledRef.current) return
      setStatus((prev) => (prev === 'loading' ? 'unauthenticated' : prev))
    }, BOOT_TIMEOUT_MS)

    // Eager bootstrap. Errors fall through to 'unauthenticated'.
    supabase.auth
      .getSession()
      .then(({ data }) => applyAuthSession(data.session))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[auth] getSession failed', err)
        if (!cancelledRef.current) {
          setSession(null)
          setStatus('unauthenticated')
        }
      })

    // Subscribe for ongoing changes (login / logout / token refresh).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, authSession) => {
      void applyAuthSession(authSession)
    })

    return () => {
      cancelledRef.current = true
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [supabase, applyAuthSession])

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      if (!email || !password) {
        return { ok: false, error: 'missing-fields' }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error || !data.session) {
        const message = error?.message ?? 'Sign-in failed.'
        const code = message.toLowerCase().includes('invalid')
          ? 'invalid-credentials'
          : 'unknown'
        return { ok: false, error: code, message }
      }

      const authUser = data.session.user
      try {
        const profile = await resolveProfile(
          authUser.id,
          authUser.email ?? undefined,
        )
        if (!profile) {
          void supabase.auth.signOut()
          return { ok: false, error: 'profile-not-found' }
        }
        const next = profileToSession(profile)
        setSession(next)
        setStatus('authenticated')
        return { ok: true, session: next }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[auth] login profile lookup failed', err)
        return {
          ok: false,
          error: 'unknown',
          message: err instanceof Error ? err.message : String(err),
        }
      }
    },
    [supabase, resolveProfile],
  )

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[auth] signOut failed', err)
    } finally {
      setSession(null)
      setStatus('unauthenticated')
    }
  }, [supabase])

  const refresh = useCallback(async () => {
    const { data } = await supabase.auth.getSession()
    await applyAuthSession(data.session)
  }, [supabase, applyAuthSession])

  const value = useMemo<AuthContextValue>(
    () => ({ status, session, login, logout, refresh }),
    [status, session, login, logout, refresh],
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
