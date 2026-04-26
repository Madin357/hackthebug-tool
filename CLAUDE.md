# CLAUDE.md — Working Instructions for Claude in this Repo

> **Read order for every new session:** this file → `MEMORY.md` → the specific
> files relevant to the request. Don't start changing things until you've done
> all three.

---

## 1. Project context (one paragraph)

This repo is **Hack The Bug**, a frontend‑only Next.js demo of a bug bounty /
responsible disclosure platform aimed at Azerbaijan‑focused organizations. The
goal of the current iteration is a polished, premium hackathon demo — not a
production app. There is no backend, no database, no real auth, no real
payments, no real identity verification. Everything is mocked locally in
`lib/mock-data.ts`. See `MEMORY.md` for the full picture, the known issues
list, and the recommended improvement order.

## 2. Coding rules

- **Edit existing files; don't create new ones unless required.** If a piece
  of UI already exists (e.g., a card, badge, modal), extend it rather than
  forking a parallel version.
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

The product narrative is "trusted regional cybersecurity SaaS for banks,
telecoms, government, and enterprise." Every visual decision should be
defensible against that bar.

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
- ❌ Real authentication (no NextAuth/Clerk/Auth.js/Supabase Auth).
- ❌ Real registration flow (the "Sign up" / "Launch Demo" CTAs stay
  decorative).
- ❌ Real payments (Stripe/PayPal/etc.).
- ❌ Real SİMA / e‑imza / digital identity integration.
- ❌ Real email/SMS notifications.
- ❌ File uploads to real storage (the report modal's "upload" stays a UI
  affordance).
- ❌ External analytics/tracking beyond `@vercel/analytics` (already
  prod‑gated).
- ❌ Internationalization framework (i18n routing, message bundles) — the
  demo is English only for now.
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
- [ ] Did you verify in the browser (or explicitly note that you couldn't)?
- [ ] Did you update `MEMORY.md > Last Actions` (and any other section that
      changed: pages / components / mock data / tech stack / known issues)?
- [ ] Did you avoid adding any of the items in section 4 (backend, auth,
      database, etc.)?
- [ ] Did you keep comments to a minimum and only where the *why* is
      non‑obvious?
