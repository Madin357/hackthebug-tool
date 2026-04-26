/**
 * Resolves the Supabase URL + anon key from environment variables.
 *
 * Accepts any of the common naming conventions (canonical
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY`, the newer
 * `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, or the shorter
 * `NEXT_PUBLIC_ANON_KEY` the project happened to use). Throws a clear
 * error if none are set so the failure mode at boot is obvious.
 */

function pick(...candidates: Array<string | undefined>): string | undefined {
  for (const value of candidates) {
    if (value && value.trim().length > 0) return value.trim()
  }
  return undefined
}

export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = pick(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const anonKey = pick(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    process.env.NEXT_PUBLIC_ANON_KEY,
  )

  if (!url) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL. Set it in .env / .env.local.',
    )
  }
  if (!anonKey) {
    throw new Error(
      'Missing Supabase anon key. Set NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / NEXT_PUBLIC_ANON_KEY) in .env / .env.local.',
    )
  }

  return { url, anonKey }
}
