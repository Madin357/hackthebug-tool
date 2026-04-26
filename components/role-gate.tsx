'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useT } from '@/lib/i18n/locale-provider'
import { useAuth, dashboardPathForRole } from '@/lib/auth/auth-provider'
import type { UserRole } from '@/lib/types'

interface RoleGateProps {
  role: UserRole
  children: React.ReactNode
}

export function RoleGate({ role, children }: RoleGateProps) {
  const t = useT()
  const router = useRouter()
  const pathname = usePathname()
  const { status, session, logout } = useAuth()

  useEffect(() => {
    if (status === 'unauthenticated') {
      const next = encodeURIComponent(pathname || '/')
      router.replace(`/login?next=${next}`)
    }
  }, [status, pathname, router])

  if (status === 'loading') {
    return <FullScreenStatus icon="loader" message={t('roleGate.checking')} />
  }

  if (status === 'unauthenticated') {
    return (
      <FullScreenStatus icon="loader" message={t('roleGate.redirecting')} />
    )
  }

  if (session && session.role !== role) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-destructive/15 flex items-center justify-center">
              <ShieldAlert className="h-7 w-7 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {t('roleGate.denied.title')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('roleGate.denied.body', {
                requiredRole: t(`role.${role}`),
                currentRole: t(`role.${session.role}`),
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <Button asChild>
                <Link href={dashboardPathForRole(session.role)}>
                  {t('roleGate.denied.goToMine')}
                </Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                {t('roleGate.denied.logout')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

function FullScreenStatus({
  icon,
  message,
}: {
  icon: 'loader' | 'check'
  message: string
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon === 'loader' ? (
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          ) : (
            <ShieldCheck className="h-6 w-6 text-primary" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
