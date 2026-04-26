'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Clock,
  AlertTriangle,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Target,
  Users,
  Activity,
  Shield,
  ArrowRight,
  Building2,
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
  AreaChart,
  Area,
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
import { FormattedDate } from '@/components/formatted-date'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { useT } from '@/lib/i18n/locale-provider'
import { useAuth } from '@/lib/auth/auth-provider'
import {
  useOrganization,
  useOrganizationActivity,
  useOrganizationChartData,
  useOrganizationDashboardStats,
  useOrganizationPrograms,
  useOrganizationReports,
  useResearchers,
} from '@/lib/data/hooks'
import { formatAZN, formatAZNRange } from '@/lib/utils'
import { chartTooltipProps } from '@/lib/charts/tooltip'
import { toast } from 'sonner'

const activityIcons = {
  submitted: FileText,
  triaged: Clock,
  status_changed: Shield,
  resolved: CheckCircle,
  rewarded: DollarSign,
  closed: Shield,
  duplicate: AlertTriangle,
  invalid: AlertTriangle,
  commented: Activity,
} as const

export default function OrganizationDashboardPage() {
  const t = useT()
  const { session } = useAuth()
  const organizationId = session?.organizationId ?? null

  const { data: organization } = useOrganization(organizationId)
  const orgName = organization?.name ?? session?.displayName ?? '—'

  const { data: reportsData } = useOrganizationReports(organizationId)
  const reports = reportsData ?? []

  const { data: myProgramsData } = useOrganizationPrograms(organizationId)
  const myPrograms = myProgramsData ?? []

  const { data: researchersData } = useResearchers()
  const researchers = researchersData ?? []

  const { data: stats, error: statsError } =
    useOrganizationDashboardStats(organizationId)
  const statPlaceholder = '—'

  const { data: charts, error: chartsError } =
    useOrganizationChartData(organizationId)
  const timelineData = charts?.timeline ?? []
  const severityData = charts?.severity ?? []
  const pipelineData = (charts?.pipeline ?? []).map((p) => ({
    stage: t(`status.${p.status}`),
    count: p.count,
    fill: p.fill,
  }))
  const topAssets = charts?.topAssets ?? []
  const severityHasData = severityData.some((s) => s.value > 0)

  const { data: activity } = useOrganizationActivity(organizationId)
  const activityItems = activity ?? []

  const handleViewAll = () =>
    toast.message(t('dashboard.org.viewAll.toast.title'), {
      description: t('dashboard.org.viewAll.toast.body'),
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
                  {t('dashboard.org.viewBadge')}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-accent/30 text-accent"
                >
                  {t('disclaimer.azCitizensOnly')}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {t('dashboard.org.title')}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t('dashboard.org.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border max-w-full">
                <Building2 className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">
                  {orgName}
                </span>
              </div>
              <Button asChild>
                <Link href="/dashboard/organization/programs/new">
                  {t('dashboard.org.myPrograms.create')}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats error banner */}
        {statsError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t('dashboard.org.stats.error.title')}
              </p>
              <p className="text-xs text-muted-foreground break-words">
                {statsError.message}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title={t('dashboard.org.stats.totalReports')}
            value={stats ? stats.totalReports : statPlaceholder}
            icon={FileText}
            delay={0}
          />
          <StatCard
            title={t('dashboard.org.stats.openReports')}
            value={stats ? stats.openReports : statPlaceholder}
            icon={Clock}
            delay={0.1}
          />
          <StatCard
            title={t('dashboard.org.stats.avgTriage')}
            value={
              stats
                ? stats.avgTriageHours !== null
                  ? `${stats.avgTriageHours}h`
                  : statPlaceholder
                : statPlaceholder
            }
            icon={TrendingUp}
            delay={0.2}
          />
          <StatCard
            title={t('dashboard.org.stats.critical')}
            value={stats ? stats.criticalFindings : statPlaceholder}
            icon={AlertTriangle}
            delay={0.3}
          />
          <StatCard
            title={t('dashboard.org.stats.rewardsPaid')}
            value={stats ? formatAZN(stats.rewardsPaid) : statPlaceholder}
            icon={DollarSign}
            delay={0.4}
          />
          <StatCard
            title={t('dashboard.org.stats.resolved')}
            value={stats ? stats.resolvedThisMonth : statPlaceholder}
            icon={CheckCircle}
            delay={0.5}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('dashboard.org.trend.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.org.trend.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartsError ? (
                <ChartError message={chartsError.message} t={t} />
              ) : !charts ? (
                <ChartSkeleton height={250} />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={timelineData}>
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
                    <Area
                      type="monotone"
                      dataKey="reports"
                      stackId="1"
                      stroke="var(--primary)"
                      fill="color-mix(in oklch, var(--primary) 20%, transparent)"
                      name={t('dashboard.org.trend.legend.reports')}
                    />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stackId="2"
                      stroke="var(--chart-3)"
                      fill="color-mix(in oklch, var(--chart-3) 20%, transparent)"
                      name={t('dashboard.org.trend.legend.resolved')}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {t('dashboard.org.severity.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.org.severity.subtitle')}
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

        {/* Pipeline & Recent Reports */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {t('dashboard.org.pipeline.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.org.pipeline.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartsError ? (
                <ChartError message={chartsError.message} t={t} />
              ) : !charts ? (
                <ChartSkeleton height={200} />
              ) : pipelineData.length === 0 ? (
                <ChartEmpty t={t} />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={pipelineData} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      type="number"
                      className="text-xs fill-muted-foreground"
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      width={90}
                      className="text-xs fill-muted-foreground"
                    />
                    <Tooltip {...chartTooltipProps} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {pipelineData.map((entry) => (
                        <Cell key={entry.stage} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t('dashboard.org.recent.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.org.recent.subtitle')}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewAll}>
                  {t('common.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.org.recent.empty')}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {t('dashboard.org.recent.col.report')}
                      </TableHead>
                      <TableHead>
                        {t('dashboard.org.recent.col.severity')}
                      </TableHead>
                      <TableHead>
                        {t('dashboard.org.recent.col.status')}
                      </TableHead>
                      <TableHead>
                        {t('dashboard.org.recent.col.submitted')}
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
                        <TableCell>
                          <SeverityBadge severity={report.severity} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={report.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          <FormattedDate
                            date={report.submittedDate}
                            options={{ month: 'short', day: 'numeric' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {t('dashboard.org.assets.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.org.assets.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topAssets.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.org.assets.empty')}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {topAssets.map((asset, index) => (
                    <div
                      key={asset.asset}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground truncate max-w-[140px]">
                            {asset.asset}
                          </p>
                          <SeverityBadge
                            severity={asset.severity}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          {asset.reports}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('dashboard.org.assets.reports')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {t('dashboard.org.activity.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.org.activity.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activityItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.org.activity.empty')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activityItems.map((item) => {
                    const Icon = activityIcons[item.type] ?? Activity
                    return (
                      <div key={item.id} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">
                            {t(`dashboard.org.activity.event.${item.type}`)}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.reportTitle}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <FormattedDate
                              date={item.createdAt}
                              options={{
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-warning" />
                {t('dashboard.org.topResearchers.title')}
              </CardTitle>
              <CardDescription>
                {t('dashboard.org.topResearchers.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {researchers.slice(0, 5).map((researcher, index) => (
                  <div
                    key={researcher.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0
                        ? 'bg-warning/10 border border-warning/30'
                        : 'bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-primary/20 text-primary'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {researcher.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('dashboard.org.topResearchers.reports', {
                            count: researcher.reportsAccepted,
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {researcher.countryCode}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My programs */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t('dashboard.org.myPrograms.title')}
                </CardTitle>
                <CardDescription>
                  {t('dashboard.org.myPrograms.subtitle')}
                </CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/dashboard/organization/programs/new">
                  {t('dashboard.org.myPrograms.create')}
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {myPrograms.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">
                  {t('dashboard.org.myPrograms.empty')}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/organization/programs/new">
                    {t('dashboard.org.myPrograms.create')}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {myPrograms.map((program) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug}`}
                    className="block rounded-lg border border-border bg-secondary/40 hover:bg-secondary hover:border-primary/50 transition-colors p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-foreground line-clamp-1">
                        {program.name}
                      </p>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {t(`programStatus.${program.status}`)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {program.description}
                    </p>
                    <p className="text-xs font-mono text-foreground">
                      {formatAZNRange(
                        program.rewardRange.min,
                        program.rewardRange.max,
                      )}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
