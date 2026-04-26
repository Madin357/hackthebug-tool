'use client'

import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/database.types'

/**
 * Singleton browser-side Supabase client.
 *
 * Uses `@supabase/ssr` so the auth cookie is the same one the server
 * helper reads — both ends agree on the session.
 *
 * Components should call `getSupabaseClient()` rather than constructing
 * their own client; one client per browser tab is the recommended shape.
 */

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseClient() {
  if (browserClient) return browserClient
  const { url, anonKey } = getSupabaseEnv()
  browserClient = createBrowserClient<Database>(url, anonKey)
  return browserClient
}
