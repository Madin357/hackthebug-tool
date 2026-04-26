/**
 * Static UI constants used by surfaces that don't (yet) have a Supabase
 * backing.
 *
 * Real domain data — organizations, programs, profiles, reports, scopes,
 * rewards — flows through `lib/supabase/queries/*` + `lib/data/hooks.ts`.
 * Both dashboard surfaces (researcher KPIs/charts and organization
 * KPIs/charts/pipeline/top-assets/activity) are also driven by Supabase
 * via `lib/supabase/queries/dashboard.ts`.
 *
 * What's left here is illustrative landing-page copy and static option
 * lists:
 *
 *   * `platformStats` — illustrative numbers shown on `/` and `/about`.
 *     Clearly labelled "Demo Data" / "Demo banner" wherever rendered.
 *   * `industries` — option list for the programs filter
 *   * `weaknessCategories` — dropdown for the report submission modal
 */

import type { PlatformStats } from './types'

export const platformStats: PlatformStats = {
  activePrograms: 13,
  verifiedResearchers: 312,
  reportsSubmitted: 1847,
  avgTriageTime: '< 24h',
  rewardsPaid: 127500,
  organizationsJoined: 13,
}

export const weaknessCategories = [
  'SQL Injection',
  'Cross-Site Scripting (XSS)',
  'Cross-Site Request Forgery (CSRF)',
  'Insecure Direct Object Reference (IDOR)',
  'Authentication Bypass',
  'Authorization Bypass',
  'Information Disclosure',
  'Server-Side Request Forgery (SSRF)',
  'XML External Entity (XXE)',
  'Remote Code Execution (RCE)',
  'Open Redirect',
  'Improper Input Validation',
  'Cryptographic Issues',
  'Session Management',
  'Business Logic Flaw',
  'Other',
]

export const industries = [
  'Airline / Aviation',
  'Railway / Transport',
  'Maritime / Shipping',
  'Metro / Public Transport',
  'Bus Transport',
  'Shipbuilding',
  'Space / Satellite',
  'Telecommunications',
  'Cloud / Digital Infrastructure',
  'Postal / Logistics',
  'Taxi / Mobility',
  'Broadcasting / TV / Radio',
  'Artificial Intelligence / National AI',
]
