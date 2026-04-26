import type {
  Program,
  Organization,
  Researcher,
  Report,
  DashboardStats,
  OrgDashboardStats,
  PlatformStats,
  ChartDataPoint,
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

/**
 * Demo organization records for the AZCON Holding portfolio.
 *
 * These are real organizations. The platform shows them as **demo
 * disclosure-program cards only** — testing of any real system listed
 * below is NOT authorized in this build. Real testing requires explicit,
 * written authorization from the organization itself.
 */
export const organizations: Organization[] = [
  { id: 'org-azal',           slug: 'azal',                name: 'Azərbaycan Hava Yolları',           industry: 'Airline / Aviation' },
  { id: 'org-ady',            slug: 'ady',                 name: 'Azərbaycan Dəmir Yolları',          industry: 'Railway / Transport' },
  { id: 'org-asco',           slug: 'asco',                name: 'Azərbaycan Xəzər Dəniz Gəmiçiliyi', industry: 'Maritime / Shipping' },
  { id: 'org-baki-metro',     slug: 'baki-metropoliteni',  name: 'Bakı Metropoliteni',                industry: 'Metro / Public Transport' },
  { id: 'org-bakubus',        slug: 'bakubus',             name: 'BakuBus',                           industry: 'Bus Transport' },
  { id: 'org-baki-shipyard',  slug: 'baki-shipyard',       name: 'Bakı Gəmiqayırma Zavodu',           industry: 'Shipbuilding' },
  { id: 'org-azerkosmos',     slug: 'azerkosmos',          name: 'Azərkosmos',                        industry: 'Space / Satellite' },
  { id: 'org-aztelekom',      slug: 'aztelekom',           name: 'Aztelekom',                         industry: 'Telecommunications' },
  { id: 'org-azintelecom',    slug: 'azintelecom',         name: 'AzInTelecom',                       industry: 'Cloud / Digital Infrastructure' },
  { id: 'org-azerpoct',       slug: 'azerpoct',            name: 'Azərpoçt',                          industry: 'Postal / Logistics' },
  { id: 'org-baki-taksi',     slug: 'baki-taksi',          name: 'Bakı Taksi Xidməti',                industry: 'Taxi / Mobility' },
  { id: 'org-teleradio',      slug: 'teleradio',           name: 'Teleradio',                         industry: 'Broadcasting / TV / Radio' },
  { id: 'org-msim',           slug: 'msim',                name: 'Milli Süni İntellekt Mərkəzi',      industry: 'Artificial Intelligence / National AI' },
]

const COMMON_OUT_OF_SCOPE = [
  'Production systems and real user data',
  'Social engineering of employees, partners, or customers',
  'Denial of service or load testing',
  'Physical security testing',
  'Aggressive scanning or brute-force attempts',
  'Third-party integrations not owned by the organization',
]

const COMMON_RULES = [
  'Hackathon demo card — no live testing of real systems is authorized',
  'Use only synthetic test data; never touch production',
  'Report findings only through the official channel once it exists',
  'Do not publicly disclose findings without coordination',
  'Respect operational safety, user privacy, and applicable law',
]

/**
 * Demo / planned reward tiers, in AZN. Values are illustrative only — they
 * show what an officially authorized program could plausibly pay. Nothing
 * here is a real bounty commitment from any organization.
 *
 * Tier shape:
 *   - LOW       — smaller surface, fewer assets (BakuBus, Bakı Taksi)
 *   - STANDARD  — average commercial / public service (ASCO, Bakı Metro,
 *                 Bakı Shipyard, Azərpoçt, Teleradio)
 *   - HIGH      — high-impact infrastructure (AZAL, ADY, Aztelekom,
 *                 AzInTelecom)
 *   - TOP       — highest-impact / most sensitive (Azərkosmos, MSIM)
 */
const REWARDS_LOW = [
  { severity: 'critical' as const, minReward: 1500, maxReward: 3500, sla: '24 hours' },
  { severity: 'high'     as const, minReward: 600,  maxReward: 1200, sla: '48 hours' },
  { severity: 'medium'   as const, minReward: 200,  maxReward: 450,  sla: '72 hours' },
  { severity: 'low'      as const, minReward: 50,   maxReward: 125,  sla: '5 days' },
]
const REWARDS_STANDARD = [
  { severity: 'critical' as const, minReward: 2000, maxReward: 5000, sla: '24 hours' },
  { severity: 'high'     as const, minReward: 700,  maxReward: 1500, sla: '48 hours' },
  { severity: 'medium'   as const, minReward: 250,  maxReward: 550,  sla: '72 hours' },
  { severity: 'low'      as const, minReward: 75,   maxReward: 175,  sla: '5 days' },
]
const REWARDS_HIGH = [
  { severity: 'critical' as const, minReward: 3500, maxReward: 7000, sla: '12 hours' },
  { severity: 'high'     as const, minReward: 1200, maxReward: 2500, sla: '24 hours' },
  { severity: 'medium'   as const, minReward: 350,  maxReward: 800,  sla: '48 hours' },
  { severity: 'low'      as const, minReward: 100,  maxReward: 250,  sla: '5 days' },
]
const REWARDS_TOP = [
  { severity: 'critical' as const, minReward: 4500, maxReward: 9000, sla: '8 hours' },
  { severity: 'high'     as const, minReward: 1500, maxReward: 3000, sla: '24 hours' },
  { severity: 'medium'   as const, minReward: 400,  maxReward: 1000, sla: '48 hours' },
  { severity: 'low'      as const, minReward: 150,  maxReward: 300,  sla: '3 days' },
]

const RANGE_LOW = { min: 50, max: 3500 }
const RANGE_STANDARD = { min: 75, max: 5000 }
const RANGE_HIGH = { min: 100, max: 7000 }
const RANGE_TOP = { min: 150, max: 9000 }

const RESPONSE_LOW = { firstResponse: '< 12 hours', triage: '< 48 hours', resolution: '< 30 days' }
const RESPONSE_STANDARD = { firstResponse: '< 8 hours',  triage: '< 24 hours', resolution: '< 21 days' }
const RESPONSE_HIGH = { firstResponse: '< 4 hours',  triage: '< 16 hours', resolution: '< 14 days' }
const RESPONSE_TOP = { firstResponse: '< 2 hours',  triage: '< 12 hours', resolution: '< 10 days' }

export const programs: Program[] = [
  {
    id: '1',
    name: 'AZAL Responsible Disclosure',
    organization: 'Azərbaycan Hava Yolları',
    slug: 'azal',
    description:
      'Demo card for the national flag carrier. Real testing of any AZAL system requires explicit official authorization.',
    longDescription:
      'Azərbaycan Hava Yolları (AZAL) operates the country’s flag carrier and ground services. This card sketches what a coordinated vulnerability disclosure program could look like for AZAL’s passenger-facing surfaces. Scope categories below are illustrative; reward ranges are demo / planned values; no testing is authorized until AZAL publishes an official program.',
    industry: 'Airline / Aviation',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_HIGH,
    assetsCount: 5,
    lastUpdated: '2026-04-22',
    tags: ['Aviation', 'Web', 'Mobile', 'Demo Card'],
    featured: true,
    inScope: [
      { target: 'Official Website',        type: 'web',    description: 'Pending official authorization' },
      { target: 'Booking & Reservations',  type: 'web',    description: 'Pending official authorization' },
      { target: 'Mobile Application',      type: 'mobile', description: 'Pending official authorization' },
      { target: 'Public API',              type: 'api',    description: 'Pending official authorization' },
      { target: 'Loyalty Account System',  type: 'web',    description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Operational, flight-control, or aircraft systems',
      'Crew, dispatch, or staff systems',
      'Real passenger data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_HIGH,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-22', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_HIGH,
  },
  {
    id: '2',
    name: 'ADY Vulnerability Disclosure',
    organization: 'Azərbaycan Dəmir Yolları',
    slug: 'ady',
    description:
      'Demo card for the national railway operator. Real testing requires explicit official authorization.',
    longDescription:
      'Azərbaycan Dəmir Yolları (ADY) runs Azerbaijan’s national railway network for passengers and freight. This card describes a potential VDP for ADY’s customer-facing platforms. Scope is illustrative; reward ranges are demo / planned values pending an official program.',
    industry: 'Railway / Transport',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_HIGH,
    assetsCount: 4,
    lastUpdated: '2026-04-20',
    tags: ['Railway', 'Web', 'API', 'Demo Card'],
    featured: true,
    inScope: [
      { target: 'Official Website',     type: 'web',    description: 'Pending official authorization' },
      { target: 'Ticket Booking',       type: 'web',    description: 'Pending official authorization' },
      { target: 'Schedule & Tracking',  type: 'api',    description: 'Pending official authorization' },
      { target: 'Mobile Application',   type: 'mobile', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Signalling, dispatch, or rolling-stock systems',
      'Real passenger data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_HIGH,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-20', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_HIGH,
  },
  {
    id: '3',
    name: 'ASCO Disclosure Program',
    organization: 'Azərbaycan Xəzər Dəniz Gəmiçiliyi',
    slug: 'asco',
    description:
      'Demo card for the national Caspian shipping company. Real testing requires explicit official authorization.',
    longDescription:
      'Azərbaycan Xəzər Dəniz Gəmiçiliyi (ASCO) operates merchant and tanker fleets on the Caspian. This card outlines what a private-preview disclosure program could look like for ASCO’s corporate digital surfaces. Reward ranges are demo / planned values.',
    industry: 'Maritime / Shipping',
    status: 'active',
    type: 'private-preview',
    rewardRange: RANGE_STANDARD,
    assetsCount: 3,
    lastUpdated: '2026-04-15',
    tags: ['Maritime', 'Web', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Corporate Website',    type: 'web', description: 'Pending official authorization' },
      { target: 'Cargo Tracking Site',  type: 'web', description: 'Pending official authorization' },
      { target: 'Partner Portal',       type: 'web', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Vessel control, navigation, or maritime safety systems',
      'Customer or partner business data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_STANDARD,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-15', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_STANDARD,
  },
  {
    id: '4',
    name: 'Bakı Metropoliteni Disclosure',
    organization: 'Bakı Metropoliteni',
    slug: 'baki-metropoliteni',
    description:
      'Demo card for Baku’s metro service. Real testing requires explicit official authorization.',
    longDescription:
      'Bakı Metropoliteni operates Baku’s underground metro network. This card sketches a potential VDP for the metro’s customer-facing surfaces, including schedule and ticketing flows. Reward ranges are demo / planned values pending an official program.',
    industry: 'Metro / Public Transport',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_STANDARD,
    assetsCount: 4,
    lastUpdated: '2026-04-18',
    tags: ['Metro', 'Web', 'Mobile', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Official Website',         type: 'web',    description: 'Pending official authorization' },
      { target: 'Schedule & Info Portal',   type: 'web',    description: 'Pending official authorization' },
      { target: 'Ticket / Payment System',  type: 'web',    description: 'Pending official authorization' },
      { target: 'Mobile Application',       type: 'mobile', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Train control, signalling, or station OT systems',
      'Real passenger data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_STANDARD,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-18', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_STANDARD,
  },
  {
    id: '5',
    name: 'BakuBus Disclosure',
    organization: 'BakuBus',
    slug: 'bakubus',
    description:
      'Demo card for Baku’s public bus operator. Real testing requires explicit official authorization.',
    longDescription:
      'BakuBus runs the city’s public bus fleet. This card outlines what a coordinated VDP could cover for the operator’s customer-facing surfaces. Reward ranges are demo / planned values.',
    industry: 'Bus Transport',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_LOW,
    assetsCount: 3,
    lastUpdated: '2026-04-12',
    tags: ['Bus', 'Web', 'Mobile', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Official Website',     type: 'web',    description: 'Pending official authorization' },
      { target: 'Route Information',    type: 'web',    description: 'Pending official authorization' },
      { target: 'Mobile Application',   type: 'mobile', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Vehicle telematics or fleet OT systems',
      'Real customer data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_LOW,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-12', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_LOW,
  },
  {
    id: '6',
    name: 'Baku Shipyard Disclosure',
    organization: 'Bakı Gəmiqayırma Zavodu',
    slug: 'baki-shipyard',
    description:
      'Demo card for the Baku Shipyard. Real testing requires explicit official authorization.',
    longDescription:
      'Bakı Gəmiqayırma Zavodu (BSY) builds and maintains marine vessels. This card sketches what a private-preview disclosure program could look like for the shipyard’s corporate digital surfaces. Reward ranges are demo / planned values.',
    industry: 'Shipbuilding',
    status: 'upcoming',
    type: 'private-preview',
    rewardRange: RANGE_STANDARD,
    assetsCount: 2,
    lastUpdated: '2026-04-10',
    tags: ['Shipbuilding', 'Web', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Corporate Website', type: 'web', description: 'Pending official authorization' },
      { target: 'Project Portal',    type: 'web', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Industrial control or shipyard OT systems',
      'Project / commercial data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_STANDARD,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-10', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_STANDARD,
  },
  {
    id: '7',
    name: 'Azərkosmos Disclosure',
    organization: 'Azərkosmos',
    slug: 'azerkosmos',
    description:
      'Demo card for Azerbaijan’s national satellite operator. Real testing requires explicit official authorization.',
    longDescription:
      'Azərkosmos operates Azerbaijan’s satellite communications infrastructure. This card outlines a potential private-preview disclosure program for the operator’s corporate and customer-facing surfaces. Operational satellite and ground systems are explicitly out of scope. Reward ranges are demo / planned values.',
    industry: 'Space / Satellite',
    status: 'upcoming',
    type: 'private-preview',
    rewardRange: RANGE_TOP,
    assetsCount: 3,
    lastUpdated: '2026-04-25',
    tags: ['Space', 'Satellite', 'Demo Card'],
    featured: true,
    inScope: [
      { target: 'Corporate Website',           type: 'web', description: 'Pending official authorization' },
      { target: 'Customer Portal',             type: 'web', description: 'Pending official authorization' },
      { target: 'Public Information Portal',   type: 'web', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Satellite control, ground-segment, or telemetry systems',
      'Customer mission data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_TOP,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-25', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_TOP,
  },
  {
    id: '8',
    name: 'Aztelekom Disclosure',
    organization: 'Aztelekom',
    slug: 'aztelekom',
    description:
      'Demo card for Azerbaijan’s incumbent telecom operator. Real testing requires explicit official authorization.',
    longDescription:
      'Aztelekom is Azerbaijan’s national telecommunications provider. This card sketches what a VDP could cover for Aztelekom’s customer-facing portals and mobile app. Reward ranges are demo / planned values.',
    industry: 'Telecommunications',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_HIGH,
    assetsCount: 4,
    lastUpdated: '2026-04-21',
    tags: ['Telecom', 'Web', 'Mobile', 'Demo Card'],
    featured: true,
    inScope: [
      { target: 'Customer Portal',     type: 'web',    description: 'Pending official authorization' },
      { target: 'Mobile Application',  type: 'mobile', description: 'Pending official authorization' },
      { target: 'Public Website',      type: 'web',    description: 'Pending official authorization' },
      { target: 'Billing Portal',      type: 'web',    description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Network core, BSS/OSS, or transmission systems',
      'Subscriber traffic or call records',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_HIGH,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-21', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_HIGH,
  },
  {
    id: '9',
    name: 'AzInTelecom Disclosure',
    organization: 'AzInTelecom',
    slug: 'azintelecom',
    description:
      'Demo card for the national digital infrastructure operator. Real testing requires explicit official authorization.',
    longDescription:
      'AzInTelecom runs national-scale digital infrastructure including data center and cloud services. This card outlines a potential VDP for the operator’s customer-facing portals and APIs. Reward ranges are demo / planned values.',
    industry: 'Cloud / Digital Infrastructure',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_HIGH,
    assetsCount: 3,
    lastUpdated: '2026-04-19',
    tags: ['Cloud', 'API', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Cloud Console',     type: 'web',   description: 'Pending official authorization' },
      { target: 'Customer Portal',   type: 'web',   description: 'Pending official authorization' },
      { target: 'Public API',        type: 'api',   description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Other customers’ tenants, workloads, or data',
      'Underlying hypervisor / infrastructure',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_HIGH,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-19', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_HIGH,
  },
  {
    id: '10',
    name: 'Azərpoçt Disclosure',
    organization: 'Azərpoçt',
    slug: 'azerpoct',
    description:
      'Demo card for the national postal operator. Real testing requires explicit official authorization.',
    longDescription:
      'Azərpoçt provides nationwide postal and logistics services. This card sketches a VDP for the operator’s customer-facing surfaces including tracking and online payment flows. Reward ranges are demo / planned values.',
    industry: 'Postal / Logistics',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_STANDARD,
    assetsCount: 4,
    lastUpdated: '2026-04-17',
    tags: ['Postal', 'Web', 'Mobile', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Tracking Site',         type: 'web',    description: 'Pending official authorization' },
      { target: 'Customer Portal',       type: 'web',    description: 'Pending official authorization' },
      { target: 'Mobile Application',    type: 'mobile', description: 'Pending official authorization' },
      { target: 'Online Payment Flow',   type: 'web',    description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Postal sorting / OT systems',
      'Real recipient or financial data',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_STANDARD,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-17', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_STANDARD,
  },
  {
    id: '11',
    name: 'Bakı Taksi Disclosure',
    organization: 'Bakı Taksi Xidməti',
    slug: 'baki-taksi',
    description:
      'Demo card for the Baku municipal taxi service. Real testing requires explicit official authorization.',
    longDescription:
      'Bakı Taksi Xidməti provides licensed taxi services in Baku. This card outlines a potential VDP for the operator’s customer and driver mobile apps and booking site. Reward ranges are demo / planned values.',
    industry: 'Taxi / Mobility',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_LOW,
    assetsCount: 3,
    lastUpdated: '2026-04-14',
    tags: ['Mobility', 'Mobile', 'Web', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Customer Mobile App',   type: 'mobile', description: 'Pending official authorization' },
      { target: 'Driver Mobile App',     type: 'mobile', description: 'Pending official authorization' },
      { target: 'Booking Site',          type: 'web',    description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Driver or passenger personal data',
      'Live ride dispatching or pricing engines',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_LOW,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-14', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_LOW,
  },
  {
    id: '12',
    name: 'Teleradio Disclosure',
    organization: 'Teleradio',
    slug: 'teleradio',
    description:
      'Demo card for the national broadcasting infrastructure operator. Real testing requires explicit official authorization.',
    longDescription:
      'Teleradio operates national broadcasting infrastructure for radio and television. This card sketches a VDP for the operator’s customer-facing portals and streaming app. Broadcasting and transmission infrastructure remain explicitly out of scope. Reward ranges are demo / planned values.',
    industry: 'Broadcasting / TV / Radio',
    status: 'active',
    type: 'vdp',
    rewardRange: RANGE_STANDARD,
    assetsCount: 3,
    lastUpdated: '2026-04-13',
    tags: ['Broadcasting', 'Web', 'Demo Card'],
    featured: false,
    inScope: [
      { target: 'Official Website',    type: 'web',    description: 'Pending official authorization' },
      { target: 'Streaming Portal',    type: 'web',    description: 'Pending official authorization' },
      { target: 'Mobile Application',  type: 'mobile', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Broadcast transmitters, encoders, or RF infrastructure',
      'Editorial or production systems',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_STANDARD,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-13', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_STANDARD,
  },
  {
    id: '13',
    name: 'MSIM Disclosure',
    organization: 'Milli Süni İntellekt Mərkəzi',
    slug: 'msim',
    description:
      'Demo card for the National Artificial Intelligence Center. Real testing requires explicit official authorization.',
    longDescription:
      'Milli Süni İntellekt Mərkəzi (MSIM) is Azerbaijan’s national AI center. This card outlines a potential private-preview disclosure program for the center’s research portal, public APIs, and model-showcase surfaces. Reward ranges are demo / planned values.',
    industry: 'Artificial Intelligence / National AI',
    status: 'upcoming',
    type: 'private-preview',
    rewardRange: RANGE_TOP,
    assetsCount: 3,
    lastUpdated: '2026-04-26',
    tags: ['AI', 'API', 'Demo Card'],
    featured: true,
    inScope: [
      { target: 'Research Portal',  type: 'web', description: 'Pending official authorization' },
      { target: 'Public API',       type: 'api', description: 'Pending official authorization' },
      { target: 'Model Showcase',   type: 'web', description: 'Pending official authorization' },
    ],
    outOfScope: [
      'Internal training datasets and model weights',
      'Partner / research-collaborator systems',
      ...COMMON_OUT_OF_SCOPE,
    ],
    rewards: REWARDS_TOP,
    rules: COMMON_RULES,
    updates: [
      { id: '1', date: '2026-04-26', title: 'Demo program card published', description: 'Initial scope categories and demo reward tiers drafted for the AZCON Hackathon demo.', type: 'general' },
    ],
    hallOfFame: [],
    responseTime: RESPONSE_TOP,
  },
]

export const researchers: Researcher[] = [
  {
    id: '1',
    name: 'CyberNomad',
    handle: 'cybernomad',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 12500,
    reportsAccepted: 42,
    reportsSubmitted: 58,
    reputation: 98,
    rank: 1,
    badges: [
      { id: '1', name: 'First Blood', description: 'First accepted report on a program', icon: 'target', earnedDate: '2025-06-15' },
      { id: '2', name: 'Critical Hunter', description: 'Found 5+ critical vulnerabilities', icon: 'shield', earnedDate: '2025-09-20' },
      { id: '3', name: 'Top 10', description: 'Ranked in top 10 researchers', icon: 'trophy', earnedDate: '2025-12-01' },
    ],
    joinedDate: '2025-03-10',
    totalRewards: 28500,
  },
  {
    id: '2',
    name: 'BugSlayer_AZ',
    handle: 'bugslayer_az',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 9800,
    reportsAccepted: 35,
    reportsSubmitted: 48,
    reputation: 95,
    rank: 2,
    badges: [
      { id: '1', name: 'First Blood', description: 'First accepted report on a program', icon: 'target', earnedDate: '2025-05-20' },
      { id: '2', name: 'Speed Demon', description: 'Fastest triage to resolution', icon: 'zap', earnedDate: '2025-08-15' },
    ],
    joinedDate: '2025-04-05',
    totalRewards: 22300,
  },
  {
    id: '3',
    name: 'SecurityPro',
    handle: 'securitypro',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 8500,
    reportsAccepted: 28,
    reportsSubmitted: 35,
    reputation: 94,
    rank: 3,
    badges: [
      { id: '1', name: 'Cloud Expert', description: 'Specialized in cloud vulnerabilities', icon: 'cloud', earnedDate: '2025-10-10' },
    ],
    joinedDate: '2025-05-12',
    totalRewards: 19800,
  },
  {
    id: '4',
    name: 'HackerBaku',
    handle: 'hackerbaku',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 7200,
    reportsAccepted: 24,
    reportsSubmitted: 32,
    reputation: 92,
    rank: 4,
    badges: [
      { id: '1', name: 'Web Wizard', description: 'Expert in web vulnerabilities', icon: 'globe', earnedDate: '2025-07-22' },
    ],
    joinedDate: '2025-06-18',
    totalRewards: 15600,
  },
  {
    id: '5',
    name: 'PayloadMaster',
    handle: 'payloadmaster',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 6800,
    reportsAccepted: 22,
    reportsSubmitted: 28,
    reputation: 91,
    rank: 5,
    badges: [
      { id: '1', name: 'API Hunter', description: 'Found 10+ API vulnerabilities', icon: 'code', earnedDate: '2025-11-05' },
    ],
    joinedDate: '2025-07-03',
    totalRewards: 14200,
  },
  {
    id: '6',
    name: 'NullByte',
    handle: 'nullbyte',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 5900,
    reportsAccepted: 19,
    reportsSubmitted: 25,
    reputation: 89,
    rank: 6,
    badges: [],
    joinedDate: '2025-08-15',
    totalRewards: 11800,
  },
  {
    id: '7',
    name: 'VulnSeeker',
    handle: 'vulnseeker',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 5200,
    reportsAccepted: 17,
    reportsSubmitted: 22,
    reputation: 88,
    rank: 7,
    badges: [],
    joinedDate: '2025-09-01',
    totalRewards: 9500,
  },
  {
    id: '8',
    name: 'XSSMaster',
    handle: 'xssmaster',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 4800,
    reportsAccepted: 16,
    reportsSubmitted: 21,
    reputation: 87,
    rank: 8,
    badges: [],
    joinedDate: '2025-09-20',
    totalRewards: 8700,
  },
  {
    id: '9',
    name: 'CaspianHacker',
    handle: 'caspianhacker',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 4200,
    reportsAccepted: 14,
    reportsSubmitted: 18,
    reputation: 85,
    rank: 9,
    badges: [],
    joinedDate: '2025-10-05',
    totalRewards: 7200,
  },
  {
    id: '10',
    name: 'BountyKing',
    handle: 'bountyking',
    country: 'Azerbaijan',
    countryCode: 'AZ',
    points: 3800,
    reportsAccepted: 12,
    reportsSubmitted: 16,
    reputation: 84,
    rank: 10,
    badges: [],
    joinedDate: '2025-10-20',
    totalRewards: 6500,
  },
]

export const reports: Report[] = [
  {
    id: '1',
    title: 'SQL Injection in Search Endpoint',
    programId: '8',
    programName: 'Aztelekom Disclosure',
    severity: 'critical',
    status: 'rewarded',
    submittedDate: '2026-04-10',
    lastUpdated: '2026-04-15',
    reward: 4500,
    asset: 'Customer Portal',
    weaknessType: 'SQL Injection',
  },
  {
    id: '2',
    title: 'IDOR in Loyalty Account',
    programId: '1',
    programName: 'AZAL Responsible Disclosure',
    severity: 'high',
    status: 'resolved',
    submittedDate: '2026-04-08',
    lastUpdated: '2026-04-12',
    reward: 1800,
    asset: 'Loyalty Account System',
    weaknessType: 'Insecure Direct Object Reference',
  },
  {
    id: '3',
    title: 'Stored XSS in Tracking Notes',
    programId: '2',
    programName: 'ADY Vulnerability Disclosure',
    severity: 'medium',
    status: 'triaged',
    submittedDate: '2026-04-18',
    lastUpdated: '2026-04-20',
    asset: 'Schedule & Tracking',
    weaknessType: 'Cross-Site Scripting',
  },
  {
    id: '4',
    title: 'Authentication Bypass via Token Replay',
    programId: '9',
    programName: 'AzInTelecom Disclosure',
    severity: 'critical',
    status: 'pending',
    submittedDate: '2026-04-22',
    lastUpdated: '2026-04-22',
    asset: 'Cloud Console',
    weaknessType: 'Authentication Bypass',
  },
  {
    id: '5',
    title: 'CSRF in Password Change',
    programId: '8',
    programName: 'Aztelekom Disclosure',
    severity: 'medium',
    status: 'resolved',
    submittedDate: '2026-04-05',
    lastUpdated: '2026-04-10',
    reward: 350,
    asset: 'Customer Portal',
    weaknessType: 'Cross-Site Request Forgery',
  },
  {
    id: '6',
    title: 'Information Disclosure in Error Pages',
    programId: '10',
    programName: 'Azərpoçt Disclosure',
    severity: 'low',
    status: 'rewarded',
    submittedDate: '2026-04-15',
    lastUpdated: '2026-04-18',
    reward: 150,
    asset: 'Tracking Site',
    weaknessType: 'Information Exposure',
  },
  {
    id: '7',
    title: 'Rate Limiting Bypass on Login',
    programId: '1',
    programName: 'AZAL Responsible Disclosure',
    severity: 'medium',
    status: 'draft',
    submittedDate: '2026-04-24',
    lastUpdated: '2026-04-24',
    asset: 'Mobile Application',
    weaknessType: 'Improper Rate Limiting',
  },
]

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
  { asset: 'AZAL Public API',          reports: 45, severity: 'high'     as const },
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
