export type Locale = 'en' | 'az'

export const LOCALES: Locale[] = ['en', 'az']
export const DEFAULT_LOCALE: Locale = 'az'

type Dict = Record<string, string>

const en: Dict = {
  // ─── Common
  'common.viewAll': 'View All',
  'common.browseAll': 'Browse All',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.cancel': 'Cancel',
  'common.submit': 'Submit',
  'common.close': 'Close',
  'common.optional': 'Optional',
  'common.required': 'Required',
  'common.demoData': 'Demo Data',
  'common.demoMode': 'Demo Mode',
  'common.hackathonDemo': 'Hackathon Demo',
  'common.comingSoon': 'Coming Soon',
  'common.demoBanner': 'Demo data for illustration purposes',
  'common.fictionalDataNote': 'Fictional programs and sample data',

  // ─── Disclaimer / positioning
  'disclaimer.azCitizensOnly': 'For Azerbaijani citizens only',
  'disclaimer.azCitizensLong':
    'HackTheBug is intended exclusively for citizens of the Republic of Azerbaijan. Identity verification will be required at launch.',
  'disclaimer.simaShort': 'SİMA verification — coming soon',
  'disclaimer.simaLong':
    'Identity verification through SİMA is planned. The current build does not perform real identity checks — everything you see is a demo.',
  'disclaimer.notLiveYet':
    'This is a hackathon prototype. Real registration, verification, and payouts are not active yet.',
  'disclaimer.azCitizensBanner':
    'For Azerbaijani citizens only · SİMA verification planned · This build is a demo',

  // ─── Navigation
  'nav.home': 'Home',
  'nav.programs': 'Programs',
  'nav.leaderboard': 'Leaderboard',
  'nav.about': 'About',
  'nav.dashboard': 'Dashboard',
  'nav.dashboard.researcher': 'Researcher View',
  'nav.dashboard.organization': 'Organization View',
  'nav.cta.launchDemo': 'Launch Demo',
  'nav.cta.login': 'Log in',
  'nav.cta.register': 'Sign up',
  'nav.cta.logout': 'Log out',
  'nav.user.myDashboard': 'Dashboard',
  'nav.user.signedInAs': 'Signed in as',
  'nav.lang.label': 'Language',

  // ─── Settings menu (gear icon in nav)
  'settings.label': 'Settings',
  'settings.language': 'Language',
  'settings.theme': 'Theme',
  'settings.theme.light': 'Light',
  'settings.theme.dark': 'Dark',
  'settings.theme.system': 'System',
  'settings.accent': 'Accent color',
  'settings.accent.hint':
    'Affects primary buttons, focus rings, and neon accents.',
  'settings.accent.cyan': 'Cyan',
  'settings.accent.purple': 'Purple',
  'settings.accent.blue': 'Blue',
  'settings.accent.red': 'Red',
  'settings.accent.emerald': 'Emerald',
  'settings.accent.amber': 'Amber',
  'nav.lang.short': 'Lang',
  'role.researcher': 'Researcher',
  'role.organization': 'Organization',

  // ─── Footer
  'footer.platform': 'Platform',
  'footer.resources': 'Resources',
  'footer.legal': 'Legal',
  'footer.about': 'About',
  'footer.faq': 'FAQ',
  'footer.howItWorks': 'How It Works',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.safeHarbor': 'Safe Harbor',
  'footer.tagline':
    'Responsible security testing for Azerbaijan’s digital platforms. Connecting Azerbaijani organizations with verified ethical hackers.',
  'footer.copyright': '© 2026 HackTheBug. All rights reserved.',
  'footer.dashboardResearcher': 'Researcher Dashboard',
  'footer.dashboardOrganization': 'Organization Dashboard',

  // ─── Severity labels
  'severity.critical': 'Critical',
  'severity.high': 'High',
  'severity.medium': 'Medium',
  'severity.low': 'Low',
  'severity.informational': 'Info',

  // ─── Report status labels
  'status.draft': 'Draft',
  'status.pending': 'Pending',
  'status.triaged': 'Triaged',
  'status.resolved': 'Resolved',
  'status.rewarded': 'Rewarded',
  'status.duplicate': 'Duplicate',
  'status.invalid': 'Invalid',

  // ─── Program type / status labels
  'programType.bug-bounty': 'Bug Bounty',
  'programType.bug-bounty.long': 'Bug Bounty Program',
  'programType.vdp': 'VDP',
  'programType.vdp.long': 'Vulnerability Disclosure Program',
  'programType.private-preview': 'Private Preview',
  'programStatus.active': 'Active',
  'programStatus.upcoming': 'Upcoming',
  'programStatus.paused': 'Paused',
  'programStatus.closed': 'Closed',

  // ─── Program card
  'programCard.featured': 'Featured',
  'programCard.rewards': 'Demo rewards',
  'programCard.assets': 'Assets',
  'programCard.updated': 'Updated',
  'programCard.viewProgram': 'View Program',

  // ─── Home / landing
  'home.hero.badge': 'Azerbaijan’s First Bug Bounty Platform',
  'home.hero.azBadge': 'For Azerbaijani citizens only',
  'home.hero.title.line1': 'Find Vulnerabilities.',
  'home.hero.title.line2': 'Reward Researchers.',
  'home.hero.title.line3': 'Strengthen Trust.',
  'home.hero.subtitle':
    'HackTheBug connects Azerbaijani organizations with verified Azerbaijani ethical hackers for responsible security testing. Discover vulnerabilities before attackers do.',
  'home.hero.cta.explore': 'Explore Programs',
  'home.hero.cta.leaderboard': 'View Leaderboard',
  'home.hero.simaNote': 'Identity verification via SİMA — coming soon',
  'home.preview.dashboardTitle': 'Security Dashboard',
  'home.preview.dashboardSubtitle': 'Demo Preview',
  'home.preview.live': 'Live',
  'home.preview.openReports': 'Open Reports',
  'home.preview.resolved': 'Resolved',
  'home.preview.critical': 'Critical',
  'home.preview.rewards': 'Rewards',
  'home.preview.prototype': 'Prototype',

  'home.stats.activePrograms': 'Active Programs',
  'home.stats.verifiedResearchers': 'Verified Researchers',
  'home.stats.reportsSubmitted': 'Reports Submitted',
  'home.stats.avgTriage': 'Avg. Triage Time',
  'home.stats.rewardsPaid': 'Rewards Paid',
  'home.stats.organizations': 'Organizations',

  'home.how.badge': 'Process',
  'home.how.title': 'How It Works',
  'home.how.subtitle':
    'A simple four-step process for verified Azerbaijani researchers to find and report vulnerabilities responsibly.',
  'home.how.step1.title': 'Browse Programs',
  'home.how.step1.desc':
    'Explore active bug bounty and vulnerability disclosure programs from Azerbaijani organizations.',
  'home.how.step2.title': 'Test Responsibly',
  'home.how.step2.desc':
    'Follow scope guidelines and test in-scope assets using ethical hacking practices.',
  'home.how.step3.title': 'Submit Reports',
  'home.how.step3.desc':
    'Document your findings with detailed reports including steps to reproduce and impact.',
  'home.how.step4.title': 'Earn Recognition',
  'home.how.step4.desc':
    'Get rewarded for valid findings, build your reputation, and climb the leaderboard.',

  'home.features.badge': 'Features',
  'home.features.title': 'Platform Features',
  'home.features.subtitle':
    'Everything an Azerbaijani organization needs to run a structured bug bounty or vulnerability disclosure program.',
  'home.features.scope.title': 'Program Scope & Rules',
  'home.features.scope.desc':
    'Clear in-scope and out-of-scope definitions for every program.',
  'home.features.reporting.title': 'Structured Reporting',
  'home.features.reporting.desc':
    'Guided submission process for detailed, actionable vulnerability reports.',
  'home.features.rewards.title': 'Severity-Based Rewards',
  'home.features.rewards.desc':
    'Transparent reward tiers based on vulnerability severity and impact.',
  'home.features.leaderboard.title': 'Researcher Leaderboard',
  'home.features.leaderboard.desc':
    'Compete with peers and showcase your skills on the public leaderboard.',
  'home.features.tracking.title': 'Report Tracking',
  'home.features.tracking.desc':
    'Real-time status updates from submission to resolution.',
  'home.features.identity.title': 'Identity Verification',
  'home.features.identity.desc':
    'SİMA-based verification for Azerbaijani citizens — planned for the launch milestone.',

  'home.value.badge': 'Why HackTheBug?',
  'home.value.title': 'A trusted platform built for Azerbaijan',
  'home.value.body':
    'Azerbaijan’s digital transformation needs a local, trusted home for responsible disclosure. HackTheBug is built specifically for Azerbaijani organizations and Azerbaijani citizens — so context, language, and identity verification all match the country it serves.',
  'home.value.bullet1': 'Local context with global security standards',
  'home.value.bullet2': 'Transparent reward tiers and SLAs',
  'home.value.bullet3': 'SİMA identity verification — planned',
  'home.value.bullet4': 'Safe harbor for ethical researchers',
  'home.value.forOrgs.title': 'For Organizations',
  'home.value.forOrgs.desc':
    'Proactively find vulnerabilities before malicious actors do.',
  'home.value.forResearchers.title': 'For Researchers',
  'home.value.forResearchers.desc':
    'Get recognized and rewarded for your security skills — open to verified Azerbaijani citizens.',
  'home.value.forEveryone.title': 'For Azerbaijan',
  'home.value.forEveryone.desc':
    'A more secure national digital ecosystem benefits every citizen and every organization.',

  'home.featured.badge': 'Programs',
  'home.featured.title': 'Featured Programs',
  'home.featured.subtitle':
    'Active programs from Azerbaijani organizations.',
  'home.featured.viewAll': 'View All Programs',

  'home.roadmap.badge': 'Roadmap',
  'home.roadmap.title': 'Development Roadmap',
  'home.roadmap.subtitle':
    'Our journey from hackathon demo to a launched, verification-backed platform.',
  'home.roadmap.frontendDemo': 'Frontend Demo',
  'home.roadmap.identity': 'SİMA Identity Verification',
  'home.roadmap.orgDashboard': 'Organization Dashboard',
  'home.roadmap.backend': 'Backend & API',
  'home.roadmap.launch': 'Full Launch',
  'home.roadmap.current': 'Current',

  'home.cta.badge': 'Hackathon Demo',
  'home.cta.title': 'Ready to Explore?',
  'home.cta.body':
    'This is a hackathon prototype showcasing the HackTheBug vision for Azerbaijan. Walk through the demo to see how the platform would work for both researchers and organizations.',
  'home.cta.browse': 'Browse Programs',
  'home.cta.tryDashboard': 'Try Researcher Dashboard',
  'home.cta.goToDashboard': 'Go to my dashboard',

  // ─── Programs directory
  'programs.badge': 'Programs Directory',
  'programs.title': 'Bug Bounty Programs',
  'programs.subtitle':
    'Active programs from organizations across Azerbaijan. Find your next target and start hunting.',
  'programs.search.placeholder':
    'Search programs, organizations, or tags...',
  'programs.filter.industry': 'Industry',
  'programs.filter.allIndustries': 'All Industries',
  'programs.filter.type': 'Type',
  'programs.filter.allTypes': 'All Types',
  'programs.filter.status': 'Status',
  'programs.filter.allStatuses': 'All Statuses',
  'programs.filter.sort': 'Sort by',
  'programs.filter.mobileToggle': 'Filters',
  'programs.sort.newest': 'Newest',
  'programs.sort.rewardsHigh': 'Highest Rewards',
  'programs.sort.rewardsLow': 'Lowest Rewards',
  'programs.sort.assets': 'Most Assets',
  'programs.activeFilters': 'Active filters:',
  'programs.searchTag': 'Search: {q}',
  'programs.clearAll': 'Clear all',
  'programs.results.one': 'Showing {count} program',
  'programs.results.other': 'Showing {count} programs',
  'programs.empty.title': 'No programs found',
  'programs.empty.body': 'Try adjusting your filters or search query.',
  'programs.empty.clear': 'Clear all filters',

  // ─── Program detail
  'program.back': 'Back to Programs',
  'program.tabs.overview': 'Overview',
  'program.tabs.scope': 'Scope',
  'program.tabs.rewards': 'Rewards',
  'program.tabs.rules': 'Rules',
  'program.tabs.updates': 'Updates',
  'program.tabs.hallOfFame': 'Hall of Fame',
  'program.actions.submit': 'Submit Report',
  'program.actions.submit.orgLabel': 'Submitting is for researchers',
  'program.actions.submit.orgDisabled':
    'Organization accounts can review reports but not submit them.',
  'program.actions.bookmark.label': 'Save program',
  'program.actions.bookmark.added': 'Saved to your bookmarks',
  'program.actions.bookmark.removed': 'Removed from your bookmarks',
  'program.actions.bookmark.signinTitle': 'Sign in to save programs',
  'program.actions.bookmark.signinBody':
    'Bookmarks live with your researcher profile — sign in to keep them.',
  'program.actions.bookmark.researcherOnlyTitle': 'Researchers only',
  'program.actions.bookmark.researcherOnlyBody':
    'Saving programs is part of the researcher workflow.',
  'program.actions.share.label': 'Share program',
  'program.actions.share.copied': 'Link copied to your clipboard',
  'program.actions.share.failed':
    'Could not copy the link. Try selecting the URL manually.',
  'program.summary': 'Program Summary',
  'program.responseTimes': 'Response Times',
  'program.responseTimes.first': 'First Response',
  'program.responseTimes.triage': 'Triage',
  'program.responseTimes.resolution': 'Resolution',
  'program.quickStats': 'Quick Stats',
  'program.quickStats.inScope': 'In-Scope Assets',
  'program.quickStats.researchers': 'Researchers',
  'program.quickStats.maxReward': 'Max demo reward',
  'program.safeHarbor.title': 'Safe Harbor',
  'program.safeHarbor.body':
    'This program provides safe harbor for Azerbaijani researchers who follow the program rules and test responsibly.',
  'program.scope.in': 'In Scope',
  'program.scope.out': 'Out of Scope',
  'program.rewards.severity': 'Severity',
  'program.rewards.range': 'Reward Range (AZN)',
  'program.rewards.sla': 'Response SLA',
  'program.rewards.demoNote':
    'Demo / planned reward range — values illustrate what an officially authorized program could pay. Not a real bounty commitment.',
  'program.authNotice.title': 'Pending official authorization',
  'program.authNotice.body':
    'This is a hackathon demo program card representing {org}. No actual testing of any {org} system is authorized in this build. Real testing requires explicit, written authorization from the organization.',
  'program.rules.title': 'Program Rules',
  'program.rules.harbor.title': 'Safe Harbor Statement',
  'program.rules.harbor.body':
    'We will not pursue legal action against researchers who discover and report vulnerabilities responsibly, following these program rules. We consider security research conducted under this policy to be authorized, lawful, and helpful.',
  'program.updates.title': 'Program Updates',
  'program.updates.type.scope': 'Scope',
  'program.updates.type.reward': 'Reward',
  'program.updates.type.policy': 'Policy',
  'program.updates.type.general': 'General',
  'program.hof.title': 'Hall of Fame',
  'program.hof.empty':
    'No researchers yet. Be the first verified Azerbaijani researcher to find a vulnerability!',
  'program.hof.reportsAccepted': '{count} reports accepted',
  'program.hof.points': 'points',
  'program.related.title': 'Similar Programs',

  // ─── Leaderboard
  'leaderboard.title': 'Leaderboard',
  'leaderboard.subtitle':
    'Celebrating the top verified Azerbaijani security researchers. Compete, earn recognition, and climb the ranks.',
  'leaderboard.filter.timeframe': 'Select timeframe',
  'leaderboard.filter.category': 'Select category',
  'leaderboard.timeframe.allTime': 'All Time',
  'leaderboard.timeframe.thisYear': 'This Year',
  'leaderboard.timeframe.thisMonth': 'This Month',
  'leaderboard.timeframe.thisWeek': 'This Week',
  'leaderboard.category.overall': 'Overall',
  'leaderboard.category.web': 'Web Security',
  'leaderboard.category.mobile': 'Mobile Security',
  'leaderboard.category.api': 'API Security',
  'leaderboard.category.crypto': 'Cryptography',
  'leaderboard.podium.points': 'Points',
  'leaderboard.podium.reports': 'Reports',
  'leaderboard.podium.topResearcher': 'Top Researcher',
  'leaderboard.tabs.rankings': 'Full Rankings',
  'leaderboard.tabs.stats': 'Statistics',
  'leaderboard.table.rank': 'Rank',
  'leaderboard.table.researcher': 'Researcher',
  'leaderboard.table.country': 'Country',
  'leaderboard.table.points': 'Points',
  'leaderboard.table.reports': 'Reports',
  'leaderboard.table.rewards': 'Rewards',
  'leaderboard.stats.totalReports': 'Total Reports Accepted',
  'leaderboard.stats.totalRewards': 'Total Rewards Paid',
  'leaderboard.stats.activeResearchers': 'Active Researchers',
  'leaderboard.stats.avgReports': 'Avg Reports / Researcher',
  'leaderboard.cta.title': 'Ready to Join the Top Ranks?',
  'leaderboard.cta.body':
    'Once SİMA verification ships, verified Azerbaijani researchers will be able to join the leaderboard. For now, browse the programs and explore the platform.',
  'leaderboard.cta.browse': 'Browse Programs',

  // ─── About
  'about.badge.prototype': 'Hackathon Prototype',
  'about.hero.title.lead': 'A trusted bug bounty platform for',
  'about.hero.title.highlight': 'Azerbaijani citizens',
  'about.hero.subtitle':
    'HackTheBug is built exclusively for the Republic of Azerbaijan. It connects Azerbaijani organizations — banks, telecoms, government portals, fintech — with verified Azerbaijani security researchers, on a single regional platform.',
  'about.hero.cta.explore': 'Explore Programs',
  'about.hero.cta.dashboard': 'Researcher Dashboard',
  'about.stats.label.activePrograms': 'Active Programs',
  'about.stats.label.verifiedResearchers': 'Verified Researchers',
  'about.stats.label.reportsSubmitted': 'Reports Submitted',
  'about.stats.label.partnerOrgs': 'Partner Organizations',
  'about.mission.badge': 'Mission',
  'about.mission.title': 'Our Mission',
  'about.mission.subtitle':
    'Make responsible disclosure the default for Azerbaijan’s digital infrastructure — and reward the people doing the work.',
  'about.mission.b1.title': 'Bring researchers and organizations into one room',
  'about.mission.b1.body':
    'Today, regional security findings happen ad-hoc — by email, by direct message, or not at all. HackTheBug is the structured place to coordinate.',
  'about.mission.b2.title': 'Verify researcher identity through SİMA',
  'about.mission.b2.body':
    'Trust matters in security disclosure. Once integration ships, verified Azerbaijani researchers will unlock access to private programs and higher-trust workflows. Verification is not active in this build.',
  'about.mission.b3.title': 'Reward fairly, recognize publicly',
  'about.mission.b3.body':
    'Transparent reward tiers per severity, and a public hall of fame so researchers build a portable national reputation.',
  'about.mission.forOrgs.title': 'For Organizations',
  'about.mission.forOrgs.body':
    'Publish a program, set scope and rewards, triage incoming reports with clear SLAs.',
  'about.mission.forResearchers.title': 'For Researchers',
  'about.mission.forResearchers.body':
    'Find programs, test responsibly under safe-harbor terms, build a public reputation. Open to verified Azerbaijani citizens.',
  'about.mission.regional.title': 'Built for Azerbaijan',
  'about.mission.regional.body':
    'Azerbaijani context first — language, SİMA identity verification, and partner organizations across banking, telecom, government, and cloud.',
  'about.values.badge': 'Values',
  'about.values.title': 'Our Values',
  'about.values.subtitle': 'The principles that guide every product decision.',
  'about.values.security.title': 'Security First',
  'about.values.security.body':
    'Finding vulnerabilities before malicious actors do is the foundation of a safer national digital ecosystem.',
  'about.values.ethics.title': 'Ethical Hacking',
  'about.values.ethics.body':
    'Responsible disclosure and a strict code of conduct for every researcher on the platform.',
  'about.values.community.title': 'Community Driven',
  'about.values.community.body':
    'Built to grow with an emerging community of Azerbaijani security researchers who understand local context and compliance.',
  'about.values.recognition.title': 'Fair Recognition',
  'about.values.recognition.body':
    'Transparent reward tiers and a public hall of fame are core, not optional.',
  'about.roadmap.badge': 'Roadmap',
  'about.roadmap.title': 'Roadmap',
  'about.roadmap.subtitle':
    'From a hackathon prototype to a launched, verification-backed platform.',
  'about.roadmap.q4_2025.title': 'Concept',
  'about.roadmap.q4_2025.body':
    'Identified the gap: Azerbaijani digital products and organizations had no localized, trusted home for responsible disclosure.',
  'about.roadmap.q1_2026.title': 'Design & Prototype',
  'about.roadmap.q1_2026.body':
    'Built the design system, mock data set, and core flows — landing, programs directory, program detail, dashboards, and report submission.',
  'about.roadmap.q2_2026.title': 'AZCON Hackathon',
  'about.roadmap.q2_2026.body':
    'Frontend demo presented at the AZCON Hackathon. Currently here.',
  'about.roadmap.q3_2026.title': 'SİMA Verification & Private Beta',
  'about.roadmap.q3_2026.body':
    'Wire up SİMA verification for researchers and organizations. Onboard a small set of partners for closed testing.',
  'about.roadmap.q4_2026.title': 'Backend, API & Public Launch',
  'about.roadmap.q4_2026.body':
    'Real database, API, notification system, and triage workflows. Open the platform to verified Azerbaijani researchers.',
  'about.team.badge': 'Team Holberton',
  'about.team.title': 'Built for AZCON Hackathon',
  'about.team.subtitle':
    'A focused team covering the four disciplines a security platform needs from day one.',
  'about.team.eng.title': 'Engineering',
  'about.team.eng.body': 'Frontend, design system, and the path to a real backend.',
  'about.team.des.title': 'Design',
  'about.team.des.body':
    'Premium dark cybersecurity SaaS visual language and UX flows.',
  'about.team.sec.title': 'Security Research',
  'about.team.sec.body':
    'Domain expertise — scope design, severity tiers, and disclosure workflows.',
  'about.team.prd.title': 'Product',
  'about.team.prd.body':
    'Roadmap from prototype to launch — SİMA, organizations, researchers.',
  'about.cta.title': 'Want to see how it would work?',
  'about.cta.body':
    'The demo walks both sides of the platform — researchers browsing programs and organizations triaging reports. Real backend, real auth, and SİMA verification land in later milestones.',
  'about.cta.browse': 'Browse Programs',
  'about.cta.orgDashboard': 'Organization Dashboard',

  // ─── Researcher dashboard
  'dashboard.researcher.viewBadge': 'Researcher Dashboard',
  'dashboard.demoBadge': 'Demo View',
  'dashboard.researcher.welcome': 'Welcome back, {name}',
  'dashboard.researcher.subtitle':
    'Track your reports, rewards, and reputation.',
  'dashboard.researcher.findPrograms': 'Find Programs',
  'dashboard.researcher.stats.submitted': 'Reports Submitted',
  'dashboard.researcher.stats.accepted': 'Accepted',
  'dashboard.researcher.stats.pending': 'Pending Triage',
  'dashboard.researcher.stats.rewards': 'Total Rewards',
  'dashboard.researcher.stats.reputation': 'Reputation',
  'dashboard.researcher.stats.rank': 'National Rank',
  'dashboard.researcher.stats.error.title': 'Could not load your dashboard stats',
  'dashboard.researcher.timeline.title': 'Reports Over Time',
  'dashboard.researcher.timeline.subtitle':
    'Your submission activity over the past 6 months.',
  'dashboard.researcher.severity.title': 'Findings by Severity',
  'dashboard.researcher.severity.subtitle':
    'Distribution of your accepted reports.',
  'dashboard.researcher.recent.title': 'Recent Submissions',
  'dashboard.researcher.recent.subtitle':
    'Your latest vulnerability reports.',
  'dashboard.researcher.recent.col.report': 'Report',
  'dashboard.researcher.recent.col.program': 'Program',
  'dashboard.researcher.recent.col.severity': 'Severity',
  'dashboard.researcher.recent.col.status': 'Status',
  'dashboard.researcher.recent.col.reward': 'Reward',
  'dashboard.researcher.recent.empty':
    'No reports yet. Submit your first finding from a program page.',
  'dashboard.researcher.recent.toast.title': 'Full report list — coming soon',
  'dashboard.researcher.recent.toast.body':
    'A dedicated reports table is on the roadmap. For now, recent rows are shown above.',
  'dashboard.researcher.achievements.title': 'Achievements',
  'dashboard.researcher.achievements.earned': 'Earned',
  'dashboard.researcher.achievements.first': 'First Blood',
  'dashboard.researcher.achievements.critical': 'Critical Hunter',
  'dashboard.researcher.achievements.top10': 'Top 10',
  'dashboard.researcher.verification.title': 'Identity Verification',
  'dashboard.researcher.verification.body':
    'SİMA verification for Azerbaijani citizens — planned. The current build is a demo and does not perform real verification.',
  'dashboard.researcher.saved.title': 'Saved Programs',
  'dashboard.researcher.saved.empty':
    'No saved programs yet. Bookmark a program from its detail page.',
  'dashboard.researcher.saved.browse': 'Browse programs',
  'dashboard.researcher.recommended.title': 'Recommended for You',
  'dashboard.researcher.recommended.empty':
    'Nothing new to recommend. Visit the programs directory to explore.',
  'dashboard.researcher.maxLabel': '{amount} AZN max',

  // ─── Dashboard charts (shared empty/error labels)
  'dashboard.charts.empty':
    'No data yet — the chart will populate as reports come in.',
  'dashboard.charts.error.title': 'Could not load chart data',

  // ─── Organization dashboard
  'dashboard.org.viewBadge': 'Organization Dashboard',
  'dashboard.org.title': 'Security Dashboard',
  'dashboard.org.subtitle':
    'Monitor your bug bounty program performance and incoming reports.',
  'dashboard.org.viewProgram': 'View Program',
  'dashboard.org.stats.totalReports': 'Total Reports',
  'dashboard.org.stats.openReports': 'Open Reports',
  'dashboard.org.stats.avgTriage': 'Avg. Triage Time',
  'dashboard.org.stats.critical': 'Critical Findings',
  'dashboard.org.stats.rewardsPaid': 'Rewards Paid',
  'dashboard.org.stats.resolved': 'Resolved This Month',
  'dashboard.org.stats.error.title': 'Could not load your dashboard stats',
  'dashboard.org.trend.title': 'Reports & Resolution Trend',
  'dashboard.org.trend.subtitle': 'Incoming reports vs resolved over time.',
  'dashboard.org.trend.legend.reports': 'Reports',
  'dashboard.org.trend.legend.resolved': 'Resolved',
  'dashboard.org.severity.title': 'Severity Distribution',
  'dashboard.org.severity.subtitle': 'Breakdown by vulnerability severity.',
  'dashboard.org.pipeline.title': 'Reports Pipeline',
  'dashboard.org.pipeline.subtitle': 'Current status of all reports.',
  'dashboard.org.pipeline.new': 'New',
  'dashboard.org.pipeline.triaging': 'Triaging',
  'dashboard.org.pipeline.validating': 'Validating',
  'dashboard.org.pipeline.fixing': 'Fixing',
  'dashboard.org.pipeline.resolved': 'Resolved',
  'dashboard.org.recent.title': 'Recent Reports',
  'dashboard.org.recent.subtitle': 'Latest incoming vulnerability reports.',
  'dashboard.org.recent.col.report': 'Report',
  'dashboard.org.recent.col.severity': 'Severity',
  'dashboard.org.recent.col.status': 'Status',
  'dashboard.org.recent.col.submitted': 'Submitted',
  'dashboard.org.recent.empty':
    'No reports yet. They will appear here as researchers submit them.',
  'dashboard.org.assets.title': 'Top Targeted Assets',
  'dashboard.org.assets.subtitle': 'Most reported assets in your scope.',
  'dashboard.org.assets.reports': 'reports',
  'dashboard.org.assets.empty':
    'No reports yet — top targeted assets will populate as they come in.',
  'dashboard.org.activity.title': 'Recent Activity',
  'dashboard.org.activity.subtitle': 'Latest actions on your program.',
  'dashboard.org.activity.empty':
    'No activity yet — events show up here once researchers act on your reports.',
  'dashboard.org.activity.event.submitted': 'New report submitted',
  'dashboard.org.activity.event.triaged': 'Report triaged',
  'dashboard.org.activity.event.status_changed': 'Status changed',
  'dashboard.org.activity.event.commented': 'New comment',
  'dashboard.org.activity.event.resolved': 'Report resolved',
  'dashboard.org.activity.event.rewarded': 'Reward issued',
  'dashboard.org.activity.event.closed': 'Report closed',
  'dashboard.org.activity.event.duplicate': 'Marked as duplicate',
  'dashboard.org.activity.event.invalid': 'Marked as invalid',
  'dashboard.org.viewAll.toast.title': 'Full reports queue — coming soon',
  'dashboard.org.viewAll.toast.body':
    'A dedicated org-side reports/triage page is on the roadmap. Recent rows are shown in this widget for now.',
  'dashboard.org.topResearchers.title': 'Top Researchers This Month',
  'dashboard.org.topResearchers.subtitle':
    'Most active researchers on your program.',
  'dashboard.org.topResearchers.reports': '{count} reports',

  // ─── Report submission modal
  'report.title': 'Submit Vulnerability Report',
  'report.description': 'Report a security vulnerability to {program}',
  'report.steps.basic.title': 'Basic Info',
  'report.steps.basic.desc': 'Vulnerability details',
  'report.steps.tech.title': 'Technical Details',
  'report.steps.tech.desc': 'Steps & proof',
  'report.steps.impact.title': 'Impact & Review',
  'report.steps.impact.desc': 'Final review',
  'report.fields.title': 'Vulnerability Title',
  'report.fields.title.placeholder': 'e.g., SQL Injection in Login API',
  'report.fields.asset': 'Affected Asset / Target',
  'report.fields.asset.placeholder': 'Select an asset',
  'report.fields.severity': 'Severity',
  'report.fields.weakness': 'Weakness Type / Category',
  'report.fields.weakness.placeholder': 'Select weakness type',
  'report.fields.summary': 'Summary',
  'report.fields.summary.placeholder':
    'Provide a brief summary of the vulnerability...',
  'report.fields.steps': 'Steps to Reproduce',
  'report.fields.steps.placeholder':
    '1. Navigate to...\n2. Enter the following payload...\n3. Observe that...',
  'report.fields.poc': 'Proof of Concept',
  'report.fields.poc.placeholder':
    'Include code snippets, payloads, or technical details...',
  'report.fields.attachments': 'Attachments',
  'report.fields.attachments.dropzone': 'Drop files here or click to upload',
  'report.fields.attachments.types': 'PNG, JPG, MP4, PDF up to 10MB',
  'report.fields.attachments.demo': '(Demo: Upload simulated)',
  'report.fields.impact': 'Security Impact',
  'report.fields.impact.placeholder':
    'Describe the potential security impact and affected users/data...',
  'report.fields.remediation': 'Suggested Remediation',
  'report.fields.remediation.placeholder':
    'Suggest how this vulnerability could be fixed...',
  'report.fields.cvss': 'CVSS Score',
  'report.fields.cvss.placeholder': 'e.g., 8.5',
  'report.severity.critical.label': 'Critical',
  'report.severity.critical.desc': 'Complete system compromise, data breach',
  'report.severity.high.label': 'High',
  'report.severity.high.desc': 'Significant security impact',
  'report.severity.medium.label': 'Medium',
  'report.severity.medium.desc': 'Moderate security concern',
  'report.severity.low.label': 'Low',
  'report.severity.low.desc': 'Minor security issue',
  'report.severity.informational.label': 'Informational',
  'report.severity.informational.desc': 'Security observation',
  'report.summary.title': 'Report Summary',
  'report.summary.titleField': 'Title',
  'report.summary.assetField': 'Asset',
  'report.summary.severityField': 'Severity',
  'report.summary.weaknessField': 'Weakness',
  'report.agree.label': 'I confirm this report follows the program rules',
  'report.agree.body':
    'I have tested responsibly, followed the scope guidelines, and have not accessed unauthorized data.',
  'report.demo.notice':
    'This is a demo platform — at launch, real submissions will require SİMA-verified Azerbaijani identity. Your report will be saved to the demo database for the receiving organization to review.',
  'report.actions.submit': 'Submit Report',
  'report.actions.submitting': 'Submitting...',
  'report.success.title': 'Report Submitted!',
  'report.success.body':
    'Your report has been saved to the demo database. The receiving organization can now review it from their dashboard.',
  'report.success.idLabel': 'Report ID',
  'report.signin.required.title': 'Sign in to submit a report',
  'report.signin.required.body':
    'You need to be signed in as a researcher to file a vulnerability report against this program.',
  'report.signin.required.cta': 'Sign in',
  'report.signin.wrongRole.title': 'Researcher account required',
  'report.signin.wrongRole.body':
    'Only researcher accounts can submit reports. Sign in with a researcher account to continue.',
  'report.signin.wrongRole.cta': 'Switch account',
  'report.error.title': 'Could not submit your report',
  'report.error.body':
    'Something went wrong while saving your report. Please try again.',
  'report.error.notResearcher':
    'Only researcher accounts can submit reports.',

  // ─── Login page
  'login.badge.demo': 'Demo authentication',
  'login.title': 'Log in to HackTheBug',
  'login.subtitle':
    'Use one of the demo accounts below to explore the researcher or organization side of the platform. Real SİMA-backed sign-in arrives at launch.',
  'login.email.label': 'Email',
  'login.email.placeholder': 'you@hackthebug.demo',
  'login.password.label': 'Password',
  'login.password.placeholder': '••••••••',
  'login.submit': 'Log in',
  'login.submitting': 'Signing in...',
  'login.error.missingFields':
    'Please enter both email and password.',
  'login.error.invalidEmail': 'Please enter a valid email address.',
  'login.error.invalidCredentials':
    'Wrong email or password. Try one of the demo accounts on the right.',
  'login.demoNote':
    'Demo / mock authentication only — credentials are stored locally in your browser. Real backend auth, password hashing, and SİMA verification land later.',
  'login.alreadySignedIn': 'You are already signed in as {role}.',
  'login.goToDashboard': 'Go to dashboard',
  'login.demo.title': 'Demo credentials',
  'login.demo.subtitle': 'Pick a role — we will fill the form for you.',
  'login.demo.researcher.tagline': 'Submit reports, track reputation.',
  'login.demo.organization.tagline': 'Manage programs, triage reports.',
  'login.demo.emailLabel': 'Email',
  'login.demo.passwordLabel': 'Password',
  'login.demo.useThese': 'Use these',

  // ─── Access denied / role gate
  'roleGate.checking': 'Checking your session...',
  'roleGate.stillChecking':
    'Still working on it — your network or Supabase project may be slow to respond.',
  'roleGate.tryAgain': 'Reload',
  'roleGate.denied.title': 'Access denied',
  'roleGate.denied.body':
    'This dashboard is for {requiredRole} accounts only. You are signed in as {currentRole}.',
  'roleGate.denied.goToMine': 'Go to dashboard',
  'roleGate.denied.logout': 'Log out',
  'roleGate.redirecting': 'Redirecting to log in...',

  // ─── Register page
  'register.badge': 'Demo signup',
  'register.title': 'Create your account',
  'register.subtitle':
    'Pick a side. Researcher accounts can browse programs and file reports; organization accounts can publish programs and triage incoming reports.',
  'register.tab.researcher': 'Researcher',
  'register.tab.organization': 'Organization',
  'register.field.email': 'Email',
  'register.field.password': 'Password',
  'register.field.password.help':
    'Minimum 6 characters (Supabase requirement).',
  'register.field.displayName': 'Display name',
  'register.field.displayName.help':
    'Shown in the navigation, dashboards, and the leaderboard.',
  'register.field.handle': 'Handle (optional)',
  'register.field.handle.help':
    'Public researcher handle — letters and numbers only, no spaces.',
  'register.field.yourName': 'Your name',
  'register.field.yourName.help':
    'Shown in the org user pill — e.g., "AZAL Security Team".',
  'register.field.orgName': 'Organization name',
  'register.field.orgName.help':
    'The legal / public name of your organization.',
  'register.field.orgSlug': 'Slug',
  'register.field.orgSlug.help':
    'URL fragment for your organization. Auto-generated from the name; edit if needed. Letters / numbers / hyphens only.',
  'register.field.orgIndustry': 'Industry',
  'register.field.orgIndustry.placeholder': 'Pick an industry',
  'register.submit': 'Create account',
  'register.submitting': 'Creating account...',
  'register.haveAccount': 'Already have an account?',
  'register.logIn': 'Log in',
  'register.error.missingFields':
    'Please fill in every required field.',
  'register.error.invalidEmail': 'Please enter a valid email address.',
  'register.error.weakPassword':
    'Password must be at least 6 characters.',
  'register.error.invalidSlug':
    'Slug can only contain letters, numbers, and hyphens.',
  'register.error.emailTaken':
    'An account with this email already exists. Try logging in instead.',
  'register.error.slugTaken':
    'That organization slug is already taken — pick another.',
  'register.error.unknown':
    'Sign-up failed. Check your network connection and try again.',
  'register.notice.confirmEmail':
    'We sent a confirmation link to {email}. Click it, then log in.',
  'register.notice.demoOnly':
    'Demo signup. Real registration would require SİMA-verified Azerbaijani identity.',

  // ─── Org dashboard: my programs widget
  'dashboard.org.myPrograms.title': 'My programs',
  'dashboard.org.myPrograms.subtitle':
    'Programs your organization has published.',
  'dashboard.org.myPrograms.empty':
    'You have not published any programs yet.',
  'dashboard.org.myPrograms.create': 'Create program',
  'dashboard.org.myPrograms.viewAll': 'View all',

  // ─── Create program page
  'createProgram.back': 'Back to dashboard',
  'createProgram.badge': 'Org tooling',
  'createProgram.title': 'Publish a new program',
  'createProgram.subtitle':
    'Define scope, rules, and demo reward tiers. Real testing requires explicit official authorization — every program card carries that notice on the public page.',
  'createProgram.section.basics': 'Basics',
  'createProgram.section.scope': 'In-scope assets',
  'createProgram.section.rewards': 'Reward tier',
  'createProgram.section.publish': 'Publish',
  'createProgram.field.name': 'Program name',
  'createProgram.field.name.placeholder': 'e.g., AZAL Mobile App Disclosure',
  'createProgram.field.slug': 'Slug',
  'createProgram.field.slug.help':
    'URL fragment under /programs/. Auto-generated; edit if you want.',
  'createProgram.field.description': 'Short description',
  'createProgram.field.description.placeholder':
    'One-sentence summary shown on the program card.',
  'createProgram.field.longDescription': 'Long description (optional)',
  'createProgram.field.longDescription.placeholder':
    'Context, motivation, and any extra detail for the program detail page.',
  'createProgram.field.type': 'Program type',
  'createProgram.field.type.bug-bounty': 'Bug Bounty',
  'createProgram.field.type.vdp': 'Vulnerability Disclosure (VDP)',
  'createProgram.field.type.private-preview': 'Private Preview',
  'createProgram.field.status': 'Status',
  'createProgram.field.status.active': 'Active',
  'createProgram.field.status.upcoming': 'Upcoming',
  'createProgram.field.featured': 'Feature on the home page',
  'createProgram.scope.target': 'Target',
  'createProgram.scope.targetPlaceholder':
    'e.g., Customer Portal, Public API, Mobile Application',
  'createProgram.scope.type': 'Type',
  'createProgram.scope.add': 'Add scope item',
  'createProgram.scope.empty':
    'Add at least one in-scope item before publishing.',
  'createProgram.tier.label': 'Demo reward tier',
  'createProgram.tier.help':
    'Each tier seeds a 5-row severity table (informational → critical) with realistic AZN ranges. All values are demo / planned.',
  'createProgram.tier.low.title': 'Low',
  'createProgram.tier.low.body': 'Smaller surface — up to 3,500 AZN.',
  'createProgram.tier.standard.title': 'Standard',
  'createProgram.tier.standard.body':
    'Average commercial / public service — up to 5,000 AZN.',
  'createProgram.tier.high.title': 'High',
  'createProgram.tier.high.body':
    'High-impact infrastructure — up to 7,000 AZN.',
  'createProgram.tier.top.title': 'Top',
  'createProgram.tier.top.body':
    'Highest impact / most sensitive — up to 9,000 AZN.',
  'createProgram.submit': 'Publish program',
  'createProgram.submitting': 'Publishing...',
  'createProgram.cancel': 'Cancel',
  'createProgram.error.missingFields':
    'Fill in name, description, and at least one scope item.',
  'createProgram.error.invalidSlug':
    'Slug can only contain letters, numbers, and hyphens.',
  'createProgram.error.slugTaken':
    'A program with this slug already exists. Pick another.',
  'createProgram.error.unknown':
    'Could not publish the program. See the browser console for details.',
}

// ─── Azerbaijani translation ───────────────────────────────────────────────
const az: Dict = {
  'common.viewAll': 'Hamısına bax',
  'common.browseAll': 'Hamısına bax',
  'common.next': 'Növbəti',
  'common.previous': 'Əvvəlki',
  'common.cancel': 'Ləğv et',
  'common.submit': 'Göndər',
  'common.close': 'Bağla',
  'common.optional': 'İstəyə bağlı',
  'common.required': 'Tələb olunur',
  'common.demoData': 'Demo məlumatlar',
  'common.demoMode': 'Demo rejimi',
  'common.hackathonDemo': 'Hakaton demo',
  'common.comingSoon': 'Tezliklə',
  'common.demoBanner': 'Nümayiş üçün demo məlumatlar',
  'common.fictionalDataNote':
    'Şərti proqramlar və nümunə məlumatlar',

  'disclaimer.azCitizensOnly': 'Yalnız Azərbaycan vətəndaşları üçün',
  'disclaimer.azCitizensLong':
    'HackTheBug yalnız Azərbaycan Respublikasının vətəndaşları üçün nəzərdə tutulub. Buraxılış zamanı şəxsiyyət doğrulaması tələb olunacaq.',
  'disclaimer.simaShort': 'SİMA doğrulaması — tezliklə',
  'disclaimer.simaLong':
    'SİMA vasitəsilə şəxsiyyət doğrulaması planlaşdırılır. Cari versiya real doğrulama aparmır — gördüyünüz hər şey demodur.',
  'disclaimer.notLiveYet':
    'Bu hakaton prototipidir. Real qeydiyyat, doğrulama və ödəmələr hələ aktiv deyil.',
  'disclaimer.azCitizensBanner':
    'Yalnız Azərbaycan vətəndaşları üçün · SİMA doğrulaması planlaşdırılır · Bu versiya demodur',

  'nav.home': 'Ana səhifə',
  'nav.programs': 'Proqramlar',
  'nav.leaderboard': 'Reytinq',
  'nav.about': 'Haqqımızda',
  'nav.dashboard': 'Panel',
  'nav.dashboard.researcher': 'Tədqiqatçı görünüşü',
  'nav.dashboard.organization': 'Təşkilat görünüşü',
  'nav.cta.launchDemo': 'Demonu başlat',
  'nav.cta.login': 'Daxil ol',
  'nav.cta.register': 'Qeydiyyatdan keç',
  'nav.cta.logout': 'Çıxış et',
  'nav.user.myDashboard': 'İdarə paneli',
  'nav.user.signedInAs': 'Daxil olub:',
  'nav.lang.label': 'Dil',

  // ─── Parametrlər menyusu (nav-dakı dişli ikona)
  'settings.label': 'Parametrlər',
  'settings.language': 'Dil',
  'settings.theme': 'Mövzu',
  'settings.theme.light': 'Açıq',
  'settings.theme.dark': 'Tünd',
  'settings.theme.system': 'Sistem',
  'settings.accent': 'Vurğu rəngi',
  'settings.accent.hint':
    'Əsas düymələrə, fokus halqalarına və neon vurğulara təsir edir.',
  'settings.accent.cyan': 'Firuzəyi',
  'settings.accent.purple': 'Bənövşəyi',
  'settings.accent.blue': 'Mavi',
  'settings.accent.red': 'Qırmızı',
  'settings.accent.emerald': 'Zümrüd',
  'settings.accent.amber': 'Kəhrəba',
  'nav.lang.short': 'Dil',
  'role.researcher': 'Tədqiqatçı',
  'role.organization': 'Təşkilat',

  'footer.platform': 'Platforma',
  'footer.resources': 'Resurslar',
  'footer.legal': 'Hüquqi',
  'footer.about': 'Haqqımızda',
  'footer.faq': 'Tez-tez verilən suallar',
  'footer.howItWorks': 'Necə işləyir',
  'footer.privacy': 'Məxfilik siyasəti',
  'footer.terms': 'İstifadə şərtləri',
  'footer.safeHarbor': 'Təhlükəsiz liman',
  'footer.tagline':
    'Azərbaycanın rəqəmsal platformaları üçün məsuliyyətli təhlükəsizlik testləri. Azərbaycan təşkilatlarını doğrulanmış etik hakerlərlə birləşdirir.',
  'footer.copyright':
    '© 2026 HackTheBug. Bütün hüquqlar qorunur.',
  'footer.dashboardResearcher': 'Tədqiqatçı paneli',
  'footer.dashboardOrganization': 'Təşkilat paneli',

  'severity.critical': 'Kritik',
  'severity.high': 'Yüksək',
  'severity.medium': 'Orta',
  'severity.low': 'Aşağı',
  'severity.informational': 'Məlumat',

  'status.draft': 'Qaralama',
  'status.pending': 'Gözləyir',
  'status.triaged': 'Yoxlanıldı',
  'status.resolved': 'Həll edildi',
  'status.rewarded': 'Mükafatlandırıldı',
  'status.duplicate': 'Təkrar',
  'status.invalid': 'Yararsız',

  'programType.bug-bounty': 'Bug Bounty',
  'programType.bug-bounty.long': 'Bug Bounty proqramı',
  'programType.vdp': 'VDP',
  'programType.vdp.long': 'Zəiflik açıqlama proqramı',
  'programType.private-preview': 'Qapalı önbaxış',
  'programStatus.active': 'Aktiv',
  'programStatus.upcoming': 'Yaxınlaşır',
  'programStatus.paused': 'Dayandırılıb',
  'programStatus.closed': 'Bağlı',

  'programCard.featured': 'Seçilmiş',
  'programCard.rewards': 'Demo mükafat',
  'programCard.assets': 'Aktivlər',
  'programCard.updated': 'Yeniləndi',
  'programCard.viewProgram': 'Proqrama bax',

  'home.hero.badge':
    'Azərbaycanın ilk Bug Bounty platforması',
  'home.hero.azBadge': 'Yalnız Azərbaycan vətəndaşları üçün',
  'home.hero.title.line1': 'Zəiflikləri tap.',
  'home.hero.title.line2': 'Tədqiqatçıları mükafatlandır.',
  'home.hero.title.line3': 'Etibarı gücləndir.',
  'home.hero.subtitle':
    'HackTheBug Azərbaycan təşkilatlarını məsuliyyətli təhlükəsizlik testi üçün doğrulanmış Azərbaycanlı etik hakerlərlə birləşdirir. Zəiflikləri hücumçulardan əvvəl tap.',
  'home.hero.cta.explore': 'Proqramları araşdır',
  'home.hero.cta.leaderboard': 'Reytinqə bax',
  'home.hero.simaNote':
    'SİMA vasitəsilə şəxsiyyət doğrulaması — tezliklə',
  'home.preview.dashboardTitle': 'Təhlükəsizlik paneli',
  'home.preview.dashboardSubtitle': 'Demo önbaxış',
  'home.preview.live': 'Canlı',
  'home.preview.openReports': 'Açıq hesabatlar',
  'home.preview.resolved': 'Həll edildi',
  'home.preview.critical': 'Kritik',
  'home.preview.rewards': 'Mükafat',
  'home.preview.prototype': 'Prototip',

  'home.stats.activePrograms': 'Aktiv proqramlar',
  'home.stats.verifiedResearchers': 'Doğrulanmış tədqiqatçılar',
  'home.stats.reportsSubmitted': 'Göndərilmiş hesabatlar',
  'home.stats.avgTriage': 'Orta yoxlama vaxtı',
  'home.stats.rewardsPaid': 'Ödənilmiş mükafat',
  'home.stats.organizations': 'Təşkilatlar',

  'home.how.badge': 'Proses',
  'home.how.title': 'Necə işləyir',
  'home.how.subtitle':
    'Doğrulanmış Azərbaycanlı tədqiqatçıların zəiflikləri tapması və məsuliyyətlə bildirməsi üçün dörd sadə addım.',
  'home.how.step1.title': 'Proqramları araşdır',
  'home.how.step1.desc':
    'Azərbaycan təşkilatlarının aktiv bug bounty və zəiflik açıqlama proqramlarına bax.',
  'home.how.step2.title': 'Məsuliyyətlə test et',
  'home.how.step2.desc':
    'Sahə qaydalarına əməl et və əhatə daxili aktivləri etik haker yanaşması ilə yoxla.',
  'home.how.step3.title': 'Hesabat göndər',
  'home.how.step3.desc':
    'Tapıntılarını addımlar və təsir təsviri ilə birlikdə ətraflı hesabat şəklində sənədləşdir.',
  'home.how.step4.title': 'Tanınma qazan',
  'home.how.step4.desc':
    'Etibarlı tapıntılara görə mükafatlandırıl, reputasiyanı qur və reytinqdə yüksəl.',

  'home.features.badge': 'Xüsusiyyətlər',
  'home.features.title': 'Platforma xüsusiyyətləri',
  'home.features.subtitle':
    'Azərbaycanlı təşkilatın strukturlaşdırılmış bug bounty və ya zəiflik açıqlama proqramı aparması üçün lazım olan hər şey.',
  'home.features.scope.title': 'Sahə və qaydalar',
  'home.features.scope.desc':
    'Hər proqram üçün dəqiq əhatə daxili və əhatə xarici tərif.',
  'home.features.reporting.title': 'Strukturlaşdırılmış hesabat',
  'home.features.reporting.desc':
    'Ətraflı və faydalı zəiflik hesabatları üçün addım-addım göndərmə prosesi.',
  'home.features.rewards.title': 'Ciddiyyətə görə mükafat',
  'home.features.rewards.desc':
    'Zəifliyin ciddiyyəti və təsirinə əsaslanan şəffaf mükafat səviyyələri.',
  'home.features.leaderboard.title': 'Tədqiqatçı reytinqi',
  'home.features.leaderboard.desc':
    'Həmkarlarla yarış və bacarıqlarını ictimai reytinqdə nümayiş etdir.',
  'home.features.tracking.title': 'Hesabat izlənilməsi',
  'home.features.tracking.desc':
    'Göndərmədən həll olunmaya qədər real vaxt status yenilənmələri.',
  'home.features.identity.title': 'Şəxsiyyət doğrulaması',
  'home.features.identity.desc':
    'Azərbaycan vətəndaşları üçün SİMA əsaslı doğrulama — buraxılış mərhələsi üçün planlaşdırılır.',

  'home.value.badge': 'Niyə HackTheBug?',
  'home.value.title': 'Azərbaycan üçün qurulmuş etibarlı platforma',
  'home.value.body':
    'Azərbaycanın rəqəmsal transformasiyasının məsuliyyətli açıqlama üçün lokal və etibarlı evə ehtiyacı var. HackTheBug məhz Azərbaycan təşkilatları və Azərbaycan vətəndaşları üçün qurulub — kontekst, dil və şəxsiyyət doğrulaması ölkəyə uyğun gəlir.',
  'home.value.bullet1':
    'Lokal kontekst, qlobal təhlükəsizlik standartları',
  'home.value.bullet2': 'Şəffaf mükafat səviyyələri və SLA-lar',
  'home.value.bullet3': 'SİMA şəxsiyyət doğrulaması — planlaşdırılır',
  'home.value.bullet4': 'Etik tədqiqatçılar üçün təhlükəsiz liman',
  'home.value.forOrgs.title': 'Təşkilatlar üçün',
  'home.value.forOrgs.desc':
    'Zəiflikləri zərərli aktorlardan əvvəl proaktiv şəkildə tap.',
  'home.value.forResearchers.title': 'Tədqiqatçılar üçün',
  'home.value.forResearchers.desc':
    'Təhlükəsizlik bacarıqlarına görə tanınma və mükafat qazan — yalnız doğrulanmış Azərbaycan vətəndaşları üçün açıqdır.',
  'home.value.forEveryone.title': 'Azərbaycan üçün',
  'home.value.forEveryone.desc':
    'Daha təhlükəsiz milli rəqəmsal ekosistem hər vətəndaşa və hər təşkilata fayda verir.',

  'home.featured.badge': 'Proqramlar',
  'home.featured.title': 'Seçilmiş proqramlar',
  'home.featured.subtitle': 'Azərbaycanlı təşkilatların aktiv proqramları.',
  'home.featured.viewAll': 'Bütün proqramlara bax',

  'home.roadmap.badge': 'Yol xəritəsi',
  'home.roadmap.title': 'İnkişaf yol xəritəsi',
  'home.roadmap.subtitle':
    'Hakaton demosundan doğrulama dəstəkli platformaya gedən yolumuz.',
  'home.roadmap.frontendDemo': 'Frontend demo',
  'home.roadmap.identity': 'SİMA şəxsiyyət doğrulaması',
  'home.roadmap.orgDashboard': 'Təşkilat paneli',
  'home.roadmap.backend': 'Backend və API',
  'home.roadmap.launch': 'Tam buraxılış',
  'home.roadmap.current': 'Cari',

  'home.cta.badge': 'Hakaton demo',
  'home.cta.title': 'Araşdırmağa hazırsan?',
  'home.cta.body':
    'Bu, Azərbaycan üçün HackTheBug vizyonunu nümayiş etdirən hakaton prototipidir. Həm tədqiqatçılar, həm də təşkilatlar üçün platformanın necə işləyəcəyini görmək üçün demonu nəzərdən keçir.',
  'home.cta.browse': 'Proqramlara bax',
  'home.cta.tryDashboard': 'Tədqiqatçı panelini yoxla',
  'home.cta.goToDashboard': 'Mənim panelimə keç',

  'programs.badge': 'Proqramlar kataloqu',
  'programs.title': 'Bug Bounty proqramları',
  'programs.subtitle':
    'Azərbaycan üzrə təşkilatların aktiv proqramları. Növbəti hədəfini tap və axtarışa başla.',
  'programs.search.placeholder':
    'Proqramları, təşkilatları və ya teqləri axtar...',
  'programs.filter.industry': 'Sahə',
  'programs.filter.allIndustries': 'Bütün sahələr',
  'programs.filter.type': 'Növ',
  'programs.filter.allTypes': 'Bütün növlər',
  'programs.filter.status': 'Status',
  'programs.filter.allStatuses': 'Bütün statuslar',
  'programs.filter.sort': 'Sıralama',
  'programs.filter.mobileToggle': 'Filtrlər',
  'programs.sort.newest': 'Ən yenilər',
  'programs.sort.rewardsHigh': 'Ən yüksək mükafat',
  'programs.sort.rewardsLow': 'Ən aşağı mükafat',
  'programs.sort.assets': 'Ən çox aktiv',
  'programs.activeFilters': 'Aktiv filtrlər:',
  'programs.searchTag': 'Axtarış: {q}',
  'programs.clearAll': 'Hamısını sıfırla',
  'programs.results.one': '{count} proqram göstərilir',
  'programs.results.other': '{count} proqram göstərilir',
  'programs.empty.title': 'Heç bir proqram tapılmadı',
  'programs.empty.body':
    'Filtrləri və ya axtarışı dəyişməyə cəhd et.',
  'programs.empty.clear': 'Bütün filtrləri sıfırla',

  'program.back': 'Proqramlara qayıt',
  'program.tabs.overview': 'Ümumi baxış',
  'program.tabs.scope': 'Sahə',
  'program.tabs.rewards': 'Mükafatlar',
  'program.tabs.rules': 'Qaydalar',
  'program.tabs.updates': 'Yenilənmələr',
  'program.tabs.hallOfFame': 'Şərəf lövhəsi',
  'program.actions.submit': 'Hesabat göndər',
  'program.actions.submit.orgLabel':
    'Hesabat göndərmək tədqiqatçılar üçündür',
  'program.actions.submit.orgDisabled':
    'Təşkilat hesabları hesabatları nəzərdən keçirə bilər, amma göndərə bilməz.',
  'program.actions.bookmark.label': 'Proqramı saxla',
  'program.actions.bookmark.added': 'Əlfəcinlərinə əlavə edildi',
  'program.actions.bookmark.removed': 'Əlfəcinlərindən çıxarıldı',
  'program.actions.bookmark.signinTitle':
    'Proqramları saxlamaq üçün daxil ol',
  'program.actions.bookmark.signinBody':
    'Əlfəcinlər tədqiqatçı profilinlə bağlıdır — saxlamaq üçün daxil ol.',
  'program.actions.bookmark.researcherOnlyTitle': 'Yalnız tədqiqatçılar',
  'program.actions.bookmark.researcherOnlyBody':
    'Proqramların saxlanılması tədqiqatçı iş axınının bir hissəsidir.',
  'program.actions.share.label': 'Proqramı paylaş',
  'program.actions.share.copied':
    'Keçid mübadilə yaddaşına köçürüldü',
  'program.actions.share.failed':
    'Keçid köçürülə bilmədi. URL-i əl ilə seçməyə cəhd et.',
  'program.summary': 'Proqram xülasəsi',
  'program.responseTimes': 'Cavab vaxtları',
  'program.responseTimes.first': 'İlk cavab',
  'program.responseTimes.triage': 'Yoxlama',
  'program.responseTimes.resolution': 'Həll',
  'program.quickStats': 'Qısa statistika',
  'program.quickStats.inScope': 'Əhatə daxili aktivlər',
  'program.quickStats.researchers': 'Tədqiqatçılar',
  'program.quickStats.maxReward': 'Maks. demo mükafat',
  'program.safeHarbor.title': 'Təhlükəsiz liman',
  'program.safeHarbor.body':
    'Bu proqram qaydalara əməl edən və məsuliyyətlə test aparan Azərbaycanlı tədqiqatçılar üçün təhlükəsiz liman təmin edir.',
  'program.scope.in': 'Əhatə daxilində',
  'program.scope.out': 'Əhatə xaricində',
  'program.rewards.severity': 'Ciddiyyət',
  'program.rewards.range': 'Mükafat aralığı (AZN)',
  'program.rewards.sla': 'Cavab SLA',
  'program.rewards.demoNote':
    'Demo / planlaşdırılan mükafat aralığı — dəyərlər rəsmi icazəli proqramın ödəyə biləcəyi məbləği nümayiş etdirir. Real bounty öhdəliyi deyil.',
  'program.authNotice.title': 'Rəsmi icazə gözləyir',
  'program.authNotice.body':
    'Bu, {org} təmsil edən hakaton demo proqram kartıdır. Bu versiyada {org} heç bir sisteminin real testi icazəli deyil. Real test üçün təşkilatın yazılı rəsmi icazəsi tələb olunur.',
  'program.rules.title': 'Proqram qaydaları',
  'program.rules.harbor.title': 'Təhlükəsiz liman bəyanatı',
  'program.rules.harbor.body':
    'Bu proqram qaydalarına əməl edərək zəiflikləri məsuliyyətlə tapıb bildirən tədqiqatçılara qarşı hüquqi tədbir görməyəcəyik. Bu siyasət çərçivəsində aparılan təhlükəsizlik tədqiqatını icazəli, qanuni və faydalı sayırıq.',
  'program.updates.title': 'Proqram yenilənmələri',
  'program.updates.type.scope': 'Sahə',
  'program.updates.type.reward': 'Mükafat',
  'program.updates.type.policy': 'Siyasət',
  'program.updates.type.general': 'Ümumi',
  'program.hof.title': 'Şərəf lövhəsi',
  'program.hof.empty':
    'Hələ tədqiqatçı yoxdur. Zəifliyi tapan ilk doğrulanmış Azərbaycanlı tədqiqatçı ol!',
  'program.hof.reportsAccepted': '{count} hesabat qəbul edildi',
  'program.hof.points': 'xal',
  'program.related.title': 'Oxşar proqramlar',

  'leaderboard.title': 'Reytinq',
  'leaderboard.subtitle':
    'Doğrulanmış Azərbaycanlı təhlükəsizlik tədqiqatçılarımızı təbrik edirik. Yarış, tanınma qazan və reytinqdə yüksəl.',
  'leaderboard.filter.timeframe': 'Vaxt aralığı seç',
  'leaderboard.filter.category': 'Kateqoriya seç',
  'leaderboard.timeframe.allTime': 'Bütün dövr',
  'leaderboard.timeframe.thisYear': 'Bu il',
  'leaderboard.timeframe.thisMonth': 'Bu ay',
  'leaderboard.timeframe.thisWeek': 'Bu həftə',
  'leaderboard.category.overall': 'Ümumi',
  'leaderboard.category.web': 'Veb təhlükəsizliyi',
  'leaderboard.category.mobile': 'Mobil təhlükəsizlik',
  'leaderboard.category.api': 'API təhlükəsizliyi',
  'leaderboard.category.crypto': 'Kriptoqrafiya',
  'leaderboard.podium.points': 'Xallar',
  'leaderboard.podium.reports': 'Hesabatlar',
  'leaderboard.podium.topResearcher': 'Aparıcı tədqiqatçı',
  'leaderboard.tabs.rankings': 'Tam reytinq',
  'leaderboard.tabs.stats': 'Statistika',
  'leaderboard.table.rank': 'Yer',
  'leaderboard.table.researcher': 'Tədqiqatçı',
  'leaderboard.table.country': 'Ölkə',
  'leaderboard.table.points': 'Xallar',
  'leaderboard.table.reports': 'Hesabatlar',
  'leaderboard.table.rewards': 'Mükafatlar',
  'leaderboard.stats.totalReports': 'Cəmi qəbul edilmiş hesabatlar',
  'leaderboard.stats.totalRewards': 'Cəmi ödənilmiş mükafat',
  'leaderboard.stats.activeResearchers': 'Aktiv tədqiqatçılar',
  'leaderboard.stats.avgReports': 'Tədqiqatçı başına orta hesabat',
  'leaderboard.cta.title': 'Aparıcı sıralara qoşulmağa hazırsan?',
  'leaderboard.cta.body':
    'SİMA doğrulaması işə düşəndən sonra doğrulanmış Azərbaycanlı tədqiqatçılar reytinqə qoşula biləcək. Hələlik proqramlara baxa və platformanı araşdıra bilərsən.',
  'leaderboard.cta.browse': 'Proqramlara bax',

  'about.badge.prototype': 'Hakaton prototipi',
  'about.hero.title.lead':
    'Etibarlı bug bounty platforması —',
  'about.hero.title.highlight': 'Azərbaycan vətəndaşları üçün',
  'about.hero.subtitle':
    'HackTheBug yalnız Azərbaycan Respublikası üçün qurulub. Azərbaycan təşkilatlarını — bankları, telekomları, dövlət portallarını, fintexi — doğrulanmış Azərbaycanlı təhlükəsizlik tədqiqatçıları ilə vahid regional platformada birləşdirir.',
  'about.hero.cta.explore': 'Proqramları araşdır',
  'about.hero.cta.dashboard': 'Tədqiqatçı paneli',
  'about.stats.label.activePrograms': 'Aktiv proqramlar',
  'about.stats.label.verifiedResearchers': 'Doğrulanmış tədqiqatçılar',
  'about.stats.label.reportsSubmitted': 'Göndərilmiş hesabatlar',
  'about.stats.label.partnerOrgs': 'Tərəfdaş təşkilatlar',
  'about.mission.badge': 'Missiya',
  'about.mission.title': 'Bizim missiyamız',
  'about.mission.subtitle':
    'Məsuliyyətli açıqlamanı Azərbaycanın rəqəmsal infrastrukturu üçün standart hala gətirmək — və bu işi görən insanları mükafatlandırmaq.',
  'about.mission.b1.title':
    'Tədqiqatçıları və təşkilatları bir araya gətir',
  'about.mission.b1.body':
    'Bu gün regional təhlükəsizlik tapıntıları kortəbii baş verir — e-poçtla, birbaşa mesajla və ya heç olmur. HackTheBug onları əlaqələndirmək üçün strukturlaşdırılmış məkandır.',
  'about.mission.b2.title':
    'SİMA vasitəsilə tədqiqatçı şəxsiyyətini doğrula',
  'about.mission.b2.body':
    'Təhlükəsizlik açıqlamasında etibar vacibdir. İnteqrasiya işə düşdükdən sonra doğrulanmış Azərbaycanlı tədqiqatçılar qapalı proqramlara və yüksək etibarlı iş axınlarına çıxış əldə edəcək. Bu versiyada doğrulama aktiv deyil.',
  'about.mission.b3.title': 'Ədalətli mükafat, açıq tanınma',
  'about.mission.b3.body':
    'Hər ciddiyyət səviyyəsi üçün şəffaf mükafat və açıq şərəf lövhəsi — tədqiqatçılar daşına bilən milli reputasiya qurur.',
  'about.mission.forOrgs.title': 'Təşkilatlar üçün',
  'about.mission.forOrgs.body':
    'Proqram yarat, sahə və mükafatları təyin et, gələn hesabatları aydın SLA-larla idarə et.',
  'about.mission.forResearchers.title': 'Tədqiqatçılar üçün',
  'about.mission.forResearchers.body':
    'Proqramları tap, təhlükəsiz liman şərtləri ilə məsuliyyətlə test apar, açıq reputasiya qur. Doğrulanmış Azərbaycan vətəndaşlarına açıqdır.',
  'about.mission.regional.title': 'Azərbaycan üçün qurulub',
  'about.mission.regional.body':
    'Azərbaycan kontekstinə uyğun — dil, SİMA şəxsiyyət doğrulaması və bankçılıq, telekom, dövlət, bulud üzrə tərəfdaş təşkilatlar.',
  'about.values.badge': 'Dəyərlər',
  'about.values.title': 'Bizim dəyərlərimiz',
  'about.values.subtitle':
    'Hər məhsul qərarımıza yön verən prinsiplər.',
  'about.values.security.title': 'Təhlükəsizlik birinci',
  'about.values.security.body':
    'Zəiflikləri zərərli aktorlardan əvvəl tapmaq daha təhlükəsiz milli rəqəmsal ekosistemin əsasıdır.',
  'about.values.ethics.title': 'Etik hakerlik',
  'about.values.ethics.body':
    'Platformadakı hər tədqiqatçı üçün məsuliyyətli açıqlama və ciddi davranış kodeksi.',
  'about.values.community.title': 'İcma əsaslı',
  'about.values.community.body':
    'Lokal konteksti və uyğunluq tələblərini başa düşən Azərbaycanlı təhlükəsizlik tədqiqatçıları icması ilə birgə böyümək üçün qurulub.',
  'about.values.recognition.title': 'Ədalətli tanınma',
  'about.values.recognition.body':
    'Şəffaf mükafat səviyyələri və açıq şərəf lövhəsi — opsional deyil, zəruridir.',
  'about.roadmap.badge': 'Yol xəritəsi',
  'about.roadmap.title': 'Yol xəritəsi',
  'about.roadmap.subtitle':
    'Hakaton prototipindən doğrulama dəstəkli platformaya.',
  'about.roadmap.q4_2025.title': 'Konsepsiya',
  'about.roadmap.q4_2025.body':
    'Boşluq müəyyən edildi: Azərbaycan rəqəmsal məhsulları və təşkilatlarının məsuliyyətli açıqlama üçün lokal və etibarlı evi yox idi.',
  'about.roadmap.q1_2026.title': 'Dizayn və prototip',
  'about.roadmap.q1_2026.body':
    'Dizayn sistemi, demo məlumat dəsti və əsas axınlar quruldu — ana səhifə, proqram kataloqu, proqram detalı, panellər və hesabat göndərmə.',
  'about.roadmap.q2_2026.title': 'AZCON Hakatonu',
  'about.roadmap.q2_2026.body':
    'Frontend demo AZCON Hakatonunda təqdim edildi. Hazırda buradayıq.',
  'about.roadmap.q3_2026.title':
    'SİMA doğrulaması və qapalı beta',
  'about.roadmap.q3_2026.body':
    'Tədqiqatçılar və təşkilatlar üçün SİMA doğrulamasını işə sal. Qapalı sınaq üçün bir neçə tərəfdaşı qoş.',
  'about.roadmap.q4_2026.title': 'Backend, API və ictimai buraxılış',
  'about.roadmap.q4_2026.body':
    'Real verilənlər bazası, API, bildirişlər və yoxlama iş axınları. Platformanı doğrulanmış Azərbaycanlı tədqiqatçılara aç.',
  'about.team.badge': 'Komanda Holberton',
  'about.team.title': 'AZCON Hakatonu üçün quruldu',
  'about.team.subtitle':
    'Təhlükəsizlik platformasının ilk gündən ehtiyac duyduğu dörd sahəni əhatə edən fokuslu komanda.',
  'about.team.eng.title': 'Mühəndislik',
  'about.team.eng.body':
    'Frontend, dizayn sistemi və real backend yolu.',
  'about.team.des.title': 'Dizayn',
  'about.team.des.body':
    'Premium qaranlıq kibertəhlükəsizlik SaaS vizual dili və UX axınları.',
  'about.team.sec.title': 'Təhlükəsizlik tədqiqatı',
  'about.team.sec.body':
    'Sahə üzrə təcrübə — sahə dizaynı, ciddiyyət səviyyələri və açıqlama iş axınları.',
  'about.team.prd.title': 'Məhsul',
  'about.team.prd.body':
    'Prototipdən buraxılışa yol xəritəsi — SİMA, təşkilatlar, tədqiqatçılar.',
  'about.cta.title': 'Necə işləyəcəyini görmək istəyirsən?',
  'about.cta.body':
    'Demo platformanın hər iki tərəfini gəzdirir — tədqiqatçılar proqramlara baxır, təşkilatlar hesabatları yoxlayır. Real backend, real auth və SİMA doğrulaması sonrakı mərhələlərdə işə düşür.',
  'about.cta.browse': 'Proqramlara bax',
  'about.cta.orgDashboard': 'Təşkilat paneli',

  'dashboard.researcher.viewBadge': 'Tədqiqatçı paneli',
  'dashboard.demoBadge': 'Demo görünüş',
  'dashboard.researcher.welcome': 'Xoş gəldin, {name}',
  'dashboard.researcher.subtitle':
    'Hesabatlarını, mükafatlarını və reputasiyanı izlə.',
  'dashboard.researcher.findPrograms': 'Proqram tap',
  'dashboard.researcher.stats.submitted': 'Göndərilmiş hesabatlar',
  'dashboard.researcher.stats.accepted': 'Qəbul edildi',
  'dashboard.researcher.stats.pending': 'Yoxlamada',
  'dashboard.researcher.stats.rewards': 'Cəmi mükafat',
  'dashboard.researcher.stats.reputation': 'Reputasiya',
  'dashboard.researcher.stats.rank': 'Milli reytinq',
  'dashboard.researcher.stats.error.title':
    'Panel statistikası yüklənə bilmədi',
  'dashboard.researcher.timeline.title': 'Zaman üzrə hesabatlar',
  'dashboard.researcher.timeline.subtitle':
    'Son 6 ayda göndərmə fəaliyyətin.',
  'dashboard.researcher.severity.title': 'Ciddiyyətə görə tapıntılar',
  'dashboard.researcher.severity.subtitle':
    'Qəbul edilmiş hesabatlarının paylanması.',
  'dashboard.researcher.recent.title': 'Son göndərmələr',
  'dashboard.researcher.recent.subtitle':
    'Sonuncu zəiflik hesabatların.',
  'dashboard.researcher.recent.col.report': 'Hesabat',
  'dashboard.researcher.recent.col.program': 'Proqram',
  'dashboard.researcher.recent.col.severity': 'Ciddiyyət',
  'dashboard.researcher.recent.col.status': 'Status',
  'dashboard.researcher.recent.col.reward': 'Mükafat',
  'dashboard.researcher.recent.empty':
    'Hələ hesabat yoxdur. İlk tapıntını proqram səhifəsindən göndər.',
  'dashboard.researcher.recent.toast.title':
    'Tam hesabat siyahısı — tezliklə',
  'dashboard.researcher.recent.toast.body':
    'Ayrıca hesabat cədvəli yol xəritəsindədir. Hələlik son hesabatlar yuxarıda göstərilir.',
  'dashboard.researcher.achievements.title': 'Nailiyyətlər',
  'dashboard.researcher.achievements.earned': 'Qazanıldı',
  'dashboard.researcher.achievements.first': 'İlk qan',
  'dashboard.researcher.achievements.critical': 'Kritik ovçu',
  'dashboard.researcher.achievements.top10': 'Top 10',
  'dashboard.researcher.verification.title': 'Şəxsiyyət doğrulaması',
  'dashboard.researcher.verification.body':
    'Azərbaycan vətəndaşları üçün SİMA doğrulaması — planlaşdırılır. Bu versiya demodur, real doğrulama aparmır.',
  'dashboard.researcher.saved.title': 'Saxlanılmış proqramlar',
  'dashboard.researcher.saved.empty':
    'Hələ saxlanmış proqram yoxdur. Proqram səhifəsindən birini əlfəcinləyə bilərsən.',
  'dashboard.researcher.saved.browse': 'Proqramlara bax',
  'dashboard.researcher.recommended.title': 'Sənin üçün tövsiyə',
  'dashboard.researcher.recommended.empty':
    'Tövsiyə üçün yeni heç nə yoxdur. Proqramlar kataloquna nəzər sal.',
  'dashboard.researcher.maxLabel': 'maks {amount} AZN',

  // ─── Dashboard charts (paylaşılan boş/xəta etiketləri)
  'dashboard.charts.empty':
    'Hələ məlumat yoxdur — hesabatlar daxil olduqca qrafik dolacaq.',
  'dashboard.charts.error.title': 'Qrafik məlumatları yüklənə bilmədi',

  'dashboard.org.viewBadge': 'Təşkilat paneli',
  'dashboard.org.title': 'Təhlükəsizlik paneli',
  'dashboard.org.subtitle':
    'Bug bounty proqramının fəaliyyətini və gələn hesabatları izlə.',
  'dashboard.org.viewProgram': 'Proqrama bax',
  'dashboard.org.stats.totalReports': 'Cəmi hesabatlar',
  'dashboard.org.stats.openReports': 'Açıq hesabatlar',
  'dashboard.org.stats.avgTriage': 'Orta yoxlama vaxtı',
  'dashboard.org.stats.critical': 'Kritik tapıntılar',
  'dashboard.org.stats.rewardsPaid': 'Ödənilmiş mükafat',
  'dashboard.org.stats.resolved': 'Bu ay həll olundu',
  'dashboard.org.stats.error.title':
    'Panel statistikası yüklənə bilmədi',
  'dashboard.org.trend.title':
    'Hesabat və həll trendi',
  'dashboard.org.trend.subtitle':
    'Vaxt üzrə gələn və həll olunmuş hesabatlar.',
  'dashboard.org.trend.legend.reports': 'Hesabatlar',
  'dashboard.org.trend.legend.resolved': 'Həll edildi',
  'dashboard.org.severity.title': 'Ciddiyyət paylanması',
  'dashboard.org.severity.subtitle':
    'Zəiflik ciddiyyətinə görə bölgü.',
  'dashboard.org.pipeline.title': 'Hesabat boru xətti',
  'dashboard.org.pipeline.subtitle':
    'Bütün hesabatların cari vəziyyəti.',
  'dashboard.org.pipeline.new': 'Yeni',
  'dashboard.org.pipeline.triaging': 'Yoxlanılır',
  'dashboard.org.pipeline.validating': 'Təsdiqlənir',
  'dashboard.org.pipeline.fixing': 'Düzəldilir',
  'dashboard.org.pipeline.resolved': 'Həll edildi',
  'dashboard.org.recent.title': 'Son hesabatlar',
  'dashboard.org.recent.subtitle':
    'Sonuncu gələn zəiflik hesabatları.',
  'dashboard.org.recent.col.report': 'Hesabat',
  'dashboard.org.recent.col.severity': 'Ciddiyyət',
  'dashboard.org.recent.col.status': 'Status',
  'dashboard.org.recent.col.submitted': 'Göndərilib',
  'dashboard.org.recent.empty':
    'Hələ hesabat yoxdur. Tədqiqatçılar göndərdikcə burada görünəcək.',
  'dashboard.org.assets.title': 'Ən çox hədəflənən aktivlər',
  'dashboard.org.assets.subtitle':
    'Sahəndəki ən çox hesabat alan aktivlər.',
  'dashboard.org.assets.reports': 'hesabat',
  'dashboard.org.assets.empty':
    'Hələ hesabat yoxdur — gəldikcə ən çox hədəflənən aktivlər burada görünəcək.',
  'dashboard.org.activity.title': 'Son fəaliyyət',
  'dashboard.org.activity.subtitle':
    'Proqramında son əməliyyatlar.',
  'dashboard.org.activity.empty':
    'Hələ fəaliyyət yoxdur — hesabatlar üzərində əməliyyat aparıldıqca burada görünəcək.',
  'dashboard.org.activity.event.submitted': 'Yeni hesabat göndərildi',
  'dashboard.org.activity.event.triaged': 'Hesabat yoxlanıldı',
  'dashboard.org.activity.event.status_changed': 'Status dəyişdi',
  'dashboard.org.activity.event.commented': 'Yeni şərh',
  'dashboard.org.activity.event.resolved': 'Hesabat həll edildi',
  'dashboard.org.activity.event.rewarded': 'Mükafat verildi',
  'dashboard.org.activity.event.closed': 'Hesabat bağlandı',
  'dashboard.org.activity.event.duplicate': 'Təkrar olaraq qeyd edildi',
  'dashboard.org.activity.event.invalid': 'Yararsız olaraq qeyd edildi',
  'dashboard.org.viewAll.toast.title':
    'Tam hesabat növbəsi — tezliklə',
  'dashboard.org.viewAll.toast.body':
    'Təşkilat tərəfi üçün ayrıca hesabat / yoxlama səhifəsi yol xəritəsindədir. Hələlik son hesabatlar bu vidcetdə göstərilir.',
  'dashboard.org.topResearchers.title':
    'Bu ayın aparıcı tədqiqatçıları',
  'dashboard.org.topResearchers.subtitle':
    'Proqramında ən aktiv tədqiqatçılar.',
  'dashboard.org.topResearchers.reports': '{count} hesabat',

  'report.title': 'Zəiflik hesabatı göndər',
  'report.description':
    '{program} təşkilatına təhlükəsizlik zəifliyi bildir',
  'report.steps.basic.title': 'Əsas məlumat',
  'report.steps.basic.desc': 'Zəiflik təfərrüatları',
  'report.steps.tech.title': 'Texniki təfərrüatlar',
  'report.steps.tech.desc': 'Addımlar və sübut',
  'report.steps.impact.title': 'Təsir və yoxlama',
  'report.steps.impact.desc': 'Yekun yoxlama',
  'report.fields.title': 'Zəifliyin başlığı',
  'report.fields.title.placeholder':
    'məsələn, Login API-də SQL Injection',
  'report.fields.asset': 'Təsirə məruz qalan aktiv / hədəf',
  'report.fields.asset.placeholder': 'Aktiv seç',
  'report.fields.severity': 'Ciddiyyət',
  'report.fields.weakness': 'Zəiflik tipi / kateqoriyası',
  'report.fields.weakness.placeholder': 'Zəiflik tipini seç',
  'report.fields.summary': 'Xülasə',
  'report.fields.summary.placeholder':
    'Zəifliyin qısa xülasəsini ver...',
  'report.fields.steps': 'Təkrar etmək üçün addımlar',
  'report.fields.steps.placeholder':
    '1. Bura keç...\n2. Aşağıdakı yükü daxil et...\n3. Müşahidə et ki...',
  'report.fields.poc': 'Konsept sübutu',
  'report.fields.poc.placeholder':
    'Kod parçaları, yüklər və ya texniki təfərrüatları əlavə et...',
  'report.fields.attachments': 'Əlavələr',
  'report.fields.attachments.dropzone':
    'Faylları bura at və ya yükləmək üçün klik et',
  'report.fields.attachments.types':
    'PNG, JPG, MP4, PDF — 10MB-ə qədər',
  'report.fields.attachments.demo':
    '(Demo: yükləmə simulyasiyadır)',
  'report.fields.impact': 'Təhlükəsizlik təsiri',
  'report.fields.impact.placeholder':
    'Mümkün təhlükəsizlik təsirini və təsirə məruz qalan istifadəçi/məlumatları təsvir et...',
  'report.fields.remediation': 'Tövsiyə olunan həll',
  'report.fields.remediation.placeholder':
    'Bu zəifliyin necə düzəldilə biləcəyini təklif et...',
  'report.fields.cvss': 'CVSS xalı',
  'report.fields.cvss.placeholder': 'məsələn, 8.5',
  'report.severity.critical.label': 'Kritik',
  'report.severity.critical.desc':
    'Tam sistem kompromisi, məlumat sızması',
  'report.severity.high.label': 'Yüksək',
  'report.severity.high.desc': 'Mühüm təhlükəsizlik təsiri',
  'report.severity.medium.label': 'Orta',
  'report.severity.medium.desc': 'Orta səviyyəli təhlükəsizlik narahatlığı',
  'report.severity.low.label': 'Aşağı',
  'report.severity.low.desc': 'Kiçik təhlükəsizlik problemi',
  'report.severity.informational.label': 'Məlumat',
  'report.severity.informational.desc': 'Təhlükəsizlik müşahidəsi',
  'report.summary.title': 'Hesabat xülasəsi',
  'report.summary.titleField': 'Başlıq',
  'report.summary.assetField': 'Aktiv',
  'report.summary.severityField': 'Ciddiyyət',
  'report.summary.weaknessField': 'Zəiflik',
  'report.agree.label':
    'Bu hesabatın proqram qaydalarına uyğun olduğunu təsdiqləyirəm',
  'report.agree.body':
    'Məsuliyyətlə test apardım, sahə qaydalarına əməl etdim və icazəsiz məlumatlara çıxış əldə etmədim.',
  'report.demo.notice':
    'Bu demo platformdur — buraxılışda real göndərmə SİMA ilə doğrulanmış Azərbaycan vətəndaşlığı tələb edəcək. Hesabatınız demo verilənlər bazasına saxlanılacaq və qəbul edən təşkilat onu öz panelindən nəzərdən keçirə biləcək.',
  'report.actions.submit': 'Hesabat göndər',
  'report.actions.submitting': 'Göndərilir...',
  'report.success.title': 'Hesabat göndərildi!',
  'report.success.body':
    'Hesabatınız demo verilənlər bazasına saxlanıldı. Qəbul edən təşkilat indi onu öz panelindən nəzərdən keçirə bilər.',
  'report.success.idLabel': 'Hesabat ID',
  'report.signin.required.title': 'Hesabat göndərmək üçün daxil ol',
  'report.signin.required.body':
    'Bu proqrama qarşı zəiflik hesabatı vermək üçün tədqiqatçı kimi daxil olmalısan.',
  'report.signin.required.cta': 'Daxil ol',
  'report.signin.wrongRole.title': 'Tədqiqatçı hesabı tələb olunur',
  'report.signin.wrongRole.body':
    'Yalnız tədqiqatçı hesabları hesabat göndərə bilər. Davam etmək üçün tədqiqatçı hesabı ilə daxil ol.',
  'report.signin.wrongRole.cta': 'Hesabı dəyiş',
  'report.error.title': 'Hesabat göndərilə bilmədi',
  'report.error.body':
    'Hesabat saxlanılarkən nəsə səhv oldu. Yenidən cəhd et.',
  'report.error.notResearcher':
    'Yalnız tədqiqatçı hesabları hesabat göndərə bilər.',

  // ─── Login page
  'login.badge.demo': 'Demo doğrulama',
  'login.title': 'HackTheBug-a daxil ol',
  'login.subtitle':
    'Tədqiqatçı və ya təşkilat tərəfini araşdırmaq üçün aşağıdakı demo hesablarından birini istifadə et. Real SİMA ilə daxil olma buraxılışda gələcək.',
  'login.email.label': 'E-poçt',
  'login.email.placeholder': 'sen@hackthebug.demo',
  'login.password.label': 'Şifrə',
  'login.password.placeholder': '••••••••',
  'login.submit': 'Daxil ol',
  'login.submitting': 'Daxil olunur...',
  'login.error.missingFields':
    'Zəhmət olmasa həm e-poçt, həm də şifrəni daxil et.',
  'login.error.invalidEmail': 'Düzgün e-poçt ünvanı daxil et.',
  'login.error.invalidCredentials':
    'E-poçt və ya şifrə yanlışdır. Sağdakı demo hesablarından birini sına.',
  'login.demoNote':
    'Yalnız demo / mock doğrulama — məlumatlar brauzerində lokal saxlanılır. Real backend doğrulaması, şifrə hashı və SİMA doğrulaması sonra gələcək.',
  'login.alreadySignedIn': '{role} kimi artıq daxil olmusan.',
  'login.goToDashboard': 'İdarə panelinə keç',
  'login.demo.title': 'Demo məlumatları',
  'login.demo.subtitle': 'Rolu seç — formanı sənin üçün dolduracağıq.',
  'login.demo.researcher.tagline': 'Hesabat göndər, reputasiyanı izlə.',
  'login.demo.organization.tagline': 'Proqramları idarə et, hesabatları araşdır.',
  'login.demo.emailLabel': 'E-poçt',
  'login.demo.passwordLabel': 'Şifrə',
  'login.demo.useThese': 'Bunları istifadə et',

  // ─── Access denied / role gate
  'roleGate.checking': 'Sessiyan yoxlanılır...',
  'roleGate.stillChecking':
    'Hələ də yoxlanır — şəbəkə və ya Supabase layihən yavaş cavab verə bilər.',
  'roleGate.tryAgain': 'Yenidən yüklə',
  'roleGate.denied.title': 'Giriş qadağandır',
  'roleGate.denied.body':
    'Bu panel yalnız {requiredRole} hesabları üçündür. Sən {currentRole} kimi daxil olmusan.',
  'roleGate.denied.goToMine': 'İdarə panelinə keç',
  'roleGate.denied.logout': 'Çıxış et',
  'roleGate.redirecting': 'Daxil olma səhifəsinə yönləndirilirsən...',

  // ─── Register page
  'register.badge': 'Demo qeydiyyat',
  'register.title': 'Hesab yarat',
  'register.subtitle':
    'Tərəfini seç. Tədqiqatçı hesabları proqramlara baxa və hesabat göndərə bilər; təşkilat hesabları proqram dərc edib gələn hesabatları yoxlaya bilər.',
  'register.tab.researcher': 'Tədqiqatçı',
  'register.tab.organization': 'Təşkilat',
  'register.field.email': 'E-poçt',
  'register.field.password': 'Şifrə',
  'register.field.password.help':
    'Minimum 6 simvol (Supabase tələbi).',
  'register.field.displayName': 'Görünən ad',
  'register.field.displayName.help':
    'Naviqasiyada, panellərdə və reytinqdə görünür.',
  'register.field.handle': 'İstifadəçi adı (istəyə bağlı)',
  'register.field.handle.help':
    'İctimai tədqiqatçı adı — yalnız hərflər və rəqəmlər, boşluq olmadan.',
  'register.field.yourName': 'Adınız',
  'register.field.yourName.help':
    'İstifadəçi düyməsində görünür — məsələn, "AZAL Təhlükəsizlik Komandası".',
  'register.field.orgName': 'Təşkilatın adı',
  'register.field.orgName.help':
    'Təşkilatınızın hüquqi / ictimai adı.',
  'register.field.orgSlug': 'Slug',
  'register.field.orgSlug.help':
    'Təşkilatınız üçün URL parçası. Addan avtomatik yaradılır; lazım olsa düzəlt. Yalnız hərf / rəqəm / defis.',
  'register.field.orgIndustry': 'Sahə',
  'register.field.orgIndustry.placeholder': 'Sahə seç',
  'register.submit': 'Hesab yarat',
  'register.submitting': 'Hesab yaradılır...',
  'register.haveAccount': 'Artıq hesabın var?',
  'register.logIn': 'Daxil ol',
  'register.error.missingFields':
    'Zəhmət olmasa bütün məcburi sahələri doldur.',
  'register.error.invalidEmail': 'Düzgün e-poçt ünvanı daxil et.',
  'register.error.weakPassword':
    'Şifrə minimum 6 simvol olmalıdır.',
  'register.error.invalidSlug':
    'Slug yalnız hərf, rəqəm və defis ola bilər.',
  'register.error.emailTaken':
    'Bu e-poçtla artıq hesab var. Daxil olmağı sına.',
  'register.error.slugTaken':
    'Bu təşkilat slug-ı artıq tutulub — başqa bir tane seç.',
  'register.error.unknown':
    'Qeydiyyat alınmadı. Şəbəkəni yoxla və yenidən cəhd et.',
  'register.notice.confirmEmail':
    '{email} ünvanına təsdiq linki göndərdik. Üzərinə klik et, sonra daxil ol.',
  'register.notice.demoOnly':
    'Demo qeydiyyat. Real qeydiyyat SİMA ilə doğrulanmış Azərbaycan vətəndaşlığı tələb edəcək.',

  // ─── Org dashboard: my programs widget
  'dashboard.org.myPrograms.title': 'Mənim proqramlarım',
  'dashboard.org.myPrograms.subtitle':
    'Təşkilatınızın dərc etdiyi proqramlar.',
  'dashboard.org.myPrograms.empty':
    'Hələ heç bir proqram dərc etməmisən.',
  'dashboard.org.myPrograms.create': 'Proqram yarat',
  'dashboard.org.myPrograms.viewAll': 'Hamısını gör',

  // ─── Create program page
  'createProgram.back': 'Panelə qayıt',
  'createProgram.badge': 'Təşkilat alətləri',
  'createProgram.title': 'Yeni proqram dərc et',
  'createProgram.subtitle':
    'Sahə, qaydalar və demo mükafat səviyyəsini təyin et. Real test rəsmi yazılı icazə tələb edir — hər proqram kartı bu xəbərdarlığı daşıyır.',
  'createProgram.section.basics': 'Əsas məlumatlar',
  'createProgram.section.scope': 'Əhatə daxili aktivlər',
  'createProgram.section.rewards': 'Mükafat səviyyəsi',
  'createProgram.section.publish': 'Dərc et',
  'createProgram.field.name': 'Proqramın adı',
  'createProgram.field.name.placeholder':
    'məsələn, AZAL Mobil Tətbiq Açıqlaması',
  'createProgram.field.slug': 'Slug',
  'createProgram.field.slug.help':
    '/programs/ altındakı URL parçası. Avtomatik yaradılır; istəyirsənsə düzəlt.',
  'createProgram.field.description': 'Qısa təsvir',
  'createProgram.field.description.placeholder':
    'Proqram kartında göstərilən bir cümləlik xülasə.',
  'createProgram.field.longDescription': 'Uzun təsvir (istəyə bağlı)',
  'createProgram.field.longDescription.placeholder':
    'Proqram detalı səhifəsi üçün kontekst, motivasiya və əlavə təfərrüatlar.',
  'createProgram.field.type': 'Proqram növü',
  'createProgram.field.type.bug-bounty': 'Bug Bounty',
  'createProgram.field.type.vdp': 'Zəiflik açıqlama (VDP)',
  'createProgram.field.type.private-preview': 'Qapalı önbaxış',
  'createProgram.field.status': 'Status',
  'createProgram.field.status.active': 'Aktiv',
  'createProgram.field.status.upcoming': 'Yaxınlaşır',
  'createProgram.field.featured': 'Ana səhifədə seçilmiş et',
  'createProgram.scope.target': 'Hədəf',
  'createProgram.scope.targetPlaceholder':
    'məsələn, Müştəri portalı, Public API, Mobil tətbiq',
  'createProgram.scope.type': 'Növ',
  'createProgram.scope.add': 'Sahə əlavə et',
  'createProgram.scope.empty':
    'Dərc etmədən əvvəl ən azı bir əhatə daxili element əlavə et.',
  'createProgram.tier.label': 'Demo mükafat səviyyəsi',
  'createProgram.tier.help':
    'Hər səviyyə realist AZN aralıqlı 5 sətirli ciddiyyət cədvəli yaradır (məlumat → kritik). Bütün dəyərlər demo / planlaşdırılmışdır.',
  'createProgram.tier.low.title': 'Aşağı',
  'createProgram.tier.low.body':
    'Kiçik səth — 3,500 AZN-ə qədər.',
  'createProgram.tier.standard.title': 'Standart',
  'createProgram.tier.standard.body':
    'Orta kommersiya / ictimai xidmət — 5,000 AZN-ə qədər.',
  'createProgram.tier.high.title': 'Yüksək',
  'createProgram.tier.high.body':
    'Yüksək təsirli infrastruktur — 7,000 AZN-ə qədər.',
  'createProgram.tier.top.title': 'Ən yüksək',
  'createProgram.tier.top.body':
    'Ən təsirli / ən həssas — 9,000 AZN-ə qədər.',
  'createProgram.submit': 'Proqramı dərc et',
  'createProgram.submitting': 'Dərc edilir...',
  'createProgram.cancel': 'Ləğv et',
  'createProgram.error.missingFields':
    'Adı, təsviri və ən azı bir əhatə elementini doldur.',
  'createProgram.error.invalidSlug':
    'Slug yalnız hərf, rəqəm və defis ola bilər.',
  'createProgram.error.slugTaken':
    'Bu slug ilə proqram artıq mövcuddur. Başqa bir tane seç.',
  'createProgram.error.unknown':
    'Proqramı dərc etmək alınmadı. Təfərrüatlar üçün brauzer konsolunu yoxla.',
}

const dictionaries: Record<Locale, Dict> = { en, az }

export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const lookup = dictionaries[locale] ?? dictionaries.en
  let value = lookup[key] ?? dictionaries.en[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return value
}
