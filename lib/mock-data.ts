/**
 * Static UI constants used by surfaces that are not yet backed by a query.
 *
 * Real domain data (organizations, programs, profiles, reports, scopes,
 * rewards) now comes from Supabase via `lib/supabase/queries/*` and the
 * hooks in `lib/data/hooks.ts`. This file retains:
 *
 *   * `platformStats` — illustrative landing-page numbers
 *   * `industries` — option list for the programs filter
 *   * `weaknessCategories` — dropdown for the report submission modal
 *   * `severityDistribution` / `reportsTimeline` /
 *     `researcherReportsTimeline` — synthetic chart data for the
 *     dashboard demo
 *   * `topAttackedAssets` / `recentActivity` — synthetic dashboard widgets
 *   * `researcherDashboardStats` / `orgDashboardStats` — illustrative
 *     KPI tiles
 *
 * Treat everything in this file as demo data. When a chart or widget is
 * ready to be backed by a real query, lift it out of here and into a
 * dedicated query/hook.
 */

import type {
  ChartDataPoint,
  DashboardStats,
  OrgDashboardStats,
  PlatformStats,
  TimelineDataPoint,
} from './types'

export const platformStats: PlatformStats = {
  activePrograms: 13,
  verifiedResearchers: 312,
  reportsSubmitted: 1847,
  avgTriageTime: '< 24h',
  rewardsPaid: 127500,
  organizationsJoined: 13,
}

export const researcherDashboardStats: DashboardStats = {
  totalReports: 58,
  acceptedReports: 42,
  pendingTriage: 3,
  totalRewards: 28500,
  reputationScore: 98,
  rank: 1,
}

export const orgDashboardStats: OrgDashboardStats = {
  totalReports: 247,
  openReports: 18,
  avgTriageTime: '18h',
  criticalFindings: 12,
  rewardsPaid: 87500,
  resolvedThisMonth: 24,
}

export const severityDistribution: ChartDataPoint[] = [
  { name: 'Critical', value: 15, fill: 'var(--chart-5)' },
  { name: 'High', value: 42, fill: 'var(--chart-4)' },
  { name: 'Medium', value: 98, fill: 'var(--chart-1)' },
  { name: 'Low', value: 67, fill: 'var(--chart-2)' },
  { name: 'Info', value: 25, fill: 'var(--chart-3)' },
]

export const reportsTimeline: TimelineDataPoint[] = [
  { month: 'Nov', reports: 12, resolved: 10 },
  { month: 'Dec', reports: 18, resolved: 15 },
  { month: 'Jan', reports: 24, resolved: 20 },
  { month: 'Feb', reports: 32, resolved: 28 },
  { month: 'Mar', reports: 28, resolved: 25 },
  { month: 'Apr', reports: 22, resolved: 18 },
]

export const researcherReportsTimeline: TimelineDataPoint[] = [
  { month: 'Nov', reports: 4 },
  { month: 'Dec', reports: 6 },
  { month: 'Jan', reports: 8 },
  { month: 'Feb', reports: 12 },
  { month: 'Mar', reports: 10 },
  { month: 'Apr', reports: 8 },
]

export const topAttackedAssets = [
  { asset: 'AZAL Public API',           reports: 45, severity: 'high'     as const },
  { asset: 'AzInTelecom Cloud Console', reports: 38, severity: 'critical' as const },
  { asset: 'Aztelekom Customer Portal', reports: 32, severity: 'medium'   as const },
  { asset: 'ADY Schedule & Tracking',   reports: 28, severity: 'medium'   as const },
  { asset: 'Azərpoçt Tracking Site',    reports: 24, severity: 'high'     as const },
]

export const recentActivity = [
  { id: '1', action: 'Report triaged',       target: 'SQL Injection in Customer Portal',      time: '2 hours ago',  type: 'triage' },
  { id: '2', action: 'Reward paid',          target: 'IDOR in Loyalty Account',               time: '4 hours ago',  type: 'reward' },
  { id: '3', action: 'New report received',  target: 'Authentication Bypass — Cloud Console', time: '6 hours ago',  type: 'new' },
  { id: '4', action: 'Report resolved',      target: 'Stored XSS in Tracking Notes',          time: '8 hours ago',  type: 'resolved' },
  { id: '5', action: 'Program updated',      target: 'AzInTelecom — new scope category',      time: '12 hours ago', type: 'update' },
]

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
