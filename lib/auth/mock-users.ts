/**
 * DEMO ONLY — frontend mock auth.
 *
 * These records are bundled into the client. Do NOT use them, or anything
 * resembling them, in production. Real backend auth must:
 *   - keep credentials server-side
 *   - hash passwords (argon2id / bcrypt)
 *   - issue HttpOnly + Secure session cookies (or signed JWTs)
 *   - layer SİMA identity verification on top before granting researcher
 *     access at launch
 *
 * For the hackathon prototype, the password is compared in plain text on the
 * client purely so the demo flow is testable. See DATABASE_PLAN.md.
 */

import type { User } from '@/lib/types'

interface MockCredential {
  user: User
  password: string
}

export const mockCredentials: MockCredential[] = [
  {
    user: {
      id: 'usr-researcher-1',
      email: 'researcher@hackthebug.demo',
      role: 'researcher',
      displayName: 'CyberNomad',
      researcherId: '1',
    },
    password: 'researcher123',
  },
  {
    user: {
      id: 'usr-organization-1',
      email: 'org@hackthebug.demo',
      role: 'organization',
      displayName: 'AZAL',
      // Matches `organizations[0]` in `lib/mock-data.ts` — the canonical
      // organization records live there, not here.
      organizationId: 'org-azal',
    },
    password: 'org123',
  },
]

export function findCredential(
  email: string,
  password: string,
): MockCredential | null {
  const normalizedEmail = email.trim().toLowerCase()
  const match = mockCredentials.find(
    (c) =>
      c.user.email.toLowerCase() === normalizedEmail && c.password === password,
  )
  return match ?? null
}

export const demoCredentials = {
  researcher: {
    email: mockCredentials[0].user.email,
    password: mockCredentials[0].password,
  },
  organization: {
    email: mockCredentials[1].user.email,
    password: mockCredentials[1].password,
  },
} as const
