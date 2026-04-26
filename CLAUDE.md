# CLAUDE.md — Working Instructions for Claude in this Repo

> **Read order for every new session:** this file → `MEMORY.md` → the specific
> files relevant to the request. Don't start changing things until you've done
> all three.

---

## 1. Project context (one paragraph)

This repo is **Hack The Bug**, a frontend‑only Next.js demo of a bug bounty /
responsible disclosure platform built **exclusively for citizens of the
Republic of Azerbaijan**. The goal of the current iteration is a polished,
premium hackathon demo — not a production app. There is no backend, no
database, no real payments, **no real SİMA / identity verification (it is
planned, not active)**. The only "auth" is a deliberate mock in `lib/auth/`
with two demo accounts (researcher + organization) that drives role-based
dashboard separation via `RoleGate`; the session lives in `localStorage` and
is **not a security boundary**. Everything else is mocked locally in
`lib/mock-data.ts`. The UI is bilingual (English + Azerbaijani) via a small
local dictionary in `lib/i18n/`; the user toggles language from the navigation
bar and the choice is stored in `localStorage`. See `MEMORY.md` for the full
picture and `DATABASE_PLAN.md` for the planned schema once a real backend
lands.

## 2. Coding rules

- **Edit existing files; don't create new ones unless required.** If a piece
  of UI already exists (e.g., a card, badge, modal), extend it rather than
  forking a parallel version.
- **All visible UI text must go through the i18n dictionary.**
  - Add new keys to BOTH the `en` and `az` blocks in
    `lib/i18n/dictionary.ts`. Use a flat dot‑separated key namespace
    (`area.section.thing`).
  - Read keys via `useT()` from `lib/i18n/locale-provider.tsx`:
    `const t = useT(); return <h1>{t('home.hero.title.line1')}</h1>`.
  - Components that consume `useT()` must be `'use client'`.
  - For interpolation, the dict supports `{var}` placeholders and `t()`
    accepts a vars object: `t('report.description', { program: name })`.
  - For locale‑aware date formatting, use `<FormattedDate>` from
    `components/formatted-date.tsx`. Do **not** call
    `toLocaleDateString('az-AZ', …)` directly inside a component — Node's
    bundled ICU data falls back to `M04 20` while the browser produces
    `20 apr`, causing a hydration mismatch. `FormattedDate` renders
    `en-US` on the server and on first client paint, then swaps after
    mount.
  - **Do not** hard‑code English (or Azerbaijani) strings in pages or
    components. The only exceptions are: brand name `HackTheBug`, mock
    data values (program names, organization names, industry names,
    weakness types, country names, tag values), and developer‑facing
    strings (aria labels for icon‑only buttons are fine to translate when
    needed).
- **Type everything that crosses a component boundary.** Add new fields to
  `lib/types.ts` first, then back them with mock entries in `lib/mock-data.ts`,
  then consume in components.
- **Pages import from `lib/mock-data.ts`. Components don't.** Components take
  props. This keeps the future "swap mock for fetch" diff small and local.
- **Use `cn()` from `lib/utils.ts`** for conditional class strings. Don't
  hand‑concat with template strings.
- **Reach for shadcn primitives** in `components/ui/` before hand‑rolling. If
  one is missing, prefer adding the standard shadcn version with the same
  conventions over a custom implementation.
- **Lucide for icons.** Don't introduce another icon set.
- **Framer Motion for entrance animation only** — fade/slide on mount or on
  viewport enter. Don't animate on every state change; it gets noisy.
- **Stay in TypeScript strict mode.** `next.config.mjs` ignores build errors
  for hackathon convenience — don't rely on that. Compile cleanly.
- **No `any`** unless escaping a known third‑party gap, with a one‑line
  comment explaining why.
- **Don't pull in heavy new dependencies** (>50 KB gzipped) without flagging
  the cost.
- **Comments:** default to none. Only add a comment when the *why* is
  non‑obvious (e.g., a workaround, a constraint that isn't visible from the
  code). Never explain *what* the code does.

## 3. Design rules

The product narrative is "trusted **national** cybersecurity SaaS for
**Azerbaijani** banks, telecoms, government, fintech, and enterprise — open
exclusively to citizens of the Republic of Azerbaijan." Every visual
decision and every line of copy should be defensible against that bar.

### Audience and language rules (non‑negotiable)

- **Hack The Bug is for Azerbaijani citizens only.** Do not write copy that
  implies a global audience, multi‑country presence, "100+ countries",
  "international community", "worldwide researchers", etc. Use national
  framing — "Azerbaijani organizations", "Azerbaijani citizens",
  "national leaderboard", "regional digital ecosystem".
- **Verification is planned, not active.** Always describe SİMA / identity
  verification with "coming soon", "planned", "demo only", "currently a
  demo", "will be required at launch". Never write copy that says
  verification is live, that researchers on the platform are already
  verified for real, or that any submission counts as a real disclosure.
  All "submit", "register", "login" actions stay decorative.
- **Use only fictional organizations and fictional users.** Don't introduce
  real Azerbaijani companies, government bodies, or named individuals.
  Existing fictional names (CaspianBank, BakuCommerce, GovPortal X,
  AzCloud One, SilkRoute Pay, Karabug Telecom; CyberNomad, BugSlayer_AZ,
  etc.) are the canonical set.

### Auth and role separation rules (non-negotiable)

- **Mock auth is temporary.** `lib/auth/*` exists only to demo role
  separation. Don't write any feature that *depends* on it being secure.
  Don't pretend it's real — labels like "Demo authentication", "Demo /
  mock authentication only", and the demo-credentials card on `/login`
  must remain.
- **Researcher and organization dashboards must remain separate.** A
  researcher must never see organization data; an organization must never
  see researcher-only data. When adding a new protected page:
  - Decide which role(s) it belongs to.
  - Place it under `app/dashboard/<role>/…` so the existing
    route-segment `layout.tsx` (which wraps it in `RoleGate(role)`)
    automatically protects it. Or, if it lives elsewhere, wrap its top
    element in `<RoleGate role="…">` directly.
  - Keep the navigation honest — the `Navigation` component already hides
    the wrong dashboard's link when authenticated; if you add a new
    protected route, mirror that pattern.
- **Never claim auth or verification is real.** Don't add copy that says
  "verified user", "you are signed in securely", "your account is
  protected", etc. The current model is a demo, and SİMA verification is
  still planned (see Verification rule above).
- **Don't add real auth libraries** (NextAuth, Clerk, Supabase Auth) in
  this iteration. The migration path lives in `DATABASE_PLAN.md > section 5`.

- **Dark theme only** — `app/globals.css` is the source of truth. The light
  block in that file exists only because Tailwind expects `:root` defaults; the
  dark block is what actually renders (the layout forces `class="dark"`). Don't
  add a "light mode" right now.
- **Use design tokens, not raw colors.** `bg-card`, `text-muted-foreground`,
  `border-border`, `text-primary`, `text-warning`, `text-critical`, etc. If you
  need a new semantic color, add it to the token block.
- **Neon as accent, not as theme.** Cyan `--primary` and violet `--accent` are
  for CTAs, focus states, brand glow, primary chart series, and the gradient
  text utility. Body, surfaces, and most text are quiet near‑neutrals. Avoid
  full neon backgrounds and avoid green "matrix" text.
- **No game/cyberpunk clichés.** No `<glitch>` text, no terminal/typewriter
  effects, no skull icons, no green hacker‑film palette, no "ENTER THE GRID"
  headlines.
- **Density discipline.** 24px section padding on cards (`p-6`), 16px gaps in
  grids, `rounded-xl` for cards, `rounded-lg` for inputs/badges. Section
  spacing is `py-16` to `py-28`.
- **Shared building blocks first.** Use `SectionHeading`, `StatCard`,
  `SeverityBadge`, `StatusBadge`, `ProgramCard` rather than reinventing them
  per page. Extending these benefits every page that already uses them.
- **Animation is decoration, not navigation.** Don't gate content behind motion
  — always render and let `framer-motion` enhance entry.
- **Demo honesty.** Where data is illustrative, label it with a small
  `Badge variant="outline"` (`Demo Data`, `Hackathon Demo`, `Demo Mode`) — keep
  the existing pattern. Don't oversell.

## 4. What NOT to build yet

These are explicitly out of scope for this hackathon iteration. Don't add
them, don't sketch them in code, don't add stub files for them.

- ❌ Real backend (no API routes that call external services, no server
  actions that mutate persisted state).
- ❌ Real database (no Prisma/Drizzle/Supabase/Postgres wiring).
- ❌ Real authentication libraries (no NextAuth/Clerk/Auth.js/Supabase
  Auth). The current `lib/auth/*` mock with a `localStorage` session is
  the entire auth surface for this iteration. Real auth, password hashing,
  session cookies, and SİMA verification land in the backend phase
  (see `DATABASE_PLAN.md`).
- ❌ Real registration flow (the demo accounts in
  `lib/auth/mock-users.ts` are the only logins; "Sign up" CTAs, if added,
  stay decorative).
- ❌ Real payments (Stripe/PayPal/etc.).
- ❌ Real SİMA / e‑imza / digital identity integration.
- ❌ Real email/SMS notifications.
- ❌ File uploads to real storage (the report modal's "upload" stays a UI
  affordance).
- ❌ External analytics/tracking beyond `@vercel/analytics` (already
  prod‑gated).
- ❌ Internationalization frameworks (`next-intl`, `i18next`, `react-intl`,
  i18n routing). EN + AZ are already supported by the local
  dependency‑free system in `lib/i18n/`. To add a third locale (e.g., `ru`)
  add a new dictionary block in `dictionary.ts` and extend `LOCALES` —
  don't pull in a library.
- ❌ Backend secrets / env vars in `.env*` files.

What you *can* do safely: add new mock data, new pages, new components, new
filters/sorts/charts, polish styling, fix bugs, tighten copy.

## 5. How to update `MEMORY.md` after changes

After every meaningful change, append a new dated entry at the **top** of the
"Last Actions" section in `MEMORY.md` using this template:

```markdown
### YYYY‑MM‑DD — Short title

- **What:** one‑sentence summary of the user‑visible change.
- **Why:** the motivation (bug fix, polish, narrative, perf, etc.).
- **Files touched:** bullet list of modified/added/removed files.
- **Next step:** what should happen after this, if anything.
```

Also:

- If the change resolves a "Known issue" listed in `MEMORY.md`, **delete that
  issue from the list** in the same commit. The issues list should always
  reflect *current* state.
- If the change adds a new piece of mock data, a new page, or a new component,
  update the corresponding table in `MEMORY.md` (Existing Pages / Existing
  Components / Mock Data).
- If the change introduces or removes a dependency, update the Tech Stack
  section.
- Keep entries concise. The "Last Actions" log is a working journal, not a
  changelog — three or four bullets is enough.

A "meaningful change" = anything a user could see or that shifts the project's
shape. Pure refactors that don't change behavior or structure don't need an
entry; trivial typo fixes don't either.

## 6. How to keep changes small and safe

- **One topic per change.** Fix the broken leaderboard *or* realign the about
  page, not both at once. Easier to review, easier to revert.
- **Read before you write.** Before editing a component, read every page that
  imports it. The reusable components (`ProgramCard`, `StatCard`,
  `SectionHeading`, badges) are used in multiple places.
- **Prefer the smallest fix.** If one line is wrong, fix one line. Don't take
  the opportunity to "clean up" surrounding code in the same change.
- **Don't delete files you didn't fully audit.** The grep for incoming imports
  takes 5 seconds. Do it before removing `styles/globals.css`,
  `components/theme-provider.tsx`, the legacy toast files, etc.
- **Don't disable warnings to silence them.** If you see a TypeScript or React
  warning, fix the cause. `next.config.mjs` already hides build errors —
  fixing them is even more important, not less.
- **Don't introduce abstractions speculatively.** If you find yourself writing
  a "registry" or "factory" for two cases, just inline the second case.
- **Don't add backwards‑compat shims.** This is a hackathon prototype with no
  external consumers — when you change a function or rename a prop, change all
  callers in the same edit.
- **If a request is ambiguous, ask once before doing it.** "Improve the
  programs page" can mean five things; pick one and confirm before spending
  effort.

## 7. How to run / check the project

Package manager: `pnpm` is the intended choice (the lockfile is the larger
one). `npm` and `bun` should also work.

```bash
pnpm install        # install dependencies
pnpm dev            # start dev server at http://localhost:3000
pnpm build          # production build (note: TS errors are silenced)
pnpm start          # serve the production build
pnpm lint           # eslint
```

Manual check pass after a change:

1. `pnpm dev` and visit at minimum: `/`, `/programs`, `/programs/caspianbank`,
   `/leaderboard`, `/about`, `/dashboard/researcher`,
   `/dashboard/organization`. Watch for runtime errors in the browser console.
2. Resize to mobile width (≤640px) and re‑check the same routes — the mobile
   menu, programs filter drawer, and dashboard stat grids are the most likely
   regressions.
3. Open the report submission modal from `/programs/[slug]`, walk through all
   3 steps, and confirm the success screen appears.
4. If you touched a chart, hover the chart to verify the tooltip renders with
   the dark theme background (not the recharts default).
5. `pnpm lint` (don't ignore warnings).

If you can't visually verify a UI change in a browser, **say so explicitly in
your reply** — type checks alone don't validate UI.

## 8. How to document last actions

(See section 5 above for the template — this section is here only to mirror
the structure the user requested.) Every meaningful change ends with appending
to `MEMORY.md > Last Actions`. The order is reverse‑chronological — newest
entry on top of the section, just under the "## Last Actions" heading.

## 9. Quick checklist (use this every change)

Before you call a task done:

- [ ] Did the change stay focused on one topic?
- [ ] Did you read the affected file(s) before editing?
- [ ] Are there other callers/pages that need the same edit?
- [ ] **Is every new visible string going through `useT()` with keys defined
      in BOTH `en` and `az` blocks of `lib/i18n/dictionary.ts`?**
- [ ] **Does any new copy avoid global/multi‑country framing? Does any
      mention of verification clearly say it's planned/coming‑soon/demo
      and never live?**
- [ ] **If you added a protected page, is it under `app/dashboard/<role>/`
      OR explicitly wrapped in `<RoleGate role="…">`? Did you check that
      the navigation doesn't surface it to the wrong role?**
- [ ] **Did you avoid leaning on the mock auth's "security" — i.e., no
      copy that says the user is verified/secure, no logic that assumes
      `localStorage` can't be tampered with?**
- [ ] Did you verify in the browser (or explicitly note that you couldn't)?
      In particular, does AZ text not break layout at `≤640px` width on the
      affected route?
- [ ] Did you update `MEMORY.md > Last Actions` (and any other section that
      changed: pages / components / mock data / tech stack / known issues)?
- [ ] Did you avoid adding any of the items in section 4 (backend, auth,
      database, etc.)?
- [ ] Did you keep comments to a minimum and only where the *why* is
      non‑obvious?
