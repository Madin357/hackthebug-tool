'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bug, Loader2, Lock, ShieldCheck, ArrowRight, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useT } from '@/lib/i18n/locale-provider'
import { useAuth, dashboardPathForRole } from '@/lib/auth/auth-provider'
import { demoCredentials } from '@/lib/auth/mock-users'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormErrorKey =
  | 'login.error.missingFields'
  | 'login.error.invalidEmail'
  | 'login.error.invalidCredentials'

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  )
}

function LoginFallback() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  )
}

function LoginContent() {
  const t = useT()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status, session, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorKey, setErrorKey] = useState<FormErrorKey | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nextParam = searchParams.get('next')

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const target =
        nextParam && nextParam.startsWith('/')
          ? nextParam
          : dashboardPathForRole(session.role)
      router.replace(target)
    }
  }, [status, session, nextParam, router])

  const fillDemo = (role: UserRole) => {
    const cred =
      role === 'researcher' ? demoCredentials.researcher : demoCredentials.organization
    setEmail(cred.email)
    setPassword(cred.password)
    setErrorKey(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorKey('login.error.missingFields')
      return
    }
    if (!EMAIL_PATTERN.test(email)) {
      setErrorKey('login.error.invalidEmail')
      return
    }
    setIsSubmitting(true)
    setErrorKey(null)
    const result = login(email, password)
    if (!result.ok) {
      setIsSubmitting(false)
      setErrorKey(
        result.error === 'missing-fields'
          ? 'login.error.missingFields'
          : 'login.error.invalidCredentials',
      )
      return
    }
    const target =
      nextParam && nextParam.startsWith('/')
        ? nextParam
        : dashboardPathForRole(result.session.role)
    router.replace(target)
  }

  if (status === 'authenticated' && session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-success" />
            </div>
            <p className="text-foreground">
              {t('login.alreadySignedIn', {
                role: t(`role.${session.role}`),
              })}
            </p>
            <Button asChild>
              <Link href={dashboardPathForRole(session.role)}>
                {t('login.goToDashboard')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 sm:py-16">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 sm:p-8"
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Bug className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                Hack<span className="text-primary">The</span>Bug
              </span>
            </Link>

            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary"
            >
              <Lock className="mr-1 h-3 w-3" />
              {t('login.badge.demo')}
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t('login.title')}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              {t('login.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email.label')}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('login.email.placeholder')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errorKey) setErrorKey(null)
                  }}
                  aria-invalid={errorKey === 'login.error.invalidEmail'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password.label')}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t('login.password.placeholder')}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errorKey) setErrorKey(null)
                  }}
                />
              </div>

              {errorKey && (
                <p
                  role="alert"
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
                >
                  {t(errorKey)}
                </p>
              )}

              <Button
                type="submit"
                className="w-full glow-cyan"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('login.submitting') : t('login.submit')}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground bg-warning/5 border border-warning/30 rounded-lg p-3">
              <Info className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <span>{t('login.demoNote')}</span>
            </div>
          </motion.div>

          {/* Demo credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-1">
                {t('login.demo.title')}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t('login.demo.subtitle')}
              </p>
            </div>

            <DemoCard
              role="researcher"
              roleLabel={t('login.demo.researcher.role')}
              body={t('login.demo.researcher.body')}
              email={demoCredentials.researcher.email}
              password={demoCredentials.researcher.password}
              cta={t('login.demo.useThis')}
              onUse={() => fillDemo('researcher')}
            />
            <DemoCard
              role="organization"
              roleLabel={t('login.demo.organization.role')}
              body={t('login.demo.organization.body')}
              email={demoCredentials.organization.email}
              password={demoCredentials.organization.password}
              cta={t('login.demo.useThis')}
              onUse={() => fillDemo('organization')}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

interface DemoCardProps {
  role: UserRole
  roleLabel: string
  body: string
  email: string
  password: string
  cta: string
  onUse: () => void
}

function DemoCard({
  role,
  roleLabel,
  body,
  email,
  password,
  cta,
  onUse,
}: DemoCardProps) {
  return (
    <button
      type="button"
      onClick={onUse}
      className={cn(
        'w-full text-left rounded-xl border border-border bg-card p-5 transition-colors',
        'hover:border-primary/50 hover:bg-card/80',
        role === 'researcher'
          ? 'focus-visible:ring-2 focus-visible:ring-primary'
          : 'focus-visible:ring-2 focus-visible:ring-accent',
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge
          variant="outline"
          className={cn(
            role === 'researcher'
              ? 'border-primary/30 text-primary'
              : 'border-accent/30 text-accent',
          )}
        >
          {roleLabel}
        </Badge>
        <span className="text-xs text-muted-foreground">{cta} →</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{body}</p>
      <dl className="space-y-1 text-xs font-mono">
        <div className="flex gap-2">
          <dt className="text-muted-foreground w-20 shrink-0">email</dt>
          <dd className="text-foreground break-all">{email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted-foreground w-20 shrink-0">password</dt>
          <dd className="text-foreground">{password}</dd>
        </div>
      </dl>
    </button>
  )
}
