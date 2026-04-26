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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  researcherDashboardStats,
  reports,
  researcherReportsTimeline,
  severityDistribution,
  programs,
  researchers,
} from '@/lib/mock-data'

const currentResearcher = researchers[0]

const badges = [
  { name: 'First Blood', icon: Target, color: 'text-critical' },
  { name: 'Critical Hunter', icon: Shield, color: 'text-warning' },
  { name: 'Top 10', icon: Trophy, color: 'text-primary' },
]

const recommendedPrograms = programs.filter((p) => p.status === 'active').slice(0, 3)

const savedPrograms = programs.slice(0, 2)

export default function ResearcherDashboardPage() {
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
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">Demo View</Badge>
                <Badge variant="secondary" className="text-xs">Researcher Dashboard</Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {currentResearcher.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your reports, rewards, and reputation.
              </p>
            </div>
            <Button asChild>
              <Link href="/programs">
                Find Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Reports Submitted"
            value={researcherDashboardStats.totalReports}
            icon={FileText}
            delay={0}
          />
          <StatCard
            title="Accepted"
            value={researcherDashboardStats.acceptedReports}
            icon={CheckCircle}
            delay={0.1}
          />
          <StatCard
            title="Pending Triage"
            value={researcherDashboardStats.pendingTriage}
            icon={Clock}
            delay={0.2}
          />
          <StatCard
            title="Total Rewards"
            value={`$${researcherDashboardStats.totalRewards.toLocaleString()}`}
            icon={DollarSign}
            delay={0.3}
          />
          <StatCard
            title="Reputation"
            value={researcherDashboardStats.reputationScore}
            icon={Star}
            delay={0.4}
          />
          <StatCard
            title="Global Rank"
            value={`#${researcherDashboardStats.rank}`}
            icon={Trophy}
            delay={0.5}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Reports Timeline Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Reports Over Time
              </CardTitle>
              <CardDescription>Your submission activity over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={researcherReportsTimeline}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="reports" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Severity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Findings by Severity
              </CardTitle>
              <CardDescription>Distribution of your accepted reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={severityDistribution.slice(0, 4)}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {severityDistribution.slice(0, 4).map((entry, index) => (
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
                {severityDistribution.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs">
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

        {/* Recent Reports & Sidebar */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Reports Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Submissions
                  </CardTitle>
                  <CardDescription>Your latest vulnerability reports</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Reward</TableHead>
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
                          <p className="text-xs text-muted-foreground">{report.asset}</p>
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
                        {report.reward ? `$${report.reward.toLocaleString()}` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="h-5 w-5 text-warning" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.name}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
                        <badge.icon className={`h-5 w-5 ${badge.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">Earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification Banner */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Identity Verification</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      SIMA verification coming soon. Get verified to access exclusive programs.
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Saved Programs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" />
                  Saved Programs
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                        <p className="font-medium text-foreground text-sm">{program.name}</p>
                        <p className="text-xs text-muted-foreground">{program.organization}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ${program.rewardRange.max.toLocaleString()} max
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Programs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-warning" />
                  Recommended for You
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/programs">Browse All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                        <p className="font-medium text-foreground text-sm">{program.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-xs">
                            {program.industry}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {program.assetsCount} assets
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
