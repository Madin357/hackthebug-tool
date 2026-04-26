'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useT } from '@/lib/i18n/locale-provider'
import { useAuth } from '@/lib/auth/auth-provider'
import { useOrganization } from '@/lib/data/hooks'
import { getSupabaseClient } from '@/lib/supabase/client'
import {
  createProgramWithScopesAndRewards,
  REWARD_TIERS,
  type CreateProgramScope,
  type RewardTierKey,
} from '@/lib/supabase/queries/programs'
import { cn, formatAZNRange, slugify } from '@/lib/utils'
import type { ProgramStatus, ProgramType } from '@/lib/types'

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

const ASSET_TYPES: Array<CreateProgramScope['type']> = [
  'web',
  'api',
  'mobile',
  'cloud',
  'network',
  'other',
]

const TIER_OPTIONS: Array<{
  key: RewardTierKey
  titleKey: string
  bodyKey: string
}> = [
  { key: 'low',      titleKey: 'createProgram.tier.low.title',      bodyKey: 'createProgram.tier.low.body' },
  { key: 'standard', titleKey: 'createProgram.tier.standard.title', bodyKey: 'createProgram.tier.standard.body' },
  { key: 'high',     titleKey: 'createProgram.tier.high.title',     bodyKey: 'createProgram.tier.high.body' },
  { key: 'top',      titleKey: 'createProgram.tier.top.title',      bodyKey: 'createProgram.tier.top.body' },
]

type ErrorKey =
  | 'createProgram.error.missingFields'
  | 'createProgram.error.invalidSlug'
  | 'createProgram.error.slugTaken'
  | 'createProgram.error.unknown'

interface ScopeRow extends CreateProgramScope {
  id: string
}

function newScopeRow(): ScopeRow {
  return {
    id: Math.random().toString(36).slice(2),
    target: '',
    type: 'web',
  }
}

export default function CreateProgramPage() {
  const t = useT()
  const router = useRouter()
  const { session } = useAuth()
  const supabase = useMemo(() => getSupabaseClient(), [])
  const { data: org } = useOrganization(session?.organizationId)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [description, setDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [programType, setProgramType] = useState<ProgramType>('vdp')
  const [status, setStatus] = useState<ProgramStatus>('active')
  const [tier, setTier] = useState<RewardTierKey>('standard')
  const [featured, setFeatured] = useState(false)
  const [scopes, setScopes] = useState<ScopeRow[]>([newScopeRow()])

  const [submitting, setSubmitting] = useState(false)
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null)
  const [errorDetail, setErrorDetail] = useState<string | null>(null)

  // Auto-derive slug from name unless the user has typed in the slug field
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(name))
  }, [name, slugTouched])

  function setScope(index: number, patch: Partial<ScopeRow>) {
    setScopes((rows) =>
      rows.map((r, i) => (i === index ? { ...r, ...patch } : r)),
    )
  }
  function addScope() {
    setScopes((rows) => [...rows, newScopeRow()])
  }
  function removeScope(index: number) {
    setScopes((rows) => rows.filter((_, i) => i !== index))
  }

  function bucketError(message: string): ErrorKey {
    const m = message.toLowerCase()
    if (m.includes('duplicate key') && m.includes('slug')) {
      return 'createProgram.error.slugTaken'
    }
    return 'createProgram.error.unknown'
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorKey(null)
    setErrorDetail(null)

    if (!session?.organizationId) {
      setErrorKey('createProgram.error.unknown')
      setErrorDetail('No organization is linked to your account.')
      return
    }

    const trimmedName = name.trim()
    const trimmedDescription = description.trim()
    const cleanedScopes = scopes
      .map((s) => ({ ...s, target: s.target.trim() }))
      .filter((s) => s.target.length > 0)

    if (!trimmedName || !slug || !trimmedDescription || cleanedScopes.length === 0) {
      setErrorKey('createProgram.error.missingFields')
      return
    }
    if (!SLUG_PATTERN.test(slug)) {
      setErrorKey('createProgram.error.invalidSlug')
      return
    }

    setSubmitting(true)
    try {
      const result = await createProgramWithScopesAndRewards(supabase, {
        organizationId: session.organizationId,
        industry: org?.industry ?? '',
        slug,
        name: trimmedName,
        description: trimmedDescription,
        longDescription: longDescription.trim() || null,
        status,
        programType,
        tier,
        featured,
        inScope: cleanedScopes.map(({ target, type }) => ({ target, type })),
      })
      router.replace(`/programs/${result.slug}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setErrorKey(bucketError(message))
      setErrorDetail(message)
      setSubmitting(false)
    }
  }

  const tierPreview = REWARD_TIERS[tier]

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard/organization"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('createProgram.back')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 text-primary"
          >
            {t('createProgram.badge')}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t('createProgram.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('createProgram.subtitle')}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basics */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-sm font-semibold text-foreground">
                {t('createProgram.section.basics')}
              </h2>

              <div className="space-y-2">
                <Label htmlFor="cp-name">{t('createProgram.field.name')}</Label>
                <Input
                  id="cp-name"
                  placeholder={t('createProgram.field.name.placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cp-slug">{t('createProgram.field.slug')}</Label>
                <Input
                  id="cp-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true)
                    setSlug(e.target.value)
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  {t('createProgram.field.slug.help')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cp-description">
                  {t('createProgram.field.description')}
                </Label>
                <Textarea
                  id="cp-description"
                  placeholder={t('createProgram.field.description.placeholder')}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cp-long">
                  {t('createProgram.field.longDescription')}
                </Label>
                <Textarea
                  id="cp-long"
                  placeholder={t(
                    'createProgram.field.longDescription.placeholder',
                  )}
                  rows={4}
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cp-type">
                    {t('createProgram.field.type')}
                  </Label>
                  <Select
                    value={programType}
                    onValueChange={(v) => setProgramType(v as ProgramType)}
                  >
                    <SelectTrigger id="cp-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug-bounty">
                        {t('createProgram.field.type.bug-bounty')}
                      </SelectItem>
                      <SelectItem value="vdp">
                        {t('createProgram.field.type.vdp')}
                      </SelectItem>
                      <SelectItem value="private-preview">
                        {t('createProgram.field.type.private-preview')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cp-status">
                    {t('createProgram.field.status')}
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as ProgramStatus)}
                  >
                    <SelectTrigger id="cp-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        {t('createProgram.field.status.active')}
                      </SelectItem>
                      <SelectItem value="upcoming">
                        {t('createProgram.field.status.upcoming')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Checkbox
                  id="cp-featured"
                  checked={featured}
                  onCheckedChange={(v) => setFeatured(v === true)}
                />
                <Label
                  htmlFor="cp-featured"
                  className="text-sm font-medium cursor-pointer"
                >
                  {t('createProgram.field.featured')}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Section: Scope */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">
                  {t('createProgram.section.scope')}
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addScope}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  {t('createProgram.scope.add')}
                </Button>
              </div>

              {scopes.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  {t('createProgram.scope.empty')}
                </p>
              )}

              <div className="space-y-3">
                {scopes.map((row, index) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-2 items-end"
                  >
                    <div className="space-y-1">
                      {index === 0 && (
                        <Label className="text-xs text-muted-foreground">
                          {t('createProgram.scope.target')}
                        </Label>
                      )}
                      <Input
                        value={row.target}
                        placeholder={t(
                          'createProgram.scope.targetPlaceholder',
                        )}
                        onChange={(e) =>
                          setScope(index, { target: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      {index === 0 && (
                        <Label className="text-xs text-muted-foreground">
                          {t('createProgram.scope.type')}
                        </Label>
                      )}
                      <Select
                        value={row.type}
                        onValueChange={(v) =>
                          setScope(index, {
                            type: v as CreateProgramScope['type'],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ASSET_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeScope(index)}
                      disabled={scopes.length === 1}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section: Reward tier */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-1">
                  {t('createProgram.section.rewards')}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {t('createProgram.tier.help')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIER_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTier(option.key)}
                    className={cn(
                      'p-4 rounded-lg border text-left transition-colors',
                      tier === option.key
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50',
                    )}
                  >
                    <p className="font-medium text-foreground text-sm">
                      {t(option.titleKey)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t(option.bodyKey)}
                    </p>
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs text-muted-foreground space-y-1.5">
                {tierPreview.rewards.map((r) => (
                  <div
                    key={r.severity}
                    className="flex items-center justify-between"
                  >
                    <span className="capitalize text-foreground">
                      {r.severity}
                    </span>
                    <span className="font-mono">
                      {formatAZNRange(r.minReward, r.maxReward)} · {r.sla}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {errorKey && (
            <div
              role="alert"
              className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
            >
              <p>{t(errorKey)}</p>
              {errorDetail && (
                <p className="mt-1 text-xs text-destructive/80 break-all">
                  {errorDetail}
                </p>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button asChild variant="ghost">
              <Link href="/dashboard/organization">
                {t('createProgram.cancel')}
              </Link>
            </Button>
            <Button type="submit" disabled={submitting} className="glow-cyan">
              {submitting
                ? t('createProgram.submitting')
                : t('createProgram.submit')}
              {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
