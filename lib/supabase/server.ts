import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseEnv } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/database.types'

/**
 * Server-side Supabase client for React Server Components, Route Handlers,
 * and Server Actions. Reads/writes the session cookie via Next's `cookies()`
 * so it shares state with the browser client.
 *
 * `await getSupabaseServerClient()` once per request — do not cache across
 * requests.
 */
export async function getSupabaseServerClient() {
  const { url, anonKey } = getSupabaseEnv()
  const cookieStore = await cookies()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Server Components can't set cookies — ignored. Auth refresh
          // happens on the client (or in middleware/route handlers).
        }
      },
    },
  })
}
