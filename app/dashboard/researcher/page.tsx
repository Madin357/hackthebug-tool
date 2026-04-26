'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  Trophy,
  Target,
  Award,
  ArrowRight,
  Fingerprint,
  Bookmark,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  AlertCircle,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatCard } from '@/components/stat-card'
import { SeverityBadge } from '@/components/severity-badge'
import { StatusBadge } from '@/components/status-badge'
import { useT } from '@/lib/i18n/locale-provider'
import { cn, formatAZN } from '@/lib/utils'
import { useAuth } from '@/lib/auth/auth-provider'
import {
  usePrograms,
  useResearcherChartData,
  useResearcherDashboardStats,
  useResearcherReports,
} from '@/lib/data/hooks'
import { useSavedProgramIds } from '@/lib/data/saved-programs'
import { chartTooltipProps } from '@/lib/charts/tooltip'
import { toast } from 'sonner'

const badgeMeta = [
  { keySuffix: 'first', icon: Target, color: 'text-critical' },
  { keySuffix: 'critical', icon: Shield, color: 'text-warning' },
  { keySuffix: 'top10', icon: Trophy, color: 'text-primary' },
] as const

export default function ResearcherDashboardPage() {
  const t = useT()
  const { session } = useAuth()
  const researcherId = session?.researcherId ?? session?.userId ?? null
  const displayName = session?.displayName ?? '—'

  const { data: programsData } = usePrograms()
  const allPrograms = programsData ?? []
  const { ids: savedIds } = useSavedProgramIds(researcherId)
  const savedPrograms = allPrograms.filter((p) => savedIds.includes(p.id))
  const recommendedPrograms = allPrograms
    .filter((p) => p.status === 'active' && !savedIds.includes(p.id))
    .slice(0, 3)

  const { data: reportsData } = useResearcherReports(researcherId)
  const reports = reportsData ?? []

  const { data: stats, error: statsError } =
    useResearcherDashboardStats(researcherId)
  const statPlaceholder = '—'

  const { data: charts, error: chartsError } =
    useResearcherChartData(researcherId)
  const timelineData = charts?.timeline ?? []
  const severityData = charts?.severity ?? []
  const severityHasData = severityData.some((s) => s.value > 0)

  const handleViewAllReports = () =>
    toast.message(t('dashboard.researcher.recent.toast.title'), {
      description: t('dashboard.researcher.recent.toast.body'),
    })

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {t('dashboard.demoBadge')}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {t('dashboard.researcher.viewBadge')}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-accent/30 text-accent"
                >
                  {t('disclaimer.azCitizensOnly')}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {t('dashboard.researcher.welcome', {
                  name: displayName,
                })}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t('dashboard.researcher.subtitle')}
              </p>
            </div>
            <Button asChild>
              <Link href="/programs">
                {t('dashboard.researcher.findPrograms')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats error banner */}
        {statsError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t('dashboard.researcher.stats.error.title')}
              </p>
              <p className="text-xs text-muted-foreground break-words">
                {statsError.message}
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title={t('dashboard.researcher.stats.submitted')}
            value={stats ? stats.totalReports : statPlaceholder}
            icon={FileText}
            delay={0}
          />
          <StatCard
            title={t('dashboard.researcher.stats.accepted')}
            value={stats ? stats.acceptedReports : statPlaceholder}
            icon={CheckCircle}
            delay={0.1}
          />
          <StatCard
            title={t('dashboard.researcher.stats.pending')}
            value={stats ? stats.pendingTriage : statPlaceholder}
            icon={Clock}
            delay={0.2}
          />
          <StatCard
            title={t('dashboard.researcher.stats.rewards')}
            value={stats ? formatAZN(stats.totalRewards) : statPlaceholder}
            icon={DollarSign}
            delay={0.3}
          />
          <StatCard
            title={t('dashboard.researcher.stats.reputation')}
            value={stats ? stats.reputationScore : statPlaceholder}
            icon={Star}
            delay={0.4}
          />
          <StatCard
            title={t('dashboard.researcher.stats.rank')}
            value={stats ? `#${stats.rank}` : statPlaceholder}
            icon={Trophy}
            delay={0.5}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('dashboard.researcher.timeline.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.researcher.timeline.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartsError ? (
                <ChartError message={chartsError.message} t={t} />
              ) : !charts ? (
                <ChartSkeleton height={250} />
              ) : timelineData.every((p) => p.reports === 0) ? (
                <ChartEmpty t={t} />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timelineData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      dataKey="month"
                      className="text-xs fill-muted-foreground"
                    />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip {...chartTooltipProps} />
                    <Bar
                      dataKey="reports"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {t('dashboard.researcher.severity.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.researcher.severity.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartsError ? (
                <ChartError message={chartsError.message} t={t} />
              ) : !charts ? (
                <ChartSkeleton height={200} />
              ) : !severityHasData ? (
                <ChartEmpty t={t} />
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={severityData.filter((s) => s.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {severityData
                          .filter((s) => s.value > 0)
                          .map((entry) => (
                            <Cell key={entry.severity} fill={entry.fill} />
                          ))}
                      </Pie>
                      <Tooltip {...chartTooltipProps} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {severityData
                      .filter((s) => s.value > 0)
                      .map((item) => (
                        <div
                          key={item.severity}
                          className="flex items-center gap-1.5 text-xs"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.fill }}
                          />
                          <span className="text-muted-foreground">
                            {t(`severity.${item.severity}`)}
                          </span>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports & Sidebar */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t('dashboard.researcher.recent.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.researcher.recent.subtitle')}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewAllReports}
                >
                  {t('common.viewAll')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {reports.length === 0 && (
                <div className="text-center py-6">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.researcher.recent.empty')}
                  </p>
                </div>
              )}
              <Table className={cn(reports.length === 0 && 'hidden')}>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {t('dashboard.researcher.recent.col.report')}
                    </TableHead>
                    <TableHead>
                      {t('dashboard.researcher.recent.col.program')}
                    </TableHead>
                    <TableHead>
                      {t('dashboard.researcher.recent.col.severity')}
                    </TableHead>
                    <TableHead>
                      {t('dashboard.researcher.recent.col.status')}
                    </TableHead>
                    <TableHead className="text-right">
                      {t('dashboard.researcher.recent.col.reward')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.slice(0, 5).map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">
                            {report.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {report.asset}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {report.programName}
                      </TableCell>
                      <TableCell>
                        <SeverityBadge severity={report.severity} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={report.status} />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {report.reward
                          ? formatAZN(report.reward)
                          : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="h-5 w-5 text-warning" />
                  {t('dashboard.researcher.achievements.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badgeMeta.map((badge) => (
                    <div
                      key={badge.keySuffix}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
                        <badge.icon className={`h-5 w-5 ${badge.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {t(
                            `dashboard.researcher.achievements.${badge.keySuffix}`,
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('dashboard.researcher.achievements.earned')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification banner */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {t('dashboard.researcher.verification.title')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('dashboard.researcher.verification.body')}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {t('common.comingSoon')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" />
                  {t('dashboard.researcher.saved.title')}
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/programs">{t('common.viewAll')}</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {savedPrograms.length === 0 ? (
                <div className="text-center py-6">
                  <Bookmark className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('dashboard.researcher.saved.empty')}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/programs">
                      {t('dashboard.researcher.saved.browse')}
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedPrograms.map((program) => (
                    <Link
                      key={program.id}
                      href={`/programs/${program.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {program.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {program.organization}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {t('dashboard.researcher.maxLabel', {
                          amount: program.rewardRange.max.toLocaleString(),
                        })}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-warning" />
                  {t('dashboard.researcher.recommended.title')}
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/programs">{t('common.browseAll')}</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recommendedPrograms.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.researcher.recommended.empty')}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendedPrograms.map((program) => (
                    <Link
                      key={program.id}
                      href={`/programs/${program.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {program.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="secondary" className="text-xs">
                              {program.industry}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {program.assetsCount}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full rounded-lg bg-secondary/30 animate-pulse"
      style={{ height }}
    />
  )
}

function ChartEmpty({
  t,
}: {
  t: (key: string, vars?: Record<string, string | number>) => string
}) {
  return (
    <div className="text-center py-8">
      <p className="text-sm text-muted-foreground">
        {t('dashboard.charts.empty')}
      </p>
    </div>
  )
}

function ChartError({
  message,
  t,
}: {
  message: string
  t: (key: string, vars?: Record<string, string | number>) => string
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
      <div className="space-y-1 min-w-0">
        <p className="text-sm font-medium text-foreground">
          {t('dashboard.charts.error.title')}
        </p>
        <p className="text-xs text-muted-foreground break-words">{message}</p>
      </div>
    </div>
  )
}
