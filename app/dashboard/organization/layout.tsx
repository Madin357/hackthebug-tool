'use client'

import { RoleGate } from '@/components/role-gate'

export default function OrganizationDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RoleGate role="organization">{children}</RoleGate>
}
