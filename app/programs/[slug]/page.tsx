'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Building2,
  Clock,
  DollarSign,
  Target,
  ArrowLeft,
  Bookmark,
  Share2,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  Calendar,
  Trophy,
  Globe,
  Smartphone,
  Cloud,
  Server,
  Code,
  AlertTriangle,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SeverityBadge } from '@/components/severity-badge'
import { FormattedDate } from '@/components/formatted-date'
import { useT } from '@/lib/i18n/locale-provider'
import { useProgram, usePrograms } from '@/lib/data/hooks'
import { cn, formatAZN, formatAZNRange } from '@/lib/utils'
import { ReportSubmissionModal } from '@/components/report-submission-modal'

const statusColors = {
  active: 'bg-success/20 text-success border-success/30',
  upcoming: 'bg-warning/20 text-warning border-warning/30',
  paused: 'bg-muted text-muted-foreground border-muted',
  closed: 'bg-destructive/20 text-destructive border-destructive/30',
}

const scopeTypeIcons = {
  web: Globe,
  api: Code,
  mobile: Smartphone,
  cloud: Cloud,
  network: Server,
  other: Target,
}

const updateTypeColors = {
  scope: 'bg-primary/20 text-primary border-primary/30',
  reward: 'bg-success/20 text-success border-success/30',
  policy: 'bg-warning/20 text-warning border-warning/30',
  general: 'bg-secondary text-secondary-foreground border-secondary',
}

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const t = useT()
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const { data: program, loading } = useProgram(slug)
  const { data: allPrograms } = usePrograms()

  if (loading) {
    return (
      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="h-6 w-32 rounded bg-card/60 animate-pulse" />
          <div className="rounded-2xl border border-border bg-card/60 h-48 animate-pulse" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64 rounded-xl border border-border bg-card/60 animate-pulse" />
            <div className="h-64 rounded-xl border border-border bg-card/60 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!program) {
    notFound()
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('program.back')}
        </Link>

        {/* Pending official authorization notice */}
        <div className="mb-6 rounded-xl border border-warning/30 bg-warning/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {t('program.authNotice.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('program.authNotice.body', { org: program.organization })}
              </p>
            </div>
          </div>
        </div>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {program.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className={cn(statusColors[program.status])}
                  >
                    {t(`programStatus.${program.status}`)}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">
                  {program.organization}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {t(`programType.${program.type}.long`)}
                  </Badge>
                  <Badge variant="secondary">{program.industry}</Badge>
                  {program.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs">
                      {t('programCard.rewards')}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">
                    {formatAZNRange(
                      program.rewardRange.min,
                      program.rewardRange.max,
                    )}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground mb-1">
                    <Target className="h-4 w-4" />
                    <span className="text-xs">
                      {t('programCard.assets')}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">
                    {program.assetsCount}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">
                      {t('programCard.updated')}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">
                    <FormattedDate
                      date={program.lastUpdated}
                      options={{ month: 'short', day: 'numeric' }}
                    />
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex-1 sm:flex-none"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t('program.actions.submit')}
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground sm:text-right">
                {t('disclaimer.simaShort')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">
              {t('program.tabs.overview')}
            </TabsTrigger>
            <TabsTrigger value="scope">{t('program.tabs.scope')}</TabsTrigger>
            <TabsTrigger value="rewards">
              {t('program.tabs.rewards')}
            </TabsTrigger>
            <TabsTrigger value="rules">{t('program.tabs.rules')}</TabsTrigger>
            <TabsTrigger value="updates">
              {t('program.tabs.updates')}
            </TabsTrigger>
            <TabsTrigger value="hall-of-fame">
              {t('program.tabs.hallOfFame')}
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    {t('program.summary')}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {program.longDescription || program.description}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    {t('program.responseTimes')}
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t('program.responseTimes.first')}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {program.responseTime.firstResponse}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t('program.responseTimes.triage')}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {program.responseTime.triage}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t('program.responseTimes.resolution')}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {program.responseTime.resolution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    {t('program.quickStats')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t('program.quickStats.inScope')}
                      </span>
                      <span className="font-medium text-foreground">
                        {program.inScope.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t('program.quickStats.researchers')}
                      </span>
                      <span className="font-medium text-foreground">
                        {program.hallOfFame.length}+
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t('program.quickStats.maxReward')}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatAZN(program.rewardRange.max)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        {t('program.safeHarbor.title')}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t('program.safeHarbor.body')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-warning/30 bg-warning/5 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        {t('disclaimer.simaShort')}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t('disclaimer.simaLong')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Scope */}
          <TabsContent value="scope" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <h2 className="text-lg font-semibold text-foreground">
                    {t('program.scope.in')}
                  </h2>
                </div>
                <div className="space-y-3">
                  {program.inScope.map((item, index) => {
                    const Icon = scopeTypeIcons[item.type]
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                      >
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {item.target}
                          </p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.description}
                            </p>
                          )}
                          <Badge variant="outline" className="mt-2 text-xs">
                            {item.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <h2 className="text-lg font-semibold text-foreground">
                    {t('program.scope.out')}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {program.outOfScope.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </TabsContent>

          {/* Rewards */}
          <TabsContent value="rewards">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/30">
                <Info className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  {t('program.rewards.demoNote')}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('program.rewards.severity')}</TableHead>
                      <TableHead>{t('program.rewards.range')}</TableHead>
                      <TableHead>{t('program.rewards.sla')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {program.rewards.map((tier) => (
                      <TableRow key={tier.severity}>
                        <TableCell>
                          <SeverityBadge severity={tier.severity} />
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatAZNRange(tier.minReward, tier.maxReward)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {tier.sla}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>

          {/* Rules */}
          <TabsContent value="rules" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {t('program.rules.title')}
                </h2>
                <ul className="space-y-3">
                  {program.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-warning/30 bg-warning/5 p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t('program.rules.harbor.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t('program.rules.harbor.body')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Updates */}
          <TabsContent value="updates">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">
                {t('program.updates.title')}
              </h2>
              <div className="relative">
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {program.updates.map((update) => (
                    <div key={update.id} className="relative pl-8">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                        <Calendar className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={updateTypeColors[update.type]}
                        >
                          {t(`program.updates.type.${update.type}`)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          <FormattedDate
                            date={update.date}
                            options={{
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            }}
                          />
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground">
                        {update.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {update.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Hall of Fame */}
          <TabsContent value="hall-of-fame">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-warning" />
                <h2 className="text-lg font-semibold text-foreground">
                  {t('program.hof.title')}
                </h2>
              </div>

              {program.hallOfFame.length > 0 ? (
                <div className="space-y-4">
                  {program.hallOfFame.map((entry, index) => (
                    <div
                      key={entry.researcherId}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg',
                        index === 0
                          ? 'bg-warning/10 border border-warning/30'
                          : 'bg-secondary/50',
                      )}
                    >
                      <div
                        className={cn(
                          'h-10 w-10 rounded-full flex items-center justify-center font-bold',
                          index === 0
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-primary/20 text-primary',
                        )}
                      >
                        #{entry.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {entry.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t('program.hof.reportsAccepted', {
                            count: entry.reportsAccepted,
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {entry.points.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('program.hof.points')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {t('program.hof.empty')}
                  </p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Related Programs */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {t('program.related.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {(allPrograms ?? [])
              .filter(
                (p) => p.id !== program.id && p.industry === program.industry,
              )
              .slice(0, 3)
              .map((relatedProgram) => (
                <Link
                  key={relatedProgram.id}
                  href={`/programs/${relatedProgram.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {relatedProgram.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {relatedProgram.organization}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <ReportSubmissionModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
        programName={program.name}
        programAssets={program.inScope.map((s) => s.target)}
      />
    </div>
  )
}
