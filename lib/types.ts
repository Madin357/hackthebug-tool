export type ProgramStatus = 'active' | 'upcoming' | 'paused' | 'closed'
export type ProgramType = 'bug-bounty' | 'vdp' | 'private-preview'
export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'informational'
export type ReportStatus = 'draft' | 'pending' | 'triaged' | 'resolved' | 'rewarded' | 'duplicate' | 'invalid'

export type UserRole = 'researcher' | 'organization'

export interface Organization {
  id: string
  slug: string
  name: string
  industry: string
}

export interface User {
  id: string
  email: string
  role: UserRole
  displayName: string
  // Linked records depending on role. At most one of these is set.
  researcherId?: string
  organizationId?: string
}

export interface Session {
  userId: string
  email: string
  role: UserRole
  displayName: string
  researcherId?: string
  organizationId?: string
  issuedAt: string
}

export interface Program {
  id: string
  name: string
  organization: string
  slug: string
  description: string
  longDescription?: string
  industry: string
  status: ProgramStatus
  type: ProgramType
  rewardRange: {
    min: number
    max: number
  }
  /**
   * When true, the program offers only public recognition (no monetary
   * rewards). UI surfaces should display "Recognition" instead of a
   * `$min - $max` range.
   */
  recognitionOnly?: boolean
  assetsCount: number
  lastUpdated: string
  tags: string[]
  logo?: string
  featured?: boolean
  inScope: ScopeItem[]
  outOfScope: string[]
  rewards: RewardTier[]
  rules: string[]
  updates: ProgramUpdate[]
  hallOfFame: HallOfFameEntry[]
  responseTime: {
    firstResponse: string
    triage: string
    resolution: string
  }
}

export interface ScopeItem {
  target: string
  type: 'web' | 'api' | 'mobile' | 'cloud' | 'network' | 'other'
  description?: string
}

export interface RewardTier {
  severity: Severity
  minReward: number
  maxReward: number
  sla: string
}

export interface ProgramUpdate {
  id: string
  date: string
  title: string
  description: string
  type: 'scope' | 'reward' | 'policy' | 'general'
}

export interface HallOfFameEntry {
  researcherId: string
  name: string
  avatar?: string
  points: number
  reportsAccepted: number
  rank: number
}

export interface Researcher {
  id: string
  name: string
  handle: string
  avatar?: string
  country: string
  countryCode: string
  points: number
  reportsAccepted: number
  reportsSubmitted: number
  reputation: number
  rank: number
  badges: Badge[]
  joinedDate: string
  totalRewards: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
}

export interface Report {
  id: string
  title: string
  programId: string
  programName: string
  severity: Severity
  status: ReportStatus
  submittedDate: string
  lastUpdated: string
  reward?: number
  asset: string
  weaknessType: string
}

export interface DashboardStats {
  totalReports: number
  acceptedReports: number
  pendingTriage: number
  totalRewards: number
  reputationScore: number
  rank: number
}

export interface OrgDashboardStats {
  totalReports: number
  openReports: number
  avgTriageTime: string
  criticalFindings: number
  rewardsPaid: number
  resolvedThisMonth: number
}

export interface ChartDataPoint {
  name: string
  value: number
  fill?: string
}

export interface TimelineDataPoint {
  month: string
  reports: number
  resolved?: number
}

export interface PlatformStats {
  activePrograms: number
  verifiedResearchers: number
  reportsSubmitted: number
  avgTriageTime: string
  rewardsPaid: number
  organizationsJoined: number
}
