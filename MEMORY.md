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

- **The frontend is now wired to Supabase.** Live data (organizations,
  programs, scopes, rewards, reports, profiles) flows through
  `lib/supabase/queries/*` and the hooks in `lib/data/hooks.ts`. Auth
  uses Supabase Auth (`signInWithPassword` + cookie-backed session via
  `@supabase/ssr`). No SİMA / identity verification yet, no real
  payments.
- **Auth runs through Supabase Auth.** `lib/auth/auth-provider.tsx`
  calls `supabase.auth.signInWithPassword`, subscribes to
  `onAuthStateChange`, and looks up the matching `public.profiles` row
  (by `id`, falling back to `email`) so the existing `useAuth()` hook
  surface (`status`, `session`, `login`, `logout`,
  `dashboardPathForRole`) is unchanged. The two demo accounts live in
  Supabase Auth (`researcher@hackthebug.az` / `Researcher123!` and
  `organization@hackthebug.az` / `Organization123!`) — see "Last Actions"
  for the one-time profile-id alignment SQL. `RoleGate`
  (`components/role-gate.tsx`) still wraps each dashboard via a tiny
  route-segment `layout.tsx`. RLS is **not yet enabled** — when you
  enable it, see the policy scaffolding at the bottom of the SQL seed.
- **Domain data lives in Supabase Postgres.** The 13 AZCON Holding
  organizations + 13 programs + scopes + per-severity AZN rewards + 7
  demo reports + timeline events are seeded by the SQL script the user
  ran in the Supabase SQL Editor (mirrors the structure laid out in
  `DATABASE_PLAN.md`). `lib/mock-data.ts` no longer holds programs,
  organizations, researchers, or reports — only static UI constants
  (`platformStats`, `industries`, `weaknessCategories`, dashboard chart
  data, and KPI demo tiles).
- **Live testing of any AZCON program is NOT authorized in this build.**
  Every program card is a demo card, scope items are labelled "Pending
  official authorization", reward ranges (AZN) are explicitly demo /
  planned and never a real bounty commitment, and the program-detail
  page carries a "Pending official authorization" warning banner.
- Submitting a report from `/programs/[slug]` is **now persisted to
  Supabase**. The modal calls `createReport` in
  `lib/supabase/queries/reports.ts`, which inserts into `reports` (status
  `pending`) and writes a matching `submitted` event into
  `report_timeline_events`. The success screen shows the real report
  UUID prefixed `HTB-`. Anonymous users / org-role users see a sign-in
  prompt panel instead of the form (linking to
  `/login?next=/programs/<slug>`).
- "SİMA — coming soon" / "Identity verification is planned" / "Demo
  authentication" appear on the home hero, about page, login page,
  researcher dashboard, organization dashboard, and report submission
  modal as planned/demo language. **Verification is never described as
  active.** The previous global header pill ("AZ citizens only ·
  Verification soon") has been removed — the AZ‑only positioning is
  carried by the home hero, about page, footer, login demo notes, and
  the dashboard verification card instead.
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
- **Notifications:** `sonner` is mounted via
  `components/ui/sonner.tsx` inside `app/layout.tsx`. Use
  `import { toast } from 'sonner'` from any client component
  (`toast.success`, `toast.error`, `toast.message`). Theme is
  locked to dark, position bottom-right.
- **Internationalization:** local, dependency‑free system in `lib/i18n/`
  (`dictionary.ts` with flat‑key EN/AZ + `locale-provider.tsx` with
  `LocaleProvider`/`useLocale`/`useT`). Default locale `'az'`, persisted via
  `localStorage` (`htb-locale`). EN/AZ toggle in `components/locale-switcher.tsx`.
- **Backend:** Supabase Postgres (project URL + anon key in `.env`).
  `@supabase/supabase-js` + `@supabase/ssr`. Browser client is a
  singleton in `lib/supabase/client.ts`; server components / route
  handlers / actions use `lib/supabase/server.ts` which wires Next's
  `cookies()` into the Supabase auth cookie. DB row types are
  hand-written in `lib/supabase/database.types.ts` (regenerate via
  `npx supabase gen types typescript` if/when schema diverges).
- **Data layer:** per-resource query helpers in
  `lib/supabase/queries/*` return rows mapped via
  `lib/supabase/mappers.ts` into the existing app domain types
  (`Program`, `Researcher`, `Report`, …). Pages consume them through
  small `useAsync`-style hooks in `lib/data/hooks.ts` — no extra
  dependency (no SWR / TanStack Query yet).
- **Auth:** Supabase Auth via `@supabase/ssr`.
  `lib/auth/auth-provider.tsx` calls `signInWithPassword`, subscribes
  to `onAuthStateChange`, and resolves the matching `public.profiles`
  row to build the same `Session` shape consumers already use. The
  `useAuth()` API is unchanged so `RoleGate`, navigation, and the login
  page work without edits. `RoleGate` enforces dashboard separation
  client-side. **RLS is not enabled yet** — production must turn it on
  (policy scaffolding lives at the bottom of the SQL seed).
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
│   └── ui/                       # shadcn/ui primitives + sonner.tsx (project-wide
│                                 #   <Toaster /> mounted from app/layout.tsx)
├── lib/
│   ├── types.ts                  # Domain types: Program, Researcher, Report, User, Session, etc.
│   ├── mock-data.ts              # Static UI constants only (platformStats, industries,
│   │                             #   weaknessCategories, dashboard chart data, KPI tiles)
│   ├── utils.ts                  # `cn()`, `formatAZN()`, `formatAZNRange()` helpers
│   ├── i18n/
│   │   ├── dictionary.ts         # Flat-key EN + AZ dictionary, translate() helper, Locale type
│   │   └── locale-provider.tsx   # LocaleProvider + useLocale + useT hooks (localStorage backed)
│   ├── auth/
│   │   ├── mock-users.ts         # `demoCredentials` constants for /login display only
│   │   └── auth-provider.tsx     # Supabase Auth-backed; same useAuth surface as before
│   ├── supabase/
│   │   ├── env.ts                # Reads NEXT_PUBLIC_SUPABASE_URL + anon key (multi-name fallback)
│   │   ├── client.ts             # Singleton browser client (createBrowserClient)
│   │   ├── server.ts             # createServerClient for RSC / route handlers / actions
│   │   ├── database.types.ts     # Hand-written DB row types matching the SQL schema
│   │   ├── mappers.ts            # DB row → app domain type (camelCase / nested shapes)
│   │   └── queries/
│   │       ├── programs.ts       # listPrograms, listFeaturedPrograms, getProgramBySlug
│   │       ├── organizations.ts  # listOrganizations, getOrganizationById
│   │       ├── profiles.ts       # getProfileById/Email, listResearchers
│   │       ├── reports.ts        # listReportsForResearcher / Organization, getReportById, createReport
│   │       └── dashboard.ts      # getResearcherDashboardStats / getResearcherChartData /
│   │                             #   getOrganizationDashboardStats / getOrganizationChartData /
│   │                             #   getOrganizationActivity (KPI + chart aggregators)
│   └── data/
│       ├── hooks.ts              # usePrograms / useProgram / useFeaturedPrograms /
│       │                         #   useResearchers / useResearcherReports /
│       │                         #   useOrganizationReports / useOrganization /
│       │                         #   useResearcherDashboardStats / useResearcherChartData /
│       │                         #   useOrganizationDashboardStats / useOrganizationChartData /
│       │                         #   useOrganizationActivity
│       └── saved-programs.ts     # localStorage-backed bookmark helper for researchers
│                                 #   (useSavedProgramIds + toggleSavedProgram)
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
| `/login`                         | Supabase-backed login form. Redirects to user's dashboard on success; if a `?next=/path` is provided it is honored. | Working  |
| `/register`                      | Two-tab signup (Researcher / Organization). Researcher signup → trigger creates profile; org signup → also creates an organization row + promotes profile. Auto-redirects to the right dashboard. | Working  |
| `/dashboard/researcher`          | Researcher KPI dashboard with charts, recent reports, achievements, SIMA banner, saved + recommended programs. **Wrapped in `RoleGate('researcher')`.** | Working  |
| `/dashboard/organization`        | Org KPI dashboard with trend, severity, pipeline, recent reports, top assets, activity feed, top hackers, **plus a "My programs" widget + Create CTA**. Wrapped in `RoleGate('organization')`. | Working  |
| `/dashboard/organization/programs/new` | Org-only form to publish a new program (name / slug / description / type / status / reward tier / dynamic in-scope rows). Composes program + scopes + reward tiers in three inserts. | Working  |

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
| `ReportSubmissionModal`          | 3‑step dialog: (1) Basic info — title/asset/severity/weakness; (2) Technical — summary/steps/PoC/attachments; (3) Impact & Review — impact/remediation/CVSS/agreement. **Real Supabase insert** via `createReport`; gates the form behind a sign-in prompt for anonymous / org users. Requires `programId` prop in addition to `programName` / `programAssets`. |
| `ThemeProvider`                  | `next-themes` wrapper. **Currently unused** — dark mode is forced in `layout.tsx`.       |
| `components/ui/*`                | shadcn/ui primitives (button, badge, card, dialog, table, tabs, select, input, textarea, checkbox, dropdown‑menu, avatar, etc.). |

## Mock Data

`lib/mock-data.ts` is now down to three small static-UI exports —
every domain entity (programs, organizations, profiles, reports,
scopes, rewards) and every dashboard chart / KPI flows through
Supabase via `lib/supabase/queries/*` + `lib/data/hooks.ts`.

| Export                          | Type                  | Purpose                                                                |
| ------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| `platformStats`                 | `PlatformStats`       | Illustrative numbers for the landing hero / `/about` stats grid (clearly labelled "Demo Data" / "Demo banner" wherever rendered). |
| `weaknessCategories`            | `string[]`            | OWASP/CWE‑style options for the report submission modal.               |
| `industries`                    | `string[]`            | 13 AZCON-aligned categories for the programs filter (Airline / Aviation, Railway / Transport, Maritime / Shipping, Metro / Public Transport, Bus Transport, Shipbuilding, Space / Satellite, Telecommunications, Cloud / Digital Infrastructure, Postal / Logistics, Taxi / Mobility, Broadcasting / TV / Radio, Artificial Intelligence / National AI). |

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
- **The 13 AZCON Holding programs are demo cards only — no live testing
  is authorized.** Programs reference real organizations (AZAL, ADY,
  ASCO, Bakı Metropoliteni, BakuBus, Bakı Gəmiqayırma Zavodu,
  Azərkosmos, Aztelekom, AzInTelecom, Azərpoçt, Bakı Taksi Xidməti,
  Teleradio, Milli Süni İntellekt Mərkəzi). Every program card carries a
  "Pending official authorization" notice on the program detail page,
  scope items use generic category names (no fake demo domains like
  `*.demo`), and **reward ranges (in AZN) are clearly labelled as
  "Demo / planned" — not a real bounty commitment**. The Rewards tab on
  every program page carries a callout stating that values illustrate
  what an officially authorized program could pay. **Do not** add
  language that implies the platform has authorization to test these
  systems, that the listed organizations are currently paying real
  bounties, or that any researcher activity here is sanctioned by the
  listed organization.
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

### 2026‑04‑26 — Live charts everywhere, role‑aware buttons, toasts

- **What:** Both dashboards now read every chart and KPI from
  Supabase. Researcher charts (timeline + severity) come from
  `getResearcherChartData(client, researcherId)` in
  `lib/supabase/queries/dashboard.ts`. Organization charts (trend
  + severity + pipeline + top assets) come from
  `getOrganizationChartData(client, orgId)`; KPI tiles come from
  `getOrganizationDashboardStats(client, orgId)` (incl. an
  avg-triage-hours computed from `report_timeline_events` paired
  by `submitted` → `triaged`). The org "Recent activity" feed is
  driven by `getOrganizationActivity(client, orgId)` which lists
  the most recent `report_timeline_events` joined back to report
  titles. New hooks: `useResearcherChartData`,
  `useOrganizationChartData`, `useOrganizationDashboardStats`,
  `useOrganizationActivity`. Both pages handle loading
  (skeleton block), empty (calm copy in the chart card), and
  error (inline destructive banner with `error.message`).
- **Toast surface:** `sonner` is mounted via a thin
  `components/ui/sonner.tsx` wrapper inside `app/layout.tsx`.
  Toasts are dark-themed to match the rest of the app and
  positioned bottom-right. Used everywhere a button's effect
  isn't immediately visible (bookmark add/remove, share-link
  copied, share failure, "Coming soon" placeholders for
  unimplemented `View All` queues).
- **Saved programs (researcher only, localStorage):**
  `lib/data/saved-programs.ts` adds `useSavedProgramIds`,
  `toggleSavedProgram`, `listSavedProgramIds`, `isProgramSaved`.
  Persists per-profile to `localStorage` under
  `htb-saved-programs:<profileId>`. The researcher dashboard
  "Saved" widget reads from this hook (with proper empty +
  browse-CTA), and the program detail "Bookmark" icon button
  toggles + toasts. **No `saved_programs` table exists** —
  swap call sites when one lands.
- **Share:** the program detail "Share" icon button calls
  `navigator.share` when available, falls back to clipboard +
  success toast (or error toast if the Permissions API blocks
  the write). `AbortError` (user cancellation) is silently
  ignored.
- **Role-aware buttons:**
  - Program detail header — Submit Report becomes a disabled
    "Submitting is for researchers" button for org users; the
    Bookmark icon hides entirely for org users; Share is shown
    to everyone.
  - Home page CTA — "Try Researcher Dashboard" is
    role-aware: for signed-in users it becomes "Go to my
    dashboard" pointing to the right path
    (`dashboardPathForRole(session.role)`); anonymous users
    see the original copy and land on `/login` (where the
    redirect-to-dashboard flow takes over).
- **Dashboard "View all" buttons:** the org and researcher
  dashboards' `View all` buttons now fire a
  `Coming soon` toast — there's no full-list / triage page
  yet, so the click is honest about it instead of silently
  doing nothing. Saved + Recommended widgets' `View all` /
  `Browse all` buttons link to `/programs` (real navigation).
- **Removed:** every chart-related export in `lib/mock-data.ts`
  (`severityDistribution`, `reportsTimeline`,
  `researcherReportsTimeline`, `topAttackedAssets`,
  `recentActivity`, `orgDashboardStats`) and the dead types
  `OrgDashboardStats`, `ChartDataPoint`, `TimelineDataPoint`
  in `lib/types.ts`. The org dashboard's "No Critical Alerts"
  empty-state demo card was deleted (it was a placeholder, not
  a real surface). Pipeline now uses real `status.*` i18n keys
  instead of fake "New / Triaging / Validating / Fixing /
  Resolved" labels.
- **Why:** The user asked for the platform to be "fully
  connected and role-aware" — every chart driven by Supabase,
  every button doing something useful, role-only actions
  conditionally rendered. The dashboards were the biggest
  remaining mock surface and the program detail page had three
  unwired buttons.
- **Files touched:** added `lib/data/saved-programs.ts`,
  `components/ui/sonner.tsx`. Modified
  `lib/supabase/queries/dashboard.ts`, `lib/data/hooks.ts`,
  `lib/types.ts`, `lib/mock-data.ts`, `lib/i18n/dictionary.ts`,
  `app/layout.tsx`, `app/page.tsx`,
  `app/programs/[slug]/page.tsx`,
  `app/dashboard/researcher/page.tsx`,
  `app/dashboard/organization/page.tsx`, `MEMORY.md`,
  `CLAUDE.md`. No files removed.
- **Verification:** `npm run build` succeeds, all 11 routes
  prerender. Recommended browser pass:
  1. Sign in as `researcher@hackthebug.az` → visit
     `/dashboard/researcher`. Both charts should render with
     real data (or the empty/error states, never the old mock
     numbers).
  2. From `/programs/azal` (or any program), click the
     bookmark icon — toast confirms; reload
     `/dashboard/researcher` and the program appears in
     "Saved Programs". Toggle off and the widget falls back
     to its empty state.
  3. Click Share — `navigator.share` opens on mobile
     browsers; on desktop the URL is copied + a toast
     confirms.
  4. Sign out, sign in as `organization@hackthebug.az` →
     `/dashboard/organization`. KPI tiles, area chart,
     severity pie, pipeline bar, top assets list, and
     activity feed should all reflect real `reports` rows
     belonging to the org's programs.
  5. Visit `/programs/azal` while signed in as the
     organization — Submit Report is a disabled
     "Submitting is for researchers" button; the Bookmark
     icon is gone; Share still works.
- **Limitations / next steps:**
  - No real reports detail / triage page yet — the org `View
    all` and researcher `View all` toast "coming soon"
    instead of navigating. Next iteration: build
    `/programs/[slug]/reports/[id]`.
  - Saved programs are localStorage-only (no
    `saved_programs` table). Acceptable for the demo.
  - `platformStats` on `/` and `/about` is still illustrative
    (clearly labelled "Demo Data"). Fine for landing copy
    but a future pass could replace it with `count(*)`s.
  - Achievements widget on the researcher dashboard remains
    static — needs a `badges` table and earn-rules to be real.

### 2026‑04‑26 — Researcher dashboard stats from Supabase

- **What:** The six KPI tiles at the top of `/dashboard/researcher`
  (Submitted / Accepted / Pending / Total rewards / Reputation /
  National rank) no longer come from `researcherDashboardStats`
  (the static `{58, 42, 3, 28500, 98, 1}` mock). They are now
  derived per signed-in researcher from Supabase by a new query
  `getResearcherDashboardStats(client, researcherId)` in
  `lib/supabase/queries/dashboard.ts`, exposed through a new
  `useResearcherDashboardStats(researcherId)` hook in
  `lib/data/hooks.ts`. The query runs three queries in parallel:
  the researcher's own profile (for `points` + `reputation`),
  `reports` filtered by `researcher_id` (for `total / accepted /
  pending / sum(reward_amount)`), and the `profiles` list ordered
  by `points` desc (for rank via `findIndex`). Statuses used:
  Accepted = `['resolved', 'rewarded']`; Pending review = `['pending',
  'triaged']`. Reputation prefers `profiles.reputation`; if it's 0
  or missing the page falls back to `Math.round(accepted /
  totalReports * 100)` (and 0 when there are no reports).
- **UI:** While stats are loading, every value renders as `—`
  (no misleading static numbers). If the query fails, an inline
  destructive banner with the error message renders above the
  grid; the cards continue to show `—`. Card layout, typography,
  icons, and animation timings are unchanged. EN + AZ keys for
  the new error title were added to the dictionary.
- **Removed:** `researcherDashboardStats` constant (from
  `lib/mock-data.ts`) and the now-unused `DashboardStats` type
  (from `lib/types.ts`). The org dashboard's `orgDashboardStats`
  + `OrgDashboardStats` are unchanged — only the researcher tiles
  flipped to live data.
- **Why:** The user asked for the researcher dashboard cards to
  reflect the real Supabase row for the signed-in researcher
  rather than constants. Calculating from the existing schema
  (no new columns) keeps the change isolated to the data layer
  and one page.
- **Files touched:** added `lib/supabase/queries/dashboard.ts`.
  Modified `lib/data/hooks.ts`, `lib/types.ts`,
  `lib/mock-data.ts`, `lib/i18n/dictionary.ts`,
  `app/dashboard/researcher/page.tsx`, `MEMORY.md`. No files
  removed.
- **Verification:** `npm run build` succeeds, all 11 routes
  prerender. Browser pass to confirm: sign in as
  `researcher@hackthebug.az` and visit
  `/dashboard/researcher` — Submitted / Accepted / Pending /
  Total rewards should match the seeded `reports` rows for that
  researcher (the 7 demo reports re-linked by the auth-setup
  SQL); Reputation should show the `profiles.reputation` value
  (`98` for the seeded CyberNomad); National rank should be
  `#1` if no other researcher has higher `points`.
- **Next step:** apply the same treatment to the organization
  dashboard's `orgDashboardStats` so every dashboard tile is
  live; consider adding a `useResearcherDashboardStats().refetch`
  call from `report-submission-modal.tsx` `onSubmitted` so the
  cards update after a fresh report without a manual reload.

### 2026‑04‑26 — Real report submission (Supabase persist)

- **What:** The 3-step "Submit Vulnerability Report" modal now persists
  to Supabase instead of `setTimeout`. (1) Added
  `createReport(client, params)` to `lib/supabase/queries/reports.ts` —
  inserts into `reports` (status `pending`) with the form's title /
  severity / weakness / asset / summary / steps / PoC / impact /
  remediation / CVSS, then best-effort writes a `submitted` event into
  `report_timeline_events`. Returns the freshly-mapped `Report` so the
  caller can show the real UUID. (2) `components/report-submission-modal.tsx`
  now takes a `programId: string` prop, calls `useAuth()` +
  `getSupabaseClient()`, replaces the setTimeout mock with a real
  `createReport(...)` call wrapped in try/catch (errors surface as an
  inline destructive panel below the demo notice on step 3), shows the
  real report UUID prefixed `HTB-` on the success screen, and gates
  the form for anonymous / org users with a sign-in panel
  (`<SignInPrompt>` subcomponent) linking to
  `/login?next=<current path>`. (3) `app/programs/[slug]/page.tsx`
  passes `programId={program.id}` alongside the existing
  `programName` / `programAssets`. (4) i18n: refreshed `report.demo.notice`
  and `report.success.body` to honestly say the report is saved to the
  demo DB; renamed `report.success.idLabel` from "Demo Report ID" →
  "Report ID"; added EN + AZ keys for `report.signin.required.{title,
  body, cta}`, `report.signin.wrongRole.{title, body, cta}`, and
  `report.error.{title, body, notResearcher}`.
- **Why:** The user reported that submitting a report did not hit
  Supabase, so reports were never created in the DB. The modal had been
  shipping with a `setTimeout(2000)` placeholder since the very first
  commit; this swaps in a real insert against the existing
  `reports` + `report_timeline_events` schema. Gating the form behind
  sign-in keeps anonymous traffic from seeing a confusing "Submit"
  button that would just fail under RLS.
- **Files touched:** modified `lib/supabase/queries/reports.ts`,
  `components/report-submission-modal.tsx`,
  `app/programs/[slug]/page.tsx`, `lib/i18n/dictionary.ts`,
  `MEMORY.md`. No files added or removed.
- **One-time Supabase setup the user must run** so the insert isn't
  blocked by RLS:
  ```sql
  -- Researchers can insert reports for themselves.
  DROP POLICY IF EXISTS "researcher_inserts_own_reports" ON reports;
  CREATE POLICY "researcher_inserts_own_reports"
    ON reports FOR INSERT TO authenticated
    WITH CHECK (researcher_id = auth.uid());

  -- Researchers can write timeline events for their own reports.
  DROP POLICY IF EXISTS "researcher_inserts_own_report_timeline_events"
    ON report_timeline_events;
  CREATE POLICY "researcher_inserts_own_report_timeline_events"
    ON report_timeline_events FOR INSERT TO authenticated
    WITH CHECK (
      actor_id = auth.uid()
      AND report_id IN (SELECT id FROM reports WHERE researcher_id = auth.uid())
    );
  ```
  (If RLS is currently disabled on `reports` /
  `report_timeline_events`, the insert already works — these policies
  only matter once RLS is on, which is the production target.)
- **Verification:** `npm run build` succeeds, all 11 routes prerender.
  Browser: sign in as `researcher@hackthebug.az`, open any program,
  click "Submit Report", complete the 3 steps, submit — success screen
  should show a `HTB-XXXXXXXX` ID and the report should appear in
  `/dashboard/researcher` after a refresh. Anonymous browser: clicking
  "Submit Report" should show a "Sign in to submit a report" panel
  with a link to `/login?next=/programs/<slug>`.
- **Next step:** when desired, build a `/programs/[slug]/reports/[id]`
  detail page so the "View Report" link in the dashboard goes
  somewhere; or add a researcher-side `useResearcherReports`
  `refetch()` callback so the dashboard list updates automatically
  without a manual refresh.

### 2026‑04‑26 — Hardened session, registration, multi-program orgs

- **What:** (1) Auth bootstrap is now bullet-proof: every async path in
  `lib/auth/auth-provider.tsx` is wrapped in try/catch, an 8-second
  safety timeout flips the provider to `'unauthenticated'` if neither
  `getSession()` nor `onAuthStateChange` resolves, and the new
  `refresh()` method on `useAuth()` re-pulls the profile after sign-up
  / profile edits. `RoleGate` now shows a "still working on it…"
  message + a manual reload button after 4 seconds of loading.
  (2) New `/register` page (`app/register/page.tsx`) with Researcher
  and Organization tabs. Researcher signup calls
  `supabase.auth.signUp` with display_name / handle metadata and lets
  the `on_auth_user_created` trigger create the profile row;
  organization signup also calls `createOrganization` and then
  `completeOrganizationProfile` to promote the freshly-created
  researcher profile into an org profile linked to the new org.
  Confirmation-email path is handled gracefully. (3) Multi-program
  per organization: the schema already supported it; added
  `createProgramWithScopesAndRewards` in
  `lib/supabase/queries/programs.ts` (composes program + in-scope rows
  + the COMMON out-of-scope baseline + 5 severity reward rows from a
  chosen LOW/STANDARD/HIGH/TOP tier), `listProgramsForOrganization`,
  and a `useOrganizationPrograms` hook. New page
  `app/dashboard/organization/programs/new/page.tsx` is a full
  publishing form (name + slug + description + type + status + tier +
  dynamic in-scope rows). The org dashboard now shows a "My programs"
  widget with a Create button next to the org-name chip.
  (4) Navigation: anonymous users see both "Sign up" (ghost) and
  "Log in" buttons (desktop + mobile drawer). Sign-up link added to
  the i18n dictionary alongside the full register / create-program /
  my-programs key sets in EN and AZ. (5) `lib/utils.ts` got a small
  `slugify()` helper that handles Azerbaijani diacritics
  (ə → e, ş → s, etc.) so org / program names produce clean URLs.
- **Why:** The user reported `/dashboard/*` getting stuck on
  "Checking your session…" — that was the bootstrap hanging on a
  thrown error inside the profile lookup. They also asked for a real
  registration flow and for orgs to publish many programs (what AZAL
  would actually do with its WebApp + Mobile + API surfaces).
- **Files touched:** added `app/register/page.tsx`,
  `app/dashboard/organization/programs/new/page.tsx`. Modified
  `lib/auth/auth-provider.tsx`, `lib/utils.ts`,
  `lib/i18n/dictionary.ts`, `lib/data/hooks.ts`,
  `lib/supabase/queries/profiles.ts`,
  `lib/supabase/queries/programs.ts`,
  `lib/supabase/queries/organizations.ts`,
  `components/role-gate.tsx`, `components/navigation.tsx`,
  `app/dashboard/organization/page.tsx`, `MEMORY.md`, `CLAUDE.md`.
- **One-time Supabase setup the user must run:**
  1. **Disable email confirmation** for the demo:
     Dashboard → Authentication → Providers → Email → toggle
     "Confirm email" OFF (otherwise the register page shows the
     "check your email" notice instead of auto-signing in).
  2. **Add the auto-create-profile trigger** (so signUp
     automatically creates a `public.profiles` row):
     ```sql
     CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
     RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
     BEGIN
       INSERT INTO public.profiles (id, email, role, display_name, handle, country, country_code)
       VALUES (
         NEW.id,
         NEW.email,
         'researcher',
         COALESCE(NULLIF(NEW.raw_user_meta_data->>'display_name', ''),
                  split_part(NEW.email, '@', 1)),
         NULLIF(NEW.raw_user_meta_data->>'handle', ''),
         COALESCE(NULLIF(NEW.raw_user_meta_data->>'country', ''), 'Azerbaijan'),
         COALESCE(NULLIF(NEW.raw_user_meta_data->>'country_code', ''), 'AZ')
       );
       RETURN NEW;
     END;
     $$;

     DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
     CREATE TRIGGER on_auth_user_created
       AFTER INSERT ON auth.users
       FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();
     ```
  3. **Add INSERT / UPDATE RLS policies** so registration and
     program publishing actually work under RLS:
     ```sql
     -- Organizations: any authenticated user can create one (org sign-up).
     DROP POLICY IF EXISTS "authenticated_inserts_organizations" ON organizations;
     CREATE POLICY "authenticated_inserts_organizations"
       ON organizations FOR INSERT TO authenticated WITH CHECK (TRUE);

     -- Profiles: a user can update only their own row (org-signup promotes
     -- the auto-created profile from researcher → organization).
     DROP POLICY IF EXISTS "profiles_self_update" ON profiles;
     CREATE POLICY "profiles_self_update"
       ON profiles FOR UPDATE TO authenticated
       USING (id = auth.uid())
       WITH CHECK (id = auth.uid());

     -- Programs: an authenticated user can insert programs for their org.
     DROP POLICY IF EXISTS "org_inserts_own_programs" ON programs;
     CREATE POLICY "org_inserts_own_programs"
       ON programs FOR INSERT TO authenticated
       WITH CHECK (
         organization_id = (
           SELECT organization_id FROM profiles WHERE id = auth.uid()
         )
       );

     -- Program scopes: insert for programs of own org.
     DROP POLICY IF EXISTS "org_inserts_own_program_scopes" ON program_scopes;
     CREATE POLICY "org_inserts_own_program_scopes"
       ON program_scopes FOR INSERT TO authenticated
       WITH CHECK (
         program_id IN (
           SELECT id FROM programs
           WHERE organization_id = (
             SELECT organization_id FROM profiles WHERE id = auth.uid()
           )
         )
       );

     -- Program rewards: same.
     DROP POLICY IF EXISTS "org_inserts_own_program_rewards" ON program_rewards;
     CREATE POLICY "org_inserts_own_program_rewards"
       ON program_rewards FOR INSERT TO authenticated
       WITH CHECK (
         program_id IN (
           SELECT id FROM programs
           WHERE organization_id = (
             SELECT organization_id FROM profiles WHERE id = auth.uid()
           )
         )
       );
     ```
- **Verification:** sign in with the existing demo accounts to confirm
  the dashboards load (no more "Checking your session…" hang). Then
  go to `/register`, sign up as a new organization with a fresh
  email; the page should auto-redirect to
  `/dashboard/organization`. Hit "Create program", fill the form,
  submit — it should land on the new program's `/programs/<slug>`
  page with scopes + rewards populated. The new program also shows
  up in the public `/programs` directory and on the org dashboard's
  "My programs" widget.

### 2026‑04‑26 — Supabase integration (data + auth)

- **What:** Wired the entire frontend to Supabase. (1) Foundation:
  `lib/supabase/{env,client,server,database.types,mappers}.ts` plus
  per-resource query helpers in `lib/supabase/queries/{programs,
  organizations,profiles,reports}.ts`. The browser client is a
  singleton via `@supabase/ssr`; the server client wires Next's
  `cookies()` into the auth cookie. Hand-written `Database` types
  match the SQL seed. Mappers convert snake_case rows to the existing
  camelCase app types so no component shapes had to change. (2) Data
  hooks: `lib/data/hooks.ts` exposes `usePrograms`,
  `useFeaturedPrograms`, `useProgram`, `useResearchers`,
  `useResearcherReports`, `useOrganizationReports`, `useOrganization`
  — small `useAsync` wrappers, no extra dependency. (3) Auth:
  `lib/auth/auth-provider.tsx` rewritten to use Supabase Auth
  (`signInWithPassword` + `onAuthStateChange`), resolving the matching
  `public.profiles` row to keep the same `Session` shape and
  `useAuth()` surface so `RoleGate` / navigation / login page worked
  without edits. (4) Pages migrated: `app/page.tsx` (featured
  programs), `app/programs/page.tsx` (directory + skeleton loading
  state), `app/programs/[slug]/page.tsx` (detail + similar programs +
  full skeleton), `app/leaderboard/page.tsx` (researchers),
  `app/dashboard/researcher/page.tsx` (uses
  `useAuth().session.displayName` for the welcome line + saved /
  recommended programs + the user's own reports), and
  `app/dashboard/organization/page.tsx` (looks up org name via
  `useOrganization(session.organizationId)` + fetches reports against
  the org's programs). (5) `lib/mock-data.ts` slimmed to static UI
  constants only — `programs`, `organizations`, `researchers`, and
  `reports` arrays are gone. (6) `lib/auth/mock-users.ts` reduced to
  the `demoCredentials` constants used for /login display, with the
  new `.az` emails. (7) The `login` and `logout` callbacks are now
  async; `app/login/page.tsx` and `components/navigation.tsx` updated
  accordingly.
- **Why:** Database is in Supabase now; the app should read from it.
  Keeping the existing `lib/types.ts` shapes via mappers meant the
  large component layer didn't need rewriting; a tiny `useAsync` hook
  family avoided pulling in SWR or TanStack Query for the hackathon.
- **Files touched:** added `lib/supabase/env.ts`,
  `lib/supabase/client.ts`, `lib/supabase/server.ts`,
  `lib/supabase/database.types.ts`, `lib/supabase/mappers.ts`,
  `lib/supabase/queries/programs.ts`,
  `lib/supabase/queries/organizations.ts`,
  `lib/supabase/queries/profiles.ts`,
  `lib/supabase/queries/reports.ts`, `lib/data/hooks.ts`. Modified
  `lib/auth/auth-provider.tsx`, `lib/auth/mock-users.ts`,
  `lib/mock-data.ts`, `app/page.tsx`, `app/programs/page.tsx`,
  `app/programs/[slug]/page.tsx`, `app/leaderboard/page.tsx`,
  `app/dashboard/researcher/page.tsx`,
  `app/dashboard/organization/page.tsx`, `app/login/page.tsx`,
  `components/navigation.tsx`, `MEMORY.md`, `CLAUDE.md`.
- **Setup the user must do once before sign-in works:**
  1. `npm install @supabase/supabase-js @supabase/ssr`
  2. In Supabase Dashboard → Authentication → Users → Add user, create
     `researcher@hackthebug.az` (password `Researcher123!`) and
     `organization@hackthebug.az` (password `Organization123!`), with
     "Auto Confirm User" ON.
  3. Run this one-time SQL in the Supabase SQL Editor to align
     `public.profiles.id` with the freshly-created `auth.users.id`
     values and re-link the seeded reports to the real researcher:
     ```sql
     DO $$
     DECLARE
       v_researcher_id UUID;
       v_org_id UUID;
     BEGIN
       SELECT id INTO v_researcher_id FROM auth.users WHERE email = 'researcher@hackthebug.az';
       SELECT id INTO v_org_id        FROM auth.users WHERE email = 'organization@hackthebug.az';
       IF v_researcher_id IS NULL OR v_org_id IS NULL THEN
         RAISE EXCEPTION 'Create both auth users in Supabase Dashboard first.';
       END IF;
       DELETE FROM profiles WHERE id IN (
         '11111111-1111-1111-1111-111111111111',
         '22222222-2222-2222-2222-222222222222'
       );
       INSERT INTO profiles (id, email, role, display_name, handle, organization_id,
         points, reputation, reports_accepted, reports_submitted, total_rewards, joined_at)
       VALUES
         (v_researcher_id, 'researcher@hackthebug.az', 'researcher', 'CyberNomad',
          'cybernomad', NULL, 12500, 98, 42, 58, 28500, '2025-03-10T00:00:00Z'),
         (v_org_id, 'organization@hackthebug.az', 'organization', 'AZAL Security Team',
          NULL, 'aaaaaaaa-0000-0000-0000-000000000001', 0, 0, 0, 0, 0, '2026-01-15T00:00:00Z');
       UPDATE reports SET researcher_id = v_researcher_id WHERE researcher_id IS NULL;
     END $$;
     ```
- **Verification:** the user should run `npm install` (the two
  packages above), then `npm run build` and `npx tsc --noEmit`. After
  the auth setup above, sign in with either demo account from /login
  and confirm the dashboards render with live data.
- **Next step:** when the demo is happy, enable RLS on every table and
  uncomment the policy block at the bottom of the SQL seed (it follows
  the conventions established by the new auth flow:
  `profiles.id = auth.uid()`, researcher sees own reports, org sees
  reports against programs they own). The frontend code requires no
  changes — RLS is enforced server-side.

### 2026‑04‑26 — Demo AZN reward tiers + simplify dashboard nav label

- **What:** (1) Removed `recognitionOnly?: boolean` from the `Program`
  type and from every program in `lib/mock-data.ts`. (2) Added four
  shared, in-file reward tiers in AZN (LOW / STANDARD / HIGH / TOP) plus
  matching `responseTime` constants; assigned each of the 13 AZCON
  programs to a tier — Aviation/Telecom/Cloud/Railway are HIGH,
  Space/AI are TOP, lower-traffic operators (BakuBus, Bakı Taksi) are
  LOW, the rest are STANDARD. Every program now exposes a real
  `rewardRange` (in AZN) and a 4-row `rewards` table per severity. (3)
  Added two helpers in `lib/utils.ts`: `formatAZN(amount)` and
  `formatAZNRange(min, max)`, both forced to `en-US` digit grouping so
  server and client render identically (no hydration foot-gun). (4)
  Replaced every `$X` currency display in the app with the AZN helper
  output: program card, program detail header + Quick Stats max,
  rewards table, home stats + preview, researcher dashboard total
  rewards + recent reward column + saved-program max badge,
  organization dashboard rewards-paid stat, leaderboard table column +
  total-rewards stat. (5) Added `program.rewards.demoNote` (EN + AZ)
  and a small Info callout above the Rewards table making the
  "demo / planned — not a real bounty commitment" framing explicit.
  Removed the now-dead `programCard.recognition`,
  `program.rewards.recognitionOnlyTitle`,
  `program.rewards.recognitionOnlyBody` keys from both EN and AZ blocks.
  (6) Renamed the dashboard label `nav.user.myDashboard` from
  "My dashboard" / "Mənim panelim" → "Dashboard" / "İdarə paneli";
  same simplification applied to `login.goToDashboard` and
  `roleGate.denied.goToMine`. (7) Updated `programCard.rewards` label
  to "Demo rewards" / "Demo mükafat" and `program.quickStats.maxReward`
  to "Max demo reward" / "Maks. demo mükafat" so the demo framing rides
  along with the value itself. (8) `dashboard.researcher.maxLabel` now
  outputs "{amount} AZN max" / "maks {amount} AZN" instead of the
  literal-`$` template.
- **Why:** The user asked to (a) simplify the "My Dashboard" nav label
  and (b) replace the recognition-only framing with real demo reward
  ranges in AZN, while keeping safety wording so nothing implies a real
  paying program. Tiered reward arrays keep the 13 programs visually
  distinct without duplicating data; the helper centralises currency
  formatting so future tweaks happen in one place; the demo-note
  callout + AZN suffix + "Demo / planned" labels keep the framing
  honest end-to-end.
- **Files touched:** modified `lib/types.ts`, `lib/utils.ts`,
  `lib/mock-data.ts`, `lib/i18n/dictionary.ts`,
  `components/program-card.tsx`, `app/programs/[slug]/page.tsx`,
  `app/page.tsx`, `app/dashboard/researcher/page.tsx`,
  `app/dashboard/organization/page.tsx`, `app/leaderboard/page.tsx`,
  `MEMORY.md`, `CLAUDE.md`. No files added or removed.
- **Verification:** see "Run manually" below — TypeScript and the build
  should both run clean.
- **Next step:** none in particular; the user may want to do a quick
  browser pass to confirm AZN values render correctly across the
  program directory, program detail Rewards tab, both dashboards, and
  the leaderboard.

### 2026‑04‑26 — AZCON Holding org/program rewrite + header pill removal

- **What:** (1) Replaced the 6 fictional programs (CaspianBank, BakuCommerce,
  GovPortal X, AzCloud One, SilkRoute Pay, Karabug Telecom) with **exactly
  13** demo cards mirroring the AZCON Holding portfolio. Each card is
  `recognitionOnly: true`, carries scope items with generic category names
  (Official Website, Customer Portal, Mobile Application, Public API, etc.)
  marked "Pending official authorization", and lists no fabricated demo
  domains. (2) Added a canonical `organizations: Organization[]` export
  in `lib/mock-data.ts` covering all 13 entities with `id` / `slug` /
  `name` / `industry`; removed the duplicate `mockOrganizations` export
  from `lib/auth/mock-users.ts`. (3) Added `recognitionOnly?: boolean` to
  the `Program` type — `ProgramCard` and the program detail header now
  show "Recognition" instead of `$0 - $0`; the Rewards tab now shows a
  recognition‑only callout (Trophy icon + explanatory copy) instead of an
  empty‑zeros table. (4) Added a top‑level "Pending official
  authorization" warning banner above the program detail header card.
  (5) Updated `reports`, `topAttackedAssets`, `recentActivity`, and
  `industries` so they reference the new programs and category labels —
  no fake `.demo` domains anywhere. (6) Switched the demo organization
  user from `org-caspianbank` to `org-azal` (Azərbaycan Hava Yolları),
  displayName "AZAL". (7) The org dashboard chip no longer hard‑codes
  "CaspianBank"; it resolves the org name from
  `useAuth().session.organizationId` against `organizations`. (8) Removed
  the `nav.verificationPill` JSX from both the desktop bar and the
  mobile drawer in `components/navigation.tsx`, and removed the matching
  EN/AZ keys from the dictionary. The AZ‑citizens‑only / SİMA‑coming‑soon
  messaging stays in the home hero, about page, footer, login page, and
  dashboard verification card.
- **Why:** The user asked to switch the demo from generic fictional orgs
  to real AZCON Holding entities — but with a hard safety rule that
  nothing on the platform implies permission to test those organizations'
  real systems. Recognition‑only framing + "pending authorization" copy
  + scope categories (not fake domains) keeps the demo honest. The
  header pill removal cleans up nav real estate without losing the
  AZ‑only / verification‑coming‑soon concept (which still appears in
  more contextually appropriate places).
- **Files touched:** modified `lib/types.ts`, `lib/mock-data.ts`,
  `lib/auth/mock-users.ts`, `lib/i18n/dictionary.ts`,
  `components/program-card.tsx`, `components/navigation.tsx`,
  `app/programs/[slug]/page.tsx`,
  `app/dashboard/organization/page.tsx`, `MEMORY.md`, `CLAUDE.md`. No
  files added or removed.
- **Verification:** see "next step" — the user runs the build manually
  (npm only).
- **Next step:** the user should run **`npm run build`** to confirm the
  rewrite compiles and all 9 routes still prerender. After that, a quick
  `npm run dev` browser pass to confirm: `/` and `/programs` show 13
  cards with "Recognition" labels, `/programs/azal` (and any of the new
  slugs) shows the pending‑authorization banner above the header, the
  Rewards tab shows the recognition‑only callout, the header pill is
  gone, and the organization dashboard chip shows "Azərbaycan Hava
  Yolları" when logged in as the org demo user.

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
2. **Add the two new RLS policies** (see the most recent "Last Actions"
   entry) so report submission also works once RLS is enabled on
   `reports` / `report_timeline_events`.
3. **Build a report detail page** at
   `/programs/[slug]/reports/[id]` so the dashboard "View" link goes
   somewhere meaningful and the receiving organization can read the
   submission body / timeline.
4. **Auto-refresh dashboards after submission.** Add an `onSubmitted`
   callback prop to `ReportSubmissionModal` and pipe the
   `useResearcherReports().refetch()` into it from the program detail
   page when the user is the researcher.
5. **Tighten empty/loading states across dashboards** (already on the
   list pre-auth-pass). Add skeletons for first paint, especially while
   `RoleGate` is in `'loading'`.
6. **When backend work starts:** follow the migration checklist in
   `DATABASE_PLAN.md > section 5`. The session shape exposed by
   `useAuth()` is the public seam — keep it stable so pages don't churn.
