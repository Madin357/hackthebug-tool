'use client'

import { RoleGate } from '@/components/role-gate'

export default function ResearcherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RoleGate role="researcher">{children}</RoleGate>
}
