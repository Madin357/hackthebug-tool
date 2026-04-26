# Hack The Bug — Project Memory

> Living document for future Claude sessions. Read this first, then `CLAUDE.md`,
> then explore code. Update **Last Actions** after every meaningful change.

---

## Product Summary

**Hack The Bug** is a modern cybersecurity platform concept for Azerbaijan‑focused
digital products and organizations. It connects:

- **Organizations** (banks, telecoms, government portals, fintech, e‑commerce,
  cloud providers, etc.) that want to publish vulnerability disclosure (VDP) or
  bug bounty programs.
- **Ethical hackers / security researchers** who can responsibly test in‑scope
  assets and submit vulnerability reports, earn rewards, build reputation, and
  climb a public leaderboard.

Positioning: a *trusted, regional* cybersecurity SaaS — premium and enterprise‑
ready, suitable for banks and government, **not** a gaming/cyberpunk hacker site.

## Current Goal

Polish a **frontend‑only hackathon demo** that showcases the Hack The Bug
vision end‑to‑end at a hackathon. The judges should walk away thinking
"modern, trusted cybersecurity startup," not "student project."

Scope of this hackathon iteration is UI/UX only. Backend, auth, database,
identity verification, payments, and report storage are explicitly out of scope
for now and will be layered on later.

## Current Technical State

- Frontend‑only Next.js app. **No backend, no database, no real auth, no real
  registration, no real SİMA / identity verification, no real payments.**
- All data is mocked locally in `lib/mock-data.ts`.
- Submitting a report opens a multi‑step modal that simulates submission with a
  `setTimeout` and shows a fake report ID. Nothing is persisted.
- "Verification Coming Soon" is shown in the nav and on the researcher
  dashboard as a SİMA placeholder.
- Dark theme is hard‑forced in `app/layout.tsx` (`<html className="dark">`).
  `next-themes` is imported via `components/theme-provider.tsx` but not wired up.
- `next.config.mjs` has `typescript.ignoreBuildErrors: true` and
  `images.unoptimized: true` — typical hackathon escape hatches.

### Known issues found during initial review (2026‑04‑26)

These are pre‑existing in the initial commits, not introduced by Claude:

1. **`app/leaderboard/page.tsx` is broken at runtime.** It imports
   `topResearchers` from `@/lib/mock-data` which does not exist (the actual
   export is `researchers`), and references fields that don't exist on the
   `Researcher` type (`username`, `avatar_url`, `bugs_found`,
   `total_earnings`). Page will throw `TypeError: Cannot read properties of
   undefined (reading 'slice')`. Build doesn't catch it because
   `ignoreBuildErrors` is on.
2. **Double Navigation/Footer on `/about` and `/leaderboard`.** Both pages
   render `<Navigation />` and `<Footer />` themselves, but `app/layout.tsx`
   already wraps every page with both. Result: two stacked navs and footers,
   plus extra `pt-24` padding (layout's `<main>` already has `pt-16`).
3. **Recharts colors don't render correctly.** Dashboards use
   `hsl(var(--primary))` etc., but the design tokens in `app/globals.css` are
   `oklch(...)` values. `hsl(oklch(...))` is invalid — chart bars/areas/tooltip
   backgrounds fall back to defaults. Use `var(--primary)` directly (or
   `oklch(var(--primary))`).
4. **About page narrative contradicts the product.** Claims "founded in 2019,"
   "$75M+ bounties paid," "100+ countries," with generic Western leadership team
   — incompatible with the Azerbaijan‑focused, hackathon‑prototype framing
   used everywhere else. Needs to be re‑aligned.
5. **`styles/globals.css` is dead code.** Not imported by anyone. It's a
   leftover default shadcn light/dark theme. Safe to delete.
6. **Geist webfont is not actually applied.** `app/layout.tsx` calls
   `Geist({ subsets: ['latin'] })` but assigns the result to `_geist` (unused).
   Without applying `geist.variable` / `geist.className` to `<html>` or
   `<body>`, the webfont isn't loaded — the page falls back to the system sans.
7. **Two toast systems present.** Both `sonner` and the legacy radix‑based
   `useToast` (`hooks/use-toast.ts` + `components/ui/toast.tsx` +
   `toaster.tsx`) are installed. Pick one (sonner is simpler) and remove the
   other.
8. **`package.json#name` is `"my-project"`.** Should be `"hackthebug"`.

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router, RSC enabled). React 19.
- **Language:** TypeScript 5.7 (strict). Path alias `@/*` → repo root.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css`,
  `tailwind-merge`, `clsx`, `class-variance-authority`. Single token theme in
  `app/globals.css` using `oklch()` colors and `@theme inline`.
- **UI primitives:** shadcn/ui (style: `new-york`, base color: `neutral`, CSS
  variables on, RSC on). All Radix primitives are installed; full library lives
  in `components/ui/`.
- **Icons:** `lucide-react`.
- **Animation:** `framer-motion` (page transitions, card entrances).
- **Charts:** `recharts` (used in both dashboards).
- **Forms:** `react-hook-form` + `@hookform/resolvers` + `zod` (installed; not
  yet used — the report submission modal hand‑rolls its own state).
- **Notifications:** `sonner` + legacy `useToast` (duplicate, see issue 7).
- **Theming:** `next-themes` installed but unused; dark mode is hard‑coded.
- **Analytics:** `@vercel/analytics` (only mounted in production).
- **Package manager:** both `package-lock.json` and `pnpm-lock.yaml` exist —
  pnpm appears to be the intended choice based on the lockfile size.

## Project Structure

```
hackthebug-tool/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — forces dark, mounts Nav + Footer
│   ├── globals.css               # Active design tokens (oklch dark theme + glow utils)
│   ├── page.tsx                  # Landing page (hero, stats, how‑it‑works, features,
│   │                             #   featured programs, value prop, roadmap, CTA)
│   ├── about/page.tsx            # About page (currently misaligned, see issues)
│   ├── leaderboard/page.tsx      # Leaderboard (currently BROKEN, see issue 1)
│   ├── programs/
│   │   ├── page.tsx              # Programs directory: search/filter/sort/grid+list
│   │   └── [slug]/page.tsx       # Program detail: tabs (overview/scope/rewards/
│   │                             #   rules/updates/hall‑of‑fame) + report modal
│   └── dashboard/
│       ├── researcher/page.tsx   # Researcher view: stats, charts, recent reports,
│       │                         #   achievements, SIMA banner, saved/recommended
│       └── organization/page.tsx # Org view: stats, trend chart, severity, pipeline,
│                                 #   recent reports, top assets, activity, top hackers
├── components/
│   ├── navigation.tsx            # Sticky glass header + responsive mobile menu
│   ├── footer.tsx                # 4‑column footer with brand + links
│   ├── program-card.tsx          # Reusable program card (used on home + directory)
│   ├── section-heading.tsx       # Reusable badge + h2 + subtitle block
│   ├── severity-badge.tsx        # Critical / High / Medium / Low / Info pill
│   ├── status-badge.tsx          # draft / pending / triaged / resolved / etc. pill
│   ├── stat-card.tsx             # Animated KPI card with optional trend
│   ├── report-submission-modal.tsx # 3‑step report submission dialog (mock submit)
│   ├── theme-provider.tsx        # next-themes wrapper (currently unused)
│   └── ui/                       # shadcn/ui primitives (full kit)
├── lib/
│   ├── types.ts                  # Domain types: Program, Researcher, Report, etc.
│   ├── mock-data.ts              # All mock data + supporting lookup arrays
│   └── utils.ts                  # `cn()` helper
├── hooks/
│   ├── use-mobile.ts             # md breakpoint hook
│   └── use-toast.ts              # Legacy radix toast (duplicate with sonner)
├── styles/globals.css            # DEAD — leftover default shadcn theme, not imported
├── components.json               # shadcn config (style: new-york, base: neutral)
├── next.config.mjs               # ignoreBuildErrors + images.unoptimized
├── tsconfig.json                 # strict TS, "@/*" → ./*
├── postcss.config.mjs            # Tailwind v4 plugin only
├── package.json                  # name still "my-project"
└── README.md                     # one‑liner
```

## Existing Pages

| Route                            | Purpose                                                                                             | State    |
| -------------------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| `/`                              | Landing: hero + dashboard mock + platform stats + how it works + features + featured programs + value prop + roadmap + CTA. | Working  |
| `/programs`                      | Directory: search by name/org/tag, filter by industry/type/status, sort, grid/list toggle.          | Working  |
| `/programs/[slug]`               | Program detail with tabs: Overview / Scope / Rewards / Rules / Updates / Hall of Fame; "Submit Report" opens modal; "Similar Programs" footer. | Working  |
| `/leaderboard`                   | Top researchers podium + full table + summary stats.                                                | **Broken at runtime** (see issue 1) and renders duplicate Nav/Footer (see issue 2). |
| `/about`                         | Hero + stats + mission + values + timeline + team + CTA.                                            | Renders, but content is off‑narrative + duplicate Nav/Footer (issues 2 & 4). |
| `/dashboard/researcher`          | Researcher KPI dashboard with charts, recent reports, achievements, SIMA banner, saved + recommended programs. | Working (chart fills broken — issue 3). |
| `/dashboard/organization`        | Org KPI dashboard with trend, severity, pipeline, recent reports, top assets, activity feed, top hackers. | Working (chart fills broken — issue 3). |

## Existing Components

| Component                        | Purpose                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `Navigation`                     | Sticky glass top bar, brand mark, primary nav (Home/Programs/Leaderboard/About), Dashboard dropdown, "Verification Coming Soon" pill, "Launch Demo" CTA, animated mobile drawer. |
| `Footer`                         | 4‑column footer: brand + social, Platform links, Resources links, Legal links, "Hackathon Demo" tag. |
| `ProgramCard`                    | Animated card showing org icon, name, status, type/industry/tags, rewards range, asset count, last updated, "View Program" CTA, featured ribbon. Used on home and `/programs`. |
| `SectionHeading`                 | Optional badge + h2 + subtitle, optionally centered, with fade‑in‑on‑view animation.     |
| `SeverityBadge`                  | Pill with colored dot for critical/high/medium/low/informational.                        |
| `StatusBadge`                    | Pill for report lifecycle: draft, pending, triaged, resolved, rewarded, duplicate, invalid. |
| `StatCard`                       | KPI tile with title/value, optional icon + trend, gradient overlay, fade‑in animation.   |
| `ReportSubmissionModal`          | 3‑step dialog: (1) Basic info — title/asset/severity/weakness; (2) Technical — summary/steps/PoC/attachments; (3) Impact & Review — impact/remediation/CVSS/agreement. Simulates submit. |
| `ThemeProvider`                  | `next-themes` wrapper. **Currently unused** — dark mode is forced in `layout.tsx`.       |
| `components/ui/*`                | shadcn/ui primitives (button, badge, card, dialog, table, tabs, select, input, textarea, checkbox, dropdown‑menu, avatar, etc.). |

## Mock Data

All mock data lives in `lib/mock-data.ts`, typed against `lib/types.ts`.

| Export                          | Type                  | Purpose                                                                |
| ------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| `platformStats`                 | `PlatformStats`       | 24 active programs, 312 verified researchers, 1,847 reports, <24h triage, $127.5K paid, 18 orgs. |
| `programs`                      | `Program[]`           | 6 fictional Azerbaijan/region‑themed programs: CaspianBank, BakuCommerce, GovPortal X, AzCloud One, SilkRoute Pay, Karabug Telecom. Each has scope, rewards table, rules, updates timeline, hall of fame, response SLAs. |
| `researchers`                   | `Researcher[]`        | 10 fictional researchers (handles, country/code, points, reputation, badges, total rewards). Top 4 are AZ‑based. |
| `reports`                       | `Report[]`            | 7 sample vulnerability reports across the programs.                    |
| `researcherDashboardStats`      | `DashboardStats`      | KPIs for the researcher view (assumes "you" are CyberNomad, rank #1).  |
| `orgDashboardStats`             | `OrgDashboardStats`   | KPIs for the org view (assumes "you" are CaspianBank).                 |
| `severityDistribution`          | `ChartDataPoint[]`    | Counts by severity for pie chart.                                      |
| `reportsTimeline`               | `TimelineDataPoint[]` | 6‑month reports vs resolved (org dashboard).                           |
| `researcherReportsTimeline`     | `TimelineDataPoint[]` | 6‑month researcher submission counts.                                  |
| `topAttackedAssets`             | array                 | Top 5 most‑reported assets with reports + severity.                    |
| `recentActivity`                | array                 | Recent activity feed for the org dashboard.                            |
| `weaknessCategories`            | `string[]`            | OWASP/CWE‑style options for the report submission modal.               |
| `industries`                    | `string[]`            | Industry filter options for the programs directory.                    |

There is **no** `topResearchers` export despite the leaderboard importing it
(see issue 1).

## Design Direction

**Premium dark cybersecurity SaaS with subtle neon accents.** Looks at home
next to a bank's online portal, a national digital identity service, or an
enterprise security console. Avoids cyberpunk/Matrix/gaming clichés.

### Tokens (active set: `app/globals.css`)

- **Background** — `oklch(0.12 0.01 250)` (deep blue‑black).
- **Card** — `oklch(0.15 0.015 250)`.
- **Foreground** — `oklch(0.95 0.01 250)`.
- **Primary (neon cyan)** — `oklch(0.75 0.18 195)`. Used for CTAs, focus rings,
  brand "The" highlight, primary chart series.
- **Accent (violet/indigo)** — `oklch(0.70 0.15 280)`. Used for accent states
  and the gradient text utility.
- **Success / Warning / Critical** — green / amber / red‑orange semantic colors
  used for status and severity badges.
- **Border** — low‑contrast `oklch(0.28 0.02 250)`.
- **Radius** — `0.75rem` default (xl 1rem, lg .75, md .625, sm .5).

### Utilities

- `.glass` — translucent card + backdrop‑blur for header/popovers.
- `.glow-cyan`, `.glow-accent` — soft outer glow on primary CTAs / featured
  cards.
- `.gradient-text` — cyan→violet gradient on key headlines.
- Custom dark scrollbar.

### Motion

`framer-motion` is used consistently:

- Hero and section content fade up with stagger.
- Cards/rows fade up on viewport enter.
- Mobile menu slides via `AnimatePresence`.

### Typography

`Geist` and `Geist Mono` are declared as `--font-sans` / `--font-mono`. Note:
the `next/font` loader is **not** wired into `<html>` so the webfont isn't
actually being downloaded; system sans renders. Fixing this is on the polish
list.

## Important Product Rules

These are hard rules for this hackathon iteration:

- **Do not add a real backend.** No API routes, no server actions that hit
  real services. Anything "submit"/"save" stays mocked.
- **Do not add real auth.** No NextAuth, Clerk, Supabase Auth, etc. UI flows
  may show "Sign in" but they should remain decorative.
- **Do not add a real database.** No Postgres/SQLite/Mongo wiring. State lives
  in `lib/mock-data.ts` (or `useState` for in‑page state).
- **Do not add real payments.** Reward amounts and bounty paid figures are all
  illustrative.
- **Do not add real SİMA / identity verification integration.** The "SIMA
  Coming Soon" / "Identity Verification" placeholders are intentional — keep
  them as visual stubs.
- **Use mock data only.** All seed data lives in `lib/mock-data.ts`. Add new
  fields to `lib/types.ts` first, then back the type with mock entries.
- **Keep future backend integration in mind.** Components should accept data
  via props/typed objects (not hard‑coded inline) so they can be swapped to
  fetched data later. Treat `lib/mock-data.ts` as the single seam — pages
  import from it; components do not.
- **Do not introduce environment variables for secrets.** No `process.env.*` for
  API keys / database URLs in this iteration.
- **Demo honesty.** Where data is fake, label it (existing pages already use
  small "Demo Data" / "Hackathon Demo" / "Fictional programs and sample data"
  badges — keep that pattern).

## Future Features

To be implemented after the hackathon, in roughly this order:

- **Identity verification (SİMA)** — replace the "Coming Soon" pill with the
  real SİMA flow on the researcher and organization onboarding paths.
- **Real registration / login** — researcher accounts, organization accounts,
  team membership.
- **Backend API** — Next.js Route Handlers or a separate service for programs,
  reports, users, comments, payouts, audit log.
- **Database** — Postgres recommended; schema mirrors `lib/types.ts`.
- **Real report submission** — persist reports, generate IDs, store
  attachments, email notifications.
- **Organization dashboard (real)** — multi‑program management, triage queue,
  internal comments, payout workflows, SLA timers, exportable reports.
- **Researcher dashboard (real)** — actual reputation calc, badge engine,
  payout history, KYC/tax forms.
- **Notification system** — in‑app + email for triage updates, comments,
  rewards, program updates.
- **Role‑based access control** — researcher / org admin / org member /
  platform admin / triage reviewer.
- **Public hall of fame & profile pages** — per researcher and per program.
- **Disclosure timeline & coordinated disclosure tooling.**
- **Localization (Azerbaijani / English / Russian).**

## Last Actions

### 2026‑04‑26 — Initial project ingestion

- **What:** Read every relevant file in the repo (configs, all routes, all
  reusable components, types, mock data, hooks, styles). Created `MEMORY.md`
  and `CLAUDE.md` to anchor future Claude sessions.
- **Why:** No prior project memory existed; the hackathon brief asks for a
  durable understanding of structure, design direction, and what *not* to
  build before any improvements are made.
- **Files touched:** added `MEMORY.md`, `CLAUDE.md` (root). No source files
  modified.
- **Findings recorded:** see "Known issues" above (broken leaderboard imports,
  duplicate Nav/Footer on /about and /leaderboard, recharts hsl() over oklch
  tokens, off‑narrative About content, dead `styles/globals.css`, unloaded
  Geist webfont, duplicate toast systems, generic package name).
- **Next step:** propose a small, prioritized fix pass (see Next Recommended
  Actions). Wait for user approval before changing source.

## Next Recommended Actions

In priority order. Each item is intentionally small and reversible.

1. **Fix the broken leaderboard page (issue 1).** Switch the import to
   `researchers`, map fields to the actual `Researcher` type
   (`name`/`handle`/`reportsAccepted`/`totalRewards`/`reputation`/`country`/
   `countryCode`), and ensure the avatar fallback uses `name`. ~30 min.
2. **Remove duplicate Navigation/Footer from `/about` and `/leaderboard`
   (issue 2).** Drop the imports, drop the wrapping `<div className="min-h-
   screen">…<main>…</main>…</div>` and keep just the page sections. Adjust top
   padding to match other pages (no `pt-24`). ~15 min.
3. **Realign About page narrative (issue 4).** Rewrite hero / stats / timeline
   / team to reflect: hackathon prototype, Azerbaijan focus, plausible
   regional team, pre‑launch numbers consistent with `platformStats`. Keep the
   visual structure. ~45 min.
4. **Fix recharts colors (issue 3).** Replace `hsl(var(--primary))` etc. with
   `var(--primary)` (or `oklch(var(--primary))`) in both dashboards. Verify
   bars/areas/tooltip backgrounds render correctly. ~20 min.
5. **Wire Geist webfont properly (issue 6).** Apply `geist.variable` to
   `<html>` (or `geist.className` to `<body>`) so the next/font CSS actually
   ships. Remove the underscore prefix once used. ~10 min.
6. **Decide on a single toast system (issue 7).** Pick `sonner` (simpler,
   already imported), delete `hooks/use-toast.ts`, `components/ui/toast.tsx`,
   and `components/ui/toaster.tsx` if nothing depends on them. ~15 min.
7. **Delete dead `styles/globals.css` (issue 5).** Confirm via grep that
   nothing imports it, then remove. ~2 min.
8. **Rename `package.json#name`** from `my-project` to `hackthebug` (issue 8).
   ~1 min.
9. **Tighten the empty/loading states.** Programs directory has a clear empty
   state already; add similar treatment to dashboards if any list ends up
   empty after future filtering.
10. **Add a global "Demo data" disclaimer banner (optional).** A thin
    dismissible top strip that's transparent about the demo status, so judges
    see it once and we can drop the inline "Demo Data" pills inside content.

After items 1–4 the demo will look meaningfully more polished and trustworthy.
Items 5–10 are progressive polish.
