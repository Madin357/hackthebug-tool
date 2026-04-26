# DATABASE_PLAN.md — Hack The Bug, first backend pass

> **Status: planning only.** This file describes the schema we intend to add
> when a backend lands. Nothing in this document is implemented yet — the
> hackathon prototype still has no database, no API, and no real
> authentication. The current "auth" is a localStorage mock (see
> `lib/auth/auth-provider.tsx`). When backend work begins, this plan is the
> starting point.

The goal of the first cut is the **smallest set of tables that lets one
researcher and one organization log in and use their respective dashboards
end-to-end**. Anything not strictly needed for that is deferred — we will
extend the schema iteratively once the basics work.

---

## 1. Recommended stack (when backend lands)

- **Database:** PostgreSQL 16+ (managed — Supabase, Neon, or RDS).
- **ORM / migration tool:** Drizzle or Prisma. Either works; Drizzle is
  closer to raw SQL and lighter, Prisma has nicer DX. Pick once and stick
  with it — don't run both.
- **Auth library:** Lucia or Auth.js (NextAuth). Both can use the same
  Postgres for sessions. The current `localStorage` session is **not** a
  long-term solution.
- **Password hashing:** `argon2id` (preferred) or `bcrypt` with a cost factor
  of at least 12. Never store plaintext.
- **API layer:** Next.js Route Handlers or Server Actions (no separate
  service yet — keep the deployment surface small).

---

## 2. Minimal table set

Six tables for the first cut. Each section lists columns, indexes, and
relationships. ID columns use `text` with a prefixed ULID (e.g.,
`usr_01HF7…`) so IDs are sortable, URL-safe, and human-distinguishable
across tables. PostgreSQL types shown.

### `users`

The single sign-in identity. Every login lands here first.

| Column           | Type                       | Notes                                                         |
| ---------------- | -------------------------- | ------------------------------------------------------------- |
| `id`             | `text` PK                  | `usr_…`                                                       |
| `email`          | `citext` UNIQUE NOT NULL   | Normalized to lowercase                                       |
| `password_hash`  | `text` NOT NULL            | argon2id — **never store plaintext**                          |
| `role`           | `text` NOT NULL            | `'researcher' \| 'organization'` (CHECK constraint)           |
| `display_name`   | `text` NOT NULL            | Shown in nav & dashboard greetings                            |
| `researcher_id`  | `text` NULL FK→researchers | Set when role = 'researcher', NULL otherwise                  |
| `organization_id`| `text` NULL FK→organizations| Set when role = 'organization', NULL otherwise               |
| `sima_verified_at`| `timestamptz` NULL        | NULL until SİMA verification ships and the user completes it  |
| `created_at`     | `timestamptz` NOT NULL DEFAULT now() | |
| `updated_at`     | `timestamptz` NOT NULL DEFAULT now() | |

Indexes: unique on `email`, partial unique on `researcher_id` WHERE NOT
NULL, partial unique on `organization_id` WHERE NOT NULL.

CHECK constraint:
```sql
CONSTRAINT users_role_link CHECK (
  (role = 'researcher' AND researcher_id IS NOT NULL AND organization_id IS NULL)
  OR
  (role = 'organization' AND organization_id IS NOT NULL AND researcher_id IS NULL)
)
```

### `researchers`

The public-facing researcher profile. One row per `users` row whose role is
`researcher`.

| Column            | Type        | Notes                                          |
| ----------------- | ----------- | ---------------------------------------------- |
| `id`              | `text` PK   | `res_…`                                        |
| `handle`          | `text` UNIQUE NOT NULL | URL-friendly username                  |
| `name`            | `text` NOT NULL | Public display name                         |
| `country_code`    | `text` NOT NULL DEFAULT 'AZ' | Always 'AZ' at launch — see RBAC below |
| `points`          | `integer` NOT NULL DEFAULT 0  |                                       |
| `reputation`      | `integer` NOT NULL DEFAULT 0  | 0–100                                 |
| `joined_date`     | `timestamptz` NOT NULL DEFAULT now() |                                |

### `organizations`

| Column            | Type        | Notes                                           |
| ----------------- | ----------- | ----------------------------------------------- |
| `id`              | `text` PK   | `org_…`                                         |
| `slug`            | `text` UNIQUE NOT NULL | Used in `/programs/[slug]` URLs        |
| `name`            | `text` NOT NULL |                                             |
| `industry`        | `text` NOT NULL |                                             |
| `created_at`      | `timestamptz` NOT NULL DEFAULT now() |                        |

### `programs`

Each organization may publish many programs. Fields mirror the existing
`Program` type in `lib/types.ts`.

| Column            | Type           | Notes                                           |
| ----------------- | -------------- | ----------------------------------------------- |
| `id`              | `text` PK      | `prg_…`                                         |
| `organization_id` | `text` FK→organizations NOT NULL | Owner                         |
| `slug`            | `text` UNIQUE NOT NULL | Used in `/programs/[slug]`              |
| `name`            | `text` NOT NULL|                                                 |
| `description`     | `text` NOT NULL|                                                 |
| `long_description`| `text` NULL    |                                                 |
| `industry`        | `text` NOT NULL|                                                 |
| `status`          | `text` NOT NULL| `active \| upcoming \| paused \| closed`        |
| `type`            | `text` NOT NULL| `bug-bounty \| vdp \| private-preview`          |
| `reward_min`      | `integer` NOT NULL |                                             |
| `reward_max`      | `integer` NOT NULL |                                             |
| `featured`        | `boolean` NOT NULL DEFAULT false |                              |
| `created_at`      | `timestamptz` NOT NULL DEFAULT now() |                        |
| `updated_at`      | `timestamptz` NOT NULL DEFAULT now() |                        |

For the first cut, scope items, reward tiers, rules, updates, and hall of
fame entries can stay denormalized in JSONB columns on `programs`. Split
them into proper tables once a real org needs to edit them. Indexes:
`organization_id`, `status`, `industry`.

### `reports`

| Column            | Type           | Notes                                           |
| ----------------- | -------------- | ----------------------------------------------- |
| `id`              | `text` PK      | `rep_…`                                         |
| `program_id`      | `text` FK→programs NOT NULL |                                    |
| `researcher_id`   | `text` FK→researchers NOT NULL | The submitter                  |
| `title`           | `text` NOT NULL|                                                 |
| `severity`        | `text` NOT NULL| `critical \| high \| medium \| low \| informational` |
| `status`          | `text` NOT NULL| `draft \| pending \| triaged \| resolved \| rewarded \| duplicate \| invalid` |
| `weakness_type`   | `text` NOT NULL| Free text from `weaknessCategories`             |
| `asset`           | `text` NOT NULL| The targeted asset URL/host                     |
| `summary`         | `text` NOT NULL|                                                 |
| `steps_to_reproduce` | `text` NOT NULL|                                              |
| `proof_of_concept`| `text` NULL    |                                                 |
| `impact`          | `text` NOT NULL|                                                 |
| `remediation`     | `text` NULL    |                                                 |
| `cvss_score`      | `numeric(3,1)` NULL |                                            |
| `reward_amount`   | `integer` NULL | Set when `status = 'rewarded'`                  |
| `submitted_at`    | `timestamptz` NOT NULL DEFAULT now() |                        |
| `last_updated_at` | `timestamptz` NOT NULL DEFAULT now() |                        |

Indexes: `program_id`, `researcher_id`, `(status, submitted_at)`.

### `sessions`

If we use Auth.js / Lucia, this table is owned by the auth library — match
its required shape exactly. Otherwise, the minimum is:

| Column         | Type           | Notes                                              |
| -------------- | -------------- | -------------------------------------------------- |
| `id`           | `text` PK      | Server-generated, opaque to the client             |
| `user_id`      | `text` FK→users NOT NULL |                                          |
| `expires_at`   | `timestamptz` NOT NULL |                                            |
| `created_at`   | `timestamptz` NOT NULL DEFAULT now() |                        |
| `ip`           | `inet` NULL    | For audit                                          |
| `user_agent`   | `text` NULL    | For audit                                          |

The session **token** lives in an `HttpOnly`, `Secure`, `SameSite=Lax`
cookie set by the server. **Never** in `localStorage`. The session id in
the cookie maps to this row server-side.

---

## 3. Role-based access control

Two roles in the first cut:

- **`researcher`** — can read public programs, can submit reports tied to
  their own `researcher_id`, can read/update only their own reports, can
  read their own profile.
- **`organization`** — can read/write only programs whose
  `organization_id` matches their `users.organization_id`, can read all
  reports filed against those programs, can change report status / set
  reward.

Authorization should be enforced **server-side** in route handlers — never
trust the client. Recommended pattern:

```ts
// Pseudocode for a route handler
const session = await getSession(request) // reads HttpOnly cookie
if (!session) return Response.unauthorized()

if (session.role !== 'organization') return Response.forbidden()
const ownsProgram = await db.programs.exists({
  id: programId,
  organization_id: session.organization_id,
})
if (!ownsProgram) return Response.forbidden()
```

A future `roles` / `permissions` system is documented in
`MEMORY.md > Future Features` (researcher / org admin / org member /
platform admin / triage reviewer). Not needed for the first cut.

### SİMA verification

Researcher accounts at launch will be required to complete SİMA identity
verification before they can submit reports. Implementation sketch:

1. After signup, `users.sima_verified_at` is `NULL`.
2. The user starts the SİMA flow from their dashboard.
3. On successful verification, the server sets
   `users.sima_verified_at = now()` and stores any minimal returned claims
   needed for compliance.
4. Submission endpoints check `sima_verified_at IS NOT NULL` before
   accepting reports.

The current build does **not** implement any of this — the dashboard shows
"SİMA — coming soon" copy.

---

## 4. Sample seed data

Match the demo accounts already wired into the frontend
(`lib/auth/mock-users.ts`). When backend lands, seed the new tables with
these rows so the demo flow keeps working end-to-end.

```sql
-- Organization
INSERT INTO organizations (id, slug, name, industry)
VALUES ('org-caspianbank', 'caspianbank', 'CaspianBank', 'Financial Services');

-- Researcher profile
INSERT INTO researchers (id, handle, name, country_code, points, reputation, joined_date)
VALUES ('1', 'cybernomad', 'CyberNomad', 'AZ', 12500, 98, '2025-03-10T00:00:00Z');

-- Researcher user
-- password_hash is the argon2id hash of 'researcher123' — generated by the
-- backend at seed time. NEVER commit a real hash for a real password.
INSERT INTO users (id, email, password_hash, role, display_name, researcher_id, sima_verified_at, created_at, updated_at)
VALUES (
  'usr-researcher-1',
  'researcher@hackthebug.demo',
  '<argon2id hash of "researcher123" goes here>',
  'researcher',
  'CyberNomad',
  '1',
  NULL,
  now(), now()
);

-- Organization user
INSERT INTO users (id, email, password_hash, role, display_name, organization_id, sima_verified_at, created_at, updated_at)
VALUES (
  'usr-organization-1',
  'org@hackthebug.demo',
  '<argon2id hash of "org123" goes here>',
  'organization',
  'CaspianBank Security Team',
  'org-caspianbank',
  NULL,
  now(), now()
);
```

A first program for the org and one sample report keep the dashboards
populated end-to-end:

```sql
INSERT INTO programs (id, organization_id, slug, name, description, industry, status, type, reward_min, reward_max, featured)
VALUES (
  'prg_caspianbank_main',
  'org-caspianbank',
  'caspianbank',
  'CaspianBank Security Program',
  'Help secure Azerbaijan''s leading digital banking platform.',
  'Financial Services',
  'active',
  'bug-bounty',
  100,
  5000,
  true
);

INSERT INTO reports (id, program_id, researcher_id, title, severity, status, weakness_type, asset, summary, steps_to_reproduce, impact, reward_amount)
VALUES (
  'rep_seed_sql_injection',
  'prg_caspianbank_main',
  '1',
  'SQL Injection in Search API',
  'critical',
  'rewarded',
  'SQL Injection',
  'api.caspianbank.demo',
  'The /search endpoint concatenates the q parameter into a raw SQL query.',
  '1. POST /search with q=1'' OR ''1''=''1\n2. Observe the full result set is returned.',
  'Full read access to the customer search index.',
  4500
);
```

---

## 5. Migration checklist when backend work starts

1. Decide ORM (Drizzle vs Prisma) and add it as a single dependency.
2. Add `DATABASE_URL` to `.env.local` (do **not** commit). Update
   `.gitignore` to include `.env*` if it isn't already.
3. Generate the initial migration from the schema in this file.
4. Add a seed script that inserts the rows in section 4.
5. Replace the contents of `lib/auth/mock-users.ts` and the body of
   `lib/auth/auth-provider.tsx` with calls to the real auth endpoint.
   Keep the public hook surface (`useAuth().status`, `.session`,
   `.login`, `.logout`) so pages and `RoleGate` continue to work.
6. Move the session out of `localStorage`. Set an HttpOnly cookie from the
   server on successful login; client reads `session` shape from a
   `/api/auth/me` endpoint at mount.
7. Add server-side route guards (Next.js `middleware.ts`) that
   short-circuit unauthenticated requests to `/dashboard/*` before they
   reach the page — currently this is enforced only on the client by
   `RoleGate`.
8. Replace the imports in pages from `lib/mock-data.ts` with API calls,
   one page at a time.

---

## 6. Security notes (read before shipping anything real)

- **Never store plaintext passwords.** Use argon2id; never log passwords
  even in dev.
- **Sessions belong in HttpOnly + Secure cookies.** localStorage tokens
  can be read by any JS on the page, including injected scripts.
- **All authorization runs on the server.** The `RoleGate` in this repo
  is for UX (so users don't see the wrong dashboard for a frame). It is
  not a security boundary — anyone can edit `localStorage` and bypass
  it. Real security requires server-side checks on every protected
  request.
- **Validate input at the server boundary.** Use `zod` (already a
  dependency) in route handlers.
- **Rate-limit `/login`** once it talks to a real backend (slow argon2
  hashing helps but isn't enough on its own).
- **CSRF protection** is needed for cookie-based auth — use SameSite=Lax
  cookies plus Origin/Referer checks for state-changing endpoints.
- **Audit log:** log every state change on a report (status, reward,
  comments) with `actor_user_id`, `at`, and `previous_value`.
