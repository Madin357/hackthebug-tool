/**
 * DEMO ONLY — credential constants for the hackathon prototype.
 *
 * Real authentication now goes through Supabase Auth (see
 * `lib/auth/auth-provider.tsx`). The two values exported here are kept
 * solely so the `/login` page (and any "what credentials should I use"
 * helper) has a single source of truth for the demo accounts seeded into
 * the database.
 *
 * The matching Supabase Auth users must exist before sign-in works:
 *   - researcher@hackthebug.az / Researcher123!
 *   - organization@hackthebug.az / Organization123!
 *
 * Create them via Supabase Dashboard → Authentication → Users → Add user
 * (with "Auto Confirm User" ON), then run the one-time SQL migration
 * documented in MEMORY.md > Last Actions to align `public.profiles.id`
 * with the new `auth.users.id` values.
 *
 * Production must replace these helpers with a real signup / invite flow.
 */

export const demoCredentials = {
  researcher: {
    email: 'researcher@hackthebug.az',
    password: 'Researcher123!',
  },
  organization: {
    email: 'organization@hackthebug.az',
    password: 'Organization123!',
  },
} as const
