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
import { useLocale } from '@/lib/i18n/locale-provider'
import {
  orgDashboardStats,
  reports,
  reportsTimeline,
  severityDistribution,
  topAttackedAssets,
  recentActivity,
  researchers,
} from '@/lib/mock-data'

const pipelineKeys = [
  { key: 'dashboard.org.pipeline.new', count: 8, fill: 'var(--chart-1)' },
  { key: 'dashboard.org.pipeline.triaging', count: 6, fill: 'var(--chart-2)' },
  {
    key: 'dashboard.org.pipeline.validating',
    count: 4,
    fill: 'var(--chart-3)',
  },
  { key: 'dashboard.org.pipeline.fixing', count: 12, fill: 'var(--chart-4)' },
  {
    key: 'dashboard.org.pipeline.resolved',
    count: 24,
    fill: 'var(--chart-5)',
  },
]

const activityIcons = {
  triage: Clock,
  reward: DollarSign,
  new: FileText,
  resolved: CheckCircle,
  update: Shield,
} as const

export default function OrganizationDashboardPage() {
  const { locale, t } = useLocale()
  const dateLocale = locale === 'az' ? 'az-AZ' : 'en-US'

  const pipelineData = pipelineKeys.map((p) => ({
    stage: t(p.key),
    count: p.count,
    fill: p.fill,
  }))

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
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  CaspianBank
                </span>
              </div>
              <Button>{t('dashboard.org.viewProgram')}</Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title={t('dashboard.org.stats.totalReports')}
            value={orgDashboardStats.totalReports}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
            delay={0}
          />
          <StatCard
            title={t('dashboard.org.stats.openReports')}
            value={orgDashboardStats.openReports}
            icon={Clock}
            delay={0.1}
          />
          <StatCard
            title={t('dashboard.org.stats.avgTriage')}
            value={orgDashboardStats.avgTriageTime}
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
            delay={0.2}
          />
          <StatCard
            title={t('dashboard.org.stats.critical')}
            value={orgDashboardStats.criticalFindings}
            icon={AlertTriangle}
            delay={0.3}
          />
          <StatCard
            title={t('dashboard.org.stats.rewardsPaid')}
            value={`$${(orgDashboardStats.rewardsPaid / 1000).toFixed(1)}K`}
            icon={DollarSign}
            delay={0.4}
          />
          <StatCard
            title={t('dashboard.org.stats.resolved')}
            value={orgDashboardStats.resolvedThisMonth}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
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
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={reportsTimeline}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis
                    dataKey="month"
                    className="text-xs fill-muted-foreground"
                  />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="reports"
                    stackId="1"
                    stroke="var(--primary)"
                    fill="color-mix(in oklch, var(--primary) 20%, transparent)"
                    name="Reports"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="2"
                    stroke="var(--chart-3)"
                    fill="color-mix(in oklch, var(--chart-3) 20%, transparent)"
                    name="Resolved"
                  />
                </AreaChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {severityDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
                <Button variant="outline" size="sm">
                  {t('common.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                        {new Date(report.submittedDate).toLocaleDateString(
                          dateLocale,
                          { month: 'short', day: 'numeric' },
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <div className="space-y-3">
                {topAttackedAssets.map((asset, index) => (
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
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon =
                    activityIcons[
                      activity.type as keyof typeof activityIcons
                    ] || Activity
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.target}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
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

        {/* Empty State Example */}
        <Card className="mt-6 border-dashed">
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('dashboard.org.empty.title')}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
              {t('dashboard.org.empty.body')}
            </p>
            <Badge variant="outline">{t('dashboard.org.empty.badge')}</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
