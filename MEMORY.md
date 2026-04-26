# Hack The Bug — Project Memory

> Living document for future Claude sessions. Read this first, then `CLAUDE.md`,
> then explore code. Update **Last Actions** after every meaningful change.

---

## Product Summary

**Hack The Bug** is a modern cybersecurity platform concept built **exclusively
for the Republic of Azerbaijan**. It connects:

- **Azerbaijani organizations** (banks, telecoms, government portals, fintech,
  e‑commerce, cloud providers, etc.) that want to publish vulnerability
  disclosure (VDP) or bug bounty programs.
- **Verified Azerbaijani citizens** acting as ethical hackers / security
  researchers who can responsibly test in‑scope assets and submit vulnerability
  reports, earn rewards, build reputation, and climb a national leaderboard.

Positioning: a *trusted, national* cybersecurity SaaS for Azerbaijan — premium
and enterprise‑ready, suitable for banks and government, **not** a
gaming/cyberpunk hacker site, **not** a global platform. Identity verification
through **SİMA** is planned for launch and is **not active in the current
build** — every visible "submit", "register", "login" remains a demo.

## Current Goal

Polish a **frontend‑only hackathon demo** that showcases the Hack The Bug
vision end‑to‑end at a hackathon. The judges should walk away thinking
"modern, trusted cybersecurity startup," not "student project."

Scope of this hackathon iteration is UI/UX only. Backend, auth, database,
identity verification, payments, and report storage are explicitly out of scope
for now and will be layered on later.

## Current Technical State

- Frontend‑only Next.js app. **No backend, no database, no real
  registration, no real SİMA / identity verification, no real payments.**
- **Mock auth (demo only) is now wired in.** Two hard‑coded credentials live
  in `lib/auth/mock-users.ts`: `researcher@hackthebug.demo / researcher123`
  (linked to researcher `id: '1'` = CyberNomad) and
  `org@hackthebug.demo / org123` (linked to organization
  `id: 'org-caspianbank'` = CaspianBank). Sessions are stored in
  `localStorage` under `htb-session` and exposed via `useAuth()` from
  `lib/auth/auth-provider.tsx`. `RoleGate` (`components/role-gate.tsx`) wraps
  each dashboard via a tiny route‑segment `layout.tsx` and handles
  loading / unauthenticated / wrong‑role states. **This is not a security
  boundary** — see security notes in `DATABASE_PLAN.md` and the
  file‑level docstrings in `lib/auth/*`.
- All data is mocked locally in `lib/mock-data.ts`. All 10 researchers are
  AZ‑based (country: Azerbaijan, countryCode: AZ).
- Submitting a report opens a multi‑step modal that simulates submission with a
  `setTimeout` and shows a fake report ID. Nothing is persisted.
- "Verification Coming Soon" / "SİMA — coming soon" / "AZ citizens only ·
  Verification soon" appear in the nav, hero, dashboards, report modal, and
  about page as planned/demo language. **Verification is never described as
  active.**
- **Internationalization is now wired up.** `lib/i18n/dictionary.ts` holds
  flat‑key EN + AZ entries; `lib/i18n/locale-provider.tsx` exposes
  `LocaleProvider`, `useLocale`, and `useT`. The provider is mounted in
  `app/layout.tsx`. Default locale is **AZ**. The user's choice is persisted
  in `localStorage` under `htb-locale`. The `<html lang>` attribute is updated
  in an effect when the locale changes. The provider rehydrates from
  `localStorage` after mount, so SSG renders at the default locale.
  `<html suppressHydrationWarning>` covers the post‑mount text swap.
- The EN/AZ toggle lives in the navigation header (desktop + mobile drawer)
  via `components/locale-switcher.tsx`.
- Dark theme is hard‑forced in `app/layout.tsx` (`<html className="dark …">`).
  `next-themes` is imported via `components/theme-provider.tsx` but not wired
  up — kept for the day a light mode lands.
- Geist + Geist Mono webfonts are wired through `next/font` and exposed to
  Tailwind v4 via `--font-geist-sans` / `--font-geist-mono` referenced from
  `@theme inline` in `app/globals.css`.
- `next.config.mjs` has `typescript.ignoreBuildErrors: true` and
  `images.unoptimized: true` — typical hackathon escape hatches. (Plain `tsc
  --noEmit` runs clean as of the latest pass.)

### Known issues

None at the moment. The eight pre‑existing defects identified during the
2026‑04‑26 initial review have all been resolved (see "Last Actions" below).

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
- **Notifications:** none wired up. `sonner` package retained in
  `package.json` for future use; the previous duplicate toast surface has
  been removed.
- **Internationalization:** local, dependency‑free system in `lib/i18n/`
  (`dictionary.ts` with flat‑key EN/AZ + `locale-provider.tsx` with
  `LocaleProvider`/`useLocale`/`useT`). Default locale `'az'`, persisted via
  `localStorage` (`htb-locale`). EN/AZ toggle in `components/locale-switcher.tsx`.
- **Auth (demo/mock):** local, dependency‑free in `lib/auth/`
  (`mock-users.ts` with the 2 demo accounts + `auth-provider.tsx` exposing
  `AuthProvider`/`useAuth`/`dashboardPathForRole`). Session stored in
  `localStorage` under `htb-session`. `RoleGate` enforces dashboard
  separation client‑side. **Not production‑safe.**
- **Theming:** `next-themes` installed but unused; dark mode is hard‑coded.
- **Analytics:** `@vercel/analytics` (only mounted in production).
- **Package manager:** both `package-lock.json` and `pnpm-lock.yaml` exist —
  pnpm appears to be the intended choice based on the lockfile size.

## Project Structure

```
hackthebug-tool/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — forces dark, wires Geist via next/font, mounts Nav + Footer
│   ├── globals.css               # Active design tokens (oklch dark theme + glow utils)
│   ├── page.tsx                  # Landing page (hero, stats, how‑it‑works, features,
│   │                             #   featured programs, value prop, roadmap, CTA)
│   ├── about/page.tsx            # About: hero + stats (from platformStats) + mission +
│   │                             #   values + 2025‑2026 roadmap + AZCON team roles + CTA
│   ├── leaderboard/page.tsx      # Leaderboard: hero + filters + podium + table + stats + CTA
│   ├── login/page.tsx            # /login: branded form + demo creds card (mock auth)
│   ├── programs/
│   │   ├── page.tsx              # Programs directory: search/filter/sort/grid+list
│   │   └── [slug]/page.tsx       # Program detail: tabs (overview/scope/rewards/
│   │                             #   rules/updates/hall‑of‑fame) + report modal
│   └── dashboard/
│       ├── researcher/
│       │   ├── layout.tsx        # RoleGate('researcher') wrapper
│       │   └── page.tsx          # Researcher view: stats, charts, recent reports,
│       │                         #   achievements, SIMA banner, saved/recommended
│       └── organization/
│           ├── layout.tsx        # RoleGate('organization') wrapper
│           └── page.tsx          # Org view: stats, trend chart, severity, pipeline,
│                                 #   recent reports, top assets, activity, top hackers
├── components/
│   ├── navigation.tsx            # Sticky glass header + LocaleSwitcher + auth-aware user menu / Login button
│   ├── footer.tsx                # 4‑column footer with brand + links + AZ‑only badge
│   ├── locale-switcher.tsx       # EN/AZ toggle (used in nav)
│   ├── role-gate.tsx             # Client-side gate: loading / unauthenticated / wrong-role / pass-through
│   ├── program-card.tsx          # Reusable program card (used on home + directory)
│   ├── section-heading.tsx       # Reusable badge + h2 + subtitle block
│   ├── severity-badge.tsx        # Critical / High / Medium / Low / Info pill (uses useT)
│   ├── status-badge.tsx          # draft / pending / triaged / resolved / etc. pill (uses useT)
│   ├── stat-card.tsx             # Animated KPI card with optional trend
│   ├── report-submission-modal.tsx # 3‑step report submission dialog (mock submit, fully translated)
│   ├── theme-provider.tsx        # next-themes wrapper (currently unused)
│   └── ui/                       # shadcn/ui primitives (full kit, minus the deleted
│                                 #   toast/sonner/use-mobile dupes)
├── lib/
│   ├── types.ts                  # Domain types: Program, Researcher, Report, User, Session, etc.
│   ├── mock-data.ts              # All mock data + supporting lookup arrays (researchers all AZ)
│   ├── utils.ts                  # `cn()` helper
│   ├── i18n/
│   │   ├── dictionary.ts         # Flat‑key EN + AZ dictionary, translate() helper, Locale type
│   │   └── locale-provider.tsx   # LocaleProvider + useLocale + useT hooks (localStorage backed)
│   └── auth/
│       ├── mock-users.ts         # 2 demo creds (researcher + organization) + Organization mock
│       └── auth-provider.tsx     # AuthProvider + useAuth + dashboardPathForRole (localStorage backed)
├── hooks/
│   └── use-mobile.ts             # md breakpoint hook (the canonical location)
├── components.json               # shadcn config (style: new-york, base: neutral)
├── next.config.mjs               # ignoreBuildErrors + images.unoptimized
├── tsconfig.json                 # strict TS, "@/*" → ./*
├── postcss.config.mjs            # Tailwind v4 plugin only
├── package.json                  # name: "hackthebug"
├── MEMORY.md                     # this file
├── CLAUDE.md                     # working instructions for Claude in this repo
├── DATABASE_PLAN.md              # planning-only schema for the future backend pass
└── README.md                     # one‑liner
```

## Existing Pages

| Route                            | Purpose                                                                                             | State    |
| -------------------------------- | --------------------------------------------------------------------------------------------------- | -------- |
| `/`                              | Landing: hero + dashboard mock + platform stats + how it works + features + featured programs + value prop + roadmap + CTA. | Working  |
| `/programs`                      | Directory: search by name/org/tag, filter by industry/type/status, sort, grid/list toggle.          | Working  |
| `/programs/[slug]`               | Program detail with tabs: Overview / Scope / Rewards / Rules / Updates / Hall of Fame; "Submit Report" opens modal; "Similar Programs" footer. | Working  |
| `/leaderboard`                   | Hero + filters + top‑3 podium + full rankings table + summary stats + CTA. Reads from `researchers`. | Working  |
| `/about`                         | Hero + stats (driven by `platformStats`) + mission + values + 2025‑2026 roadmap + AZCON team roles + CTA. | Working  |
| `/login`                         | Mock login form (email + password) + demo credentials card with one-click fill. Redirects to user's dashboard on success; if a `?next=/path` is provided it is honored. | Working  |
| `/dashboard/researcher`          | Researcher KPI dashboard with charts, recent reports, achievements, SIMA banner, saved + recommended programs. **Wrapped in `RoleGate('researcher')`.** | Working  |
| `/dashboard/organization`        | Org KPI dashboard with trend, severity, pipeline, recent reports, top assets, activity feed, top hackers. **Wrapped in `RoleGate('organization')`.** | Working  |

## Existing Components

| Component                        | Purpose                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `Navigation`                     | Sticky glass top bar, brand mark, primary nav (Home/Programs/Leaderboard/About), auth-aware Dashboard surface (anonymous: dropdown of both views; signed-in: single "My dashboard" link to the user's role), "AZ citizens only · Verification soon" pill, EN/AZ `LocaleSwitcher`, **Login button when anonymous / user pill with My dashboard + Logout when authenticated**, animated mobile drawer mirroring the same. |
| `Footer`                         | 4‑column footer: brand + AZ‑citizens‑only badge + social, Platform links, Resources links, Legal links, "Hackathon Demo" tag. |
| `LocaleSwitcher`                 | EN/AZ toggle group; toggles `useLocale().setLocale`, persists to `localStorage` (`htb-locale`). Used in Navigation desktop bar + mobile drawer. |
| `RoleGate`                       | Client wrapper for protected pages. Shows a loader while `useAuth()` resolves, redirects unauthenticated users to `/login?next=…`, shows an inline "Access denied" card with link to the user's own dashboard + logout when the role doesn't match. |
| `FormattedDate`                  | Renders `en-US` on the server + first client paint, then swaps to the user's locale after mount. Use this anywhere a locale-aware date is shown — formatting `az-AZ` directly during SSR causes a hydration mismatch because Node.js Intl falls back to `M04 20` while the browser produces `20 apr`. |
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
| `researchers`                   | `Researcher[]`        | 10 fictional researchers (handles, country/code, points, reputation, badges, total rewards). **All 10 are AZ‑based** since AZ‑citizens‑only positioning shipped. |
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

`Geist` and `Geist Mono` are loaded by `next/font` in `app/layout.tsx` and
exposed to `<html>` via the `--font-geist-sans` / `--font-geist-mono` CSS
variables. Tailwind v4's `@theme inline` in `app/globals.css` references
those variables for `--font-sans` / `--font-mono`, so the `font-sans` and
`font-mono` utilities resolve to the actual Geist webfont.

## Important Product Rules

These are hard rules for this hackathon iteration:

- **Hack The Bug is for citizens of the Republic of Azerbaijan only.** Copy
  must reflect this. Do not write phrases like "global community", "100+
  countries", "worldwide researchers", or anything that suggests a
  multi‑country audience. Researchers in mock data are all AZ.
- **Verification is planned, not active.** Always describe SİMA / identity
  verification with "coming soon", "planned", "demo only", "currently a
  demo", etc. Never write copy that implies verification is live or that
  any current account is verified for real.
- **All visible UI text goes through the i18n dictionary.** Add new keys to
  `lib/i18n/dictionary.ts` (both `en` and `az` blocks), then read them via
  `useT()`. Don't hard‑code English (or Azerbaijani) strings in pages or
  components. Mock data values (program names, organization names, industry
  names, weakness types) stay as data and are not translated.
- **Do not add a real backend.** No API routes, no server actions that hit
  real services. Anything "submit"/"save" stays mocked.
- **Do not add real auth libraries.** No NextAuth, Clerk, Supabase Auth, etc.
  The current `lib/auth/*` is a deliberate **mock** for demoing role
  separation only — it stores the session in `localStorage`, has no
  cryptographic signing, and is bypassed by any browser dev tools user. Do
  not bolt feature work on top of it that would require it to be secure.
- **Researcher and organization dashboards must remain separate.** Add new
  protected pages by composing `RoleGate` (or, for a whole subtree, a
  route‑segment `layout.tsx` that wraps its children in `RoleGate`). Never
  show one role's data inside the other role's surface.
- **Do not add a real database.** No Postgres/SQLite/Mongo wiring. State lives
  in `lib/mock-data.ts` (or `useState` for in‑page state). Schema planning
  for the future backend pass lives in `DATABASE_PLAN.md`.
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
- **Russian as a third locale.** EN + AZ already shipped via the local i18n
  system; adding `ru` is a matter of adding entries to `lib/i18n/dictionary.ts`
  and the `LOCALES` array.

## Last Actions

### 2026‑04‑26 — Fix locale-date hydration mismatch via `<FormattedDate>`

- **What:** Dates rendered via `toLocaleDateString('az-AZ', …)` produced a
  hydration mismatch — Node.js's bundled ICU data falls back to `M04 20`
  for `az-AZ`, but the browser renders `20 apr`. Added
  `components/formatted-date.tsx` which renders `en-US` on the server and
  on first client paint, then swaps to the user's locale after a
  `useEffect` mount flag. Replaced all four user-visible locale-date call
  sites (program card, program detail header, program detail updates
  timeline, organization dashboard recent-reports column) with
  `<FormattedDate>`.
- **Why:** Hydration warnings break the demo's polish and force React to
  re-render the entire affected subtree on the client. Centralizing the
  date formatting also makes it easy to handle future Intl differences
  (relative time, calendars, etc.) in one place.
- **Files touched:** added `components/formatted-date.tsx`. Modified
  `components/program-card.tsx`, `app/programs/[slug]/page.tsx`,
  `app/dashboard/organization/page.tsx`, `MEMORY.md`. Each updated page /
  component switched its `useLocale()` import to `useT()` since the
  `locale` field is no longer needed at the call site.
- **Verification:** `pnpm build` succeeds, all 9 routes prerender. `pnpm
  exec tsc --noEmit` runs clean. Browser-side: reload `/` and watch the
  Recent / Featured Programs grid — no hydration warning, dates briefly
  show in `en-US` then swap to `az-AZ` ("20 apr").
- **Next step:** none — the fix is local. Future locale-aware formatting
  (numbers, relative time) should follow the same pattern: format with a
  Node-safe locale on the server, swap after mount.

### 2026‑04‑26 — Demo login + role-based dashboard separation + DB plan

- **What:** Added the first cut of authentication and role-based access for
  the demo. (1) New types: `User`, `UserRole`, `Organization`, `Session` in
  `lib/types.ts`. (2) Two demo accounts in `lib/auth/mock-users.ts`:
  `researcher@hackthebug.demo / researcher123` (linked to researcher #1
  CyberNomad) and `org@hackthebug.demo / org123` (linked to organization
  `org-caspianbank` CaspianBank). (3) `AuthProvider` / `useAuth` /
  `dashboardPathForRole` in `lib/auth/auth-provider.tsx` — session in
  `localStorage` under `htb-session`, with `status: 'loading' |
  'authenticated' | 'unauthenticated'` so consumers know when storage has
  been read. (4) Provider mounted in `app/layout.tsx` inside
  `LocaleProvider`. (5) New `/login` page with branded form, EN/AZ
  validation messages, error states, demo creds card with one-click fill,
  honors `?next=…` redirect, gracefully handles already-signed-in users.
  Wrapped in `Suspense` so SSG works alongside `useSearchParams`. (6)
  `RoleGate` component in `components/role-gate.tsx`; loading spinner
  while session resolves, redirect to `/login?next=…` for anonymous,
  inline "Access denied" card for wrong-role with link to user's own
  dashboard + logout. (7) `app/dashboard/researcher/layout.tsx` and
  `app/dashboard/organization/layout.tsx` wrap their respective dashboards
  in the gate without touching the page bodies. (8) `Navigation`
  rewritten as auth-aware: anonymous → Login button + dashboard dropdown
  shows both views (each leading to /login on click); authenticated →
  user pill (initials avatar + name + role) with My-dashboard / Logout
  dropdown, primary nav shows only "My dashboard" link to the user's
  role. (9) Dictionary extended with login + role + access-denied keys
  in both EN and AZ. (10) `DATABASE_PLAN.md` written: 6-table Postgres
  schema (users, researchers, organizations, programs, reports,
  sessions), CHECK constraints, RBAC rules, sample seed for the two
  demo accounts, migration checklist, and explicit security notes.
- **Why:** The user asked to start preparing for a small test database
  setup with one researcher + one organization, and to add a login page
  with role-based dashboard separation. The mock auth is the smallest
  thing that demonstrates the separation end-to-end without standing up
  a real backend; the `DATABASE_PLAN.md` documents the path from this
  demo to a real backend so the next iteration starts informed.
- **Files touched:** added `lib/auth/mock-users.ts`,
  `lib/auth/auth-provider.tsx`, `app/login/page.tsx`,
  `components/role-gate.tsx`, `app/dashboard/researcher/layout.tsx`,
  `app/dashboard/organization/layout.tsx`, `DATABASE_PLAN.md`. Modified
  `lib/types.ts`, `lib/i18n/dictionary.ts`, `app/layout.tsx`,
  `components/navigation.tsx`, `MEMORY.md`, `CLAUDE.md`. No existing
  dashboard page bodies were changed — gating happens via the new
  route-segment layouts.
- **Verification:** `pnpm build` succeeds, all 9 routes prerender
  (including `/login`). `pnpm exec tsc --noEmit` runs clean (0 errors).
  Browser verification of the actual login flow + cross-role redirect
  behavior + logout behavior still needs a manual `pnpm dev` pass.
- **Next step:** spot-check the auth flow end-to-end in a browser (log in
  as each demo account, verify cross-role access denied, log out, verify
  redirect to /login). When real backend work begins, follow the
  migration checklist in `DATABASE_PLAN.md > section 5`.

### 2026‑04‑26 — i18n (EN/AZ) + Azerbaijani‑citizens‑only positioning

- **What:** Built a dependency‑free i18n system (`lib/i18n/dictionary.ts` with
  flat‑key EN + AZ entries; `lib/i18n/locale-provider.tsx` exposing
  `LocaleProvider`, `useLocale`, `useT`). Mounted the provider in
  `app/layout.tsx` with default locale `'az'`, persisted to `localStorage`
  under `htb-locale`, and synced `<html lang>` via effect. Added an EN/AZ
  toggle (`components/locale-switcher.tsx`) to the navigation desktop bar
  and mobile drawer. Routed every visible UI string in the navigation,
  footer, badges, program card, report submission modal, and all 7 pages
  (home, programs list, program detail, leaderboard, about, both
  dashboards) through the dictionary. Re‑wrote the product narrative across
  every page to make Azerbaijani‑citizens‑only positioning explicit, and
  added planned/demo language wherever SİMA / verification appears. Updated
  the 5 non‑AZ researchers in `lib/mock-data.ts` so all 10 are now AZ‑based.
- **Why:** The user asked for full EN/AZ language support and a clear
  AZ‑citizens‑only product stance. Both required a small i18n layer plus a
  copy pass across every page; the mock data change was needed so the
  leaderboard and dashboards don't contradict the new positioning. SİMA
  language was tightened so nothing reads as "verification is live".
- **Files touched:** added `lib/i18n/dictionary.ts`,
  `lib/i18n/locale-provider.tsx`, `components/locale-switcher.tsx`. Modified
  `app/layout.tsx`, `app/page.tsx`, `app/programs/page.tsx`,
  `app/programs/[slug]/page.tsx`, `app/leaderboard/page.tsx`,
  `app/about/page.tsx`, `app/dashboard/researcher/page.tsx`,
  `app/dashboard/organization/page.tsx`, `components/navigation.tsx`,
  `components/footer.tsx`, `components/severity-badge.tsx`,
  `components/status-badge.tsx`, `components/program-card.tsx`,
  `components/report-submission-modal.tsx`, `lib/mock-data.ts`,
  `MEMORY.md`, `CLAUDE.md`.
- **Verification:** `pnpm build` succeeds (8/8 routes prerender). `pnpm exec
  tsc --noEmit` runs clean (0 errors). Browser verification of the toggle
  itself, RTL/Latin‑extended characters in headers, and any text overflow
  on small screens still needs a manual `pnpm dev` pass.
- **Next step:** spot‑check the demo in a browser at desktop and ≤640px;
  consider adding `ru` (Russian) when needed — only requires a new dict
  block and a `LOCALES` extension.

### 2026‑04‑26 — Cleanup pass: resolved all eight pre‑existing issues

- **What:** (1) Rewrote `app/leaderboard/page.tsx` against the actual
  `Researcher` shape — fixes the runtime crash. (2) Removed the duplicate
  `<Navigation>` / `<Footer>` + `min-h-screen / pt-24` shell from `/about`
  and `/leaderboard` so the layout's wrappers are the only ones. (3)
  Realigned `app/about/page.tsx` to the Azerbaijan / hackathon‑prototype
  framing — hero copy, stats now driven by `platformStats`, timeline is the
  Q4‑2025 → Q4‑2026 roadmap, team replaced with an "AZCON Hackathon — team
  Holberton" Roles grid (ENG / DES / SEC / PRD). (4) Replaced
  `hsl(var(--TOKEN))` with `var(--TOKEN)` and used
  `color-mix(in oklch, var(--TOKEN) 20%, transparent)` for alpha in both
  dashboards so the oklch tokens render. (5) Wired Geist via
  `next/font` with `variable: '--font-geist-sans'` /
  `'--font-geist-mono'`, applied both to `<html>`, and pointed `@theme
  inline` at those vars in `app/globals.css`. (6) Deleted the entire dead
  toast surface (`hooks/use-toast.ts`, `components/ui/use-toast.ts`,
  `components/ui/toast.tsx`, `components/ui/toaster.tsx`,
  `components/ui/sonner.tsx`) and the duplicate
  `components/ui/use-mobile.tsx` — sidebar still uses `hooks/use-mobile.ts`.
  (7) Deleted `styles/globals.css` and the now‑empty `styles/` directory.
  (8) Renamed `package.json#name` from `my-project` to `hackthebug`.
- **Why:** All eight defects were pre‑existing in the initial commits and
  documented under "Known issues" by the prior ingestion entry. The
  leaderboard one was a hard runtime crash; the rest were polish or
  correctness items blocking a confident hackathon demo.
- **Files touched:** modified `app/leaderboard/page.tsx`,
  `app/about/page.tsx`, `app/dashboard/researcher/page.tsx`,
  `app/dashboard/organization/page.tsx`, `app/layout.tsx`,
  `app/globals.css`, `package.json`, `MEMORY.md`. Deleted
  `hooks/use-toast.ts`, `components/ui/use-toast.ts`,
  `components/ui/toast.tsx`, `components/ui/toaster.tsx`,
  `components/ui/sonner.tsx`, `components/ui/use-mobile.tsx`,
  `styles/globals.css`, and the `styles/` directory.
- **Next step:** verify in the browser per the plan's Verification section,
  then move on to the new "Next Recommended Actions" item 1 (tighter
  empty/loading states) or take user direction.

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

1. **Manually spot-check the auth flow.** Visit `/login`, sign in as each
   demo account, verify the right dashboard renders, try to access the
   other dashboard URL directly and confirm the access-denied card shows,
   log out and confirm redirect to `/login`.
2. **Hook the report submission modal to the current researcher.** The
   modal currently writes to nothing; once we want a real persisted demo,
   the natural seam is `useAuth().session.researcherId` → keep state in a
   client `localStorage` table to mirror the researcher's "own" reports.
3. **Optional small polish:** the researcher dashboard greeting still
   reads `currentResearcher = researchers[0]` directly — switch it to
   look up by `useAuth().session.researcherId` so the greeting follows
   the session.
4. **Tighten empty/loading states across dashboards** (already on the
   list pre-auth-pass). Add skeletons for first paint, especially while
   `RoleGate` is in `'loading'`.
5. **When backend work starts:** follow the migration checklist in
   `DATABASE_PLAN.md > section 5`. The session shape exposed by
   `useAuth()` is the public seam — keep it stable so pages don't churn.
