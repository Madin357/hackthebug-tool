'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Info, Lock, ShieldCheck } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useT } from '@/lib/i18n/locale-provider'
import { useAuth, dashboardPathForRole } from '@/lib/auth/auth-provider'
import { getSupabaseClient } from '@/lib/supabase/client'
import { createOrganization } from '@/lib/supabase/queries/organizations'
import {
  completeOrganizationProfile,
  updateResearcherProfile,
} from '@/lib/supabase/queries/profiles'
import { industries } from '@/lib/mock-data'
import { slugify } from '@/lib/utils'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

type ErrorKey =
  | 'register.error.missingFields'
  | 'register.error.invalidEmail'
  | 'register.error.weakPassword'
  | 'register.error.invalidSlug'
  | 'register.error.emailTaken'
  | 'register.error.slugTaken'
  | 'register.error.unknown'

type Tab = 'researcher' | 'organization'

export default function RegisterPage() {
  const t = useT()
  const router = useRouter()
  const { status, session, refresh } = useAuth()
  const supabase = useMemo(() => getSupabaseClient(), [])

  const [tab, setTab] = useState<Tab>('researcher')
  const [submitting, setSubmitting] = useState(false)
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null)
  const [errorDetail, setErrorDetail] = useState<string | null>(null)
  const [confirmEmailFor, setConfirmEmailFor] = useState<string | null>(null)

  // Researcher form
  const [rEmail, setREmail] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [rDisplayName, setRDisplayName] = useState('')
  const [rHandle, setRHandle] = useState('')

  // Organization form
  const [oEmail, setOEmail] = useState('')
  const [oPassword, setOPassword] = useState('')
  const [oYourName, setOYourName] = useState('')
  const [oOrgName, setOOrgName] = useState('')
  const [oSlug, setOSlug] = useState('')
  const [oSlugTouched, setOSlugTouched] = useState(false)
  const [oIndustry, setOIndustry] = useState<string>('')

  // Auto-derive slug from org name unless the user has typed in the slug field
  useEffect(() => {
    if (!oSlugTouched) setOSlug(slugify(oOrgName))
  }, [oOrgName, oSlugTouched])

  // If user is already signed in, bounce them to their dashboard
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.replace(dashboardPathForRole(session.role))
    }
  }, [status, session, router])

  function clearErrors() {
    setErrorKey(null)
    setErrorDetail(null)
    setConfirmEmailFor(null)
  }

  function bucketError(message: string): ErrorKey {
    const m = message.toLowerCase()
    if (m.includes('already registered') || m.includes('user already')) {
      return 'register.error.emailTaken'
    }
    if (m.includes('password') && m.includes('6')) {
      return 'register.error.weakPassword'
    }
    if (m.includes('duplicate key') && m.includes('slug')) {
      return 'register.error.slugTaken'
    }
    if (m.includes('invalid email')) {
      return 'register.error.invalidEmail'
    }
    return 'register.error.unknown'
  }

  async function handleResearcherSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearErrors()
    if (!rEmail || !rPassword || !rDisplayName) {
      setErrorKey('register.error.missingFields')
      return
    }
    if (!EMAIL_PATTERN.test(rEmail)) {
      setErrorKey('register.error.invalidEmail')
      return
    }
    if (rPassword.length < 6) {
      setErrorKey('register.error.weakPassword')
      return
    }
    setSubmitting(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: rEmail.trim(),
        password: rPassword,
        options: {
          data: {
            display_name: rDisplayName.trim(),
            handle: rHandle.trim(),
          },
        },
      })
      if (error) {
        setErrorKey(bucketError(error.message))
        setErrorDetail(error.message)
        return
      }

      // No session means email confirmation is required.
      if (!data.session) {
        setConfirmEmailFor(rEmail)
        return
      }

      // Trigger created the profile with role='researcher'. Patch any extra
      // fields the trigger didn't set.
      try {
        await updateResearcherProfile(supabase, {
          profileId: data.session.user.id,
          displayName: rDisplayName.trim(),
          handle: rHandle.trim() || null,
        })
      } catch {
        // Non-fatal; the trigger's defaults are still in place.
      }

      await refresh()
      router.replace('/dashboard/researcher')
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setErrorKey(bucketError(message))
      setErrorDetail(message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleOrganizationSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearErrors()
    if (
      !oEmail ||
      !oPassword ||
      !oYourName ||
      !oOrgName ||
      !oSlug ||
      !oIndustry
    ) {
      setErrorKey('register.error.missingFields')
      return
    }
    if (!EMAIL_PATTERN.test(oEmail)) {
      setErrorKey('register.error.invalidEmail')
      return
    }
    if (oPassword.length < 6) {
      setErrorKey('register.error.weakPassword')
      return
    }
    if (!SLUG_PATTERN.test(oSlug)) {
      setErrorKey('register.error.invalidSlug')
      return
    }
    setSubmitting(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: oEmail.trim(),
        password: oPassword,
        options: {
          data: {
            display_name: oYourName.trim(),
          },
        },
      })
      if (error) {
        setErrorKey(bucketError(error.message))
        setErrorDetail(error.message)
        return
      }

      if (!data.session) {
        setConfirmEmailFor(oEmail)
        return
      }

      // Now authed → create the org, then promote the profile to org role.
      const org = await createOrganization(supabase, {
        slug: oSlug,
        name: oOrgName.trim(),
        industry: oIndustry,
      })

      await completeOrganizationProfile(supabase, {
        profileId: data.session.user.id,
        organizationId: org.id,
        displayName: oYourName.trim(),
      })

      await refresh()
      router.replace('/dashboard/organization')
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setErrorKey(bucketError(message))
      setErrorDetail(message)
    } finally {
      setSubmitting(false)
    }
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

  if (confirmEmailFor) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <p className="text-foreground">
              {t('register.notice.confirmEmail', { email: confirmEmailFor })}
            </p>
            <Button asChild variant="outline">
              <Link href="/login">{t('register.logIn')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 sm:py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 sm:p-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <BrandLogo size={40} />
            <span className="text-lg font-semibold text-foreground">
              Hack<span className="text-primary">The</span>Bug
            </span>
          </Link>

          <Badge
            variant="outline"
            className="mb-4 border-primary/30 text-primary"
          >
            <Lock className="mr-1 h-3 w-3" />
            {t('register.badge')}
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t('register.title')}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {t('register.subtitle')}
          </p>

          <Tabs
            value={tab}
            onValueChange={(v) => {
              setTab(v as Tab)
              clearErrors()
            }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="researcher">
                {t('register.tab.researcher')}
              </TabsTrigger>
              <TabsTrigger value="organization">
                {t('register.tab.organization')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="researcher">
              <form
                onSubmit={handleResearcherSubmit}
                className="space-y-4"
                noValidate
              >
                <FieldGroup
                  id="r-email"
                  label={t('register.field.email')}
                  type="email"
                  autoComplete="email"
                  value={rEmail}
                  onChange={setREmail}
                />
                <FieldGroup
                  id="r-password"
                  label={t('register.field.password')}
                  help={t('register.field.password.help')}
                  type="password"
                  autoComplete="new-password"
                  value={rPassword}
                  onChange={setRPassword}
                />
                <FieldGroup
                  id="r-display-name"
                  label={t('register.field.displayName')}
                  help={t('register.field.displayName.help')}
                  value={rDisplayName}
                  onChange={setRDisplayName}
                />
                <FieldGroup
                  id="r-handle"
                  label={t('register.field.handle')}
                  help={t('register.field.handle.help')}
                  value={rHandle}
                  onChange={setRHandle}
                />
                {errorKey && (
                  <ErrorBlock
                    message={t(errorKey)}
                    detail={errorDetail ?? undefined}
                  />
                )}
                <Button
                  type="submit"
                  className="w-full glow-cyan"
                  disabled={submitting}
                >
                  {submitting
                    ? t('register.submitting')
                    : t('register.submit')}
                  {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="organization">
              <form
                onSubmit={handleOrganizationSubmit}
                className="space-y-4"
                noValidate
              >
                <FieldGroup
                  id="o-email"
                  label={t('register.field.email')}
                  type="email"
                  autoComplete="email"
                  value={oEmail}
                  onChange={setOEmail}
                />
                <FieldGroup
                  id="o-password"
                  label={t('register.field.password')}
                  help={t('register.field.password.help')}
                  type="password"
                  autoComplete="new-password"
                  value={oPassword}
                  onChange={setOPassword}
                />
                <FieldGroup
                  id="o-your-name"
                  label={t('register.field.yourName')}
                  help={t('register.field.yourName.help')}
                  value={oYourName}
                  onChange={setOYourName}
                />
                <FieldGroup
                  id="o-org-name"
                  label={t('register.field.orgName')}
                  help={t('register.field.orgName.help')}
                  value={oOrgName}
                  onChange={setOOrgName}
                />
                <FieldGroup
                  id="o-slug"
                  label={t('register.field.orgSlug')}
                  help={t('register.field.orgSlug.help')}
                  value={oSlug}
                  onChange={(v) => {
                    setOSlugTouched(true)
                    setOSlug(v)
                  }}
                />
                <div className="space-y-2">
                  <Label htmlFor="o-industry">
                    {t('register.field.orgIndustry')}
                  </Label>
                  <Select value={oIndustry} onValueChange={setOIndustry}>
                    <SelectTrigger id="o-industry">
                      <SelectValue
                        placeholder={t('register.field.orgIndustry.placeholder')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errorKey && (
                  <ErrorBlock
                    message={t(errorKey)}
                    detail={errorDetail ?? undefined}
                  />
                )}
                <Button
                  type="submit"
                  className="w-full glow-cyan"
                  disabled={submitting}
                >
                  {submitting
                    ? t('register.submitting')
                    : t('register.submit')}
                  {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground bg-warning/5 border border-warning/30 rounded-lg p-3">
            <Info className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <span>{t('register.notice.demoOnly')}</span>
          </div>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            {t('register.haveAccount')}{' '}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              {t('register.logIn')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

interface FieldGroupProps {
  id: string
  label: string
  help?: string
  type?: string
  autoComplete?: string
  value: string
  onChange: (value: string) => void
}

function FieldGroup({
  id,
  label,
  help,
  type = 'text',
  autoComplete,
  value,
  onChange,
}: FieldGroupProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
    </div>
  )
}

function ErrorBlock({ message, detail }: { message: string; detail?: string }) {
  return (
    <div
      role="alert"
      className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
    >
      <p>{message}</p>
      {detail && (
        <p className="mt-1 text-xs text-destructive/80 break-all">{detail}</p>
      )}
    </div>
  )
}
