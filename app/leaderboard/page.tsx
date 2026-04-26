'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Trophy,
  Medal,
  Bug,
  DollarSign,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  Target,
} from 'lucide-react'
import { useT } from '@/lib/i18n/locale-provider'
import { formatAZN } from '@/lib/utils'
import { researchers } from '@/lib/mock-data'

const timeframeKeys = [
  { value: 'all-time', key: 'leaderboard.timeframe.allTime' },
  { value: 'this-year', key: 'leaderboard.timeframe.thisYear' },
  { value: 'this-month', key: 'leaderboard.timeframe.thisMonth' },
  { value: 'this-week', key: 'leaderboard.timeframe.thisWeek' },
] as const

const categoryKeys = [
  { value: 'overall', key: 'leaderboard.category.overall' },
  { value: 'web', key: 'leaderboard.category.web' },
  { value: 'mobile', key: 'leaderboard.category.mobile' },
  { value: 'api', key: 'leaderboard.category.api' },
  { value: 'crypto', key: 'leaderboard.category.crypto' },
] as const

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-warning" />
    case 2:
      return <Medal className="h-6 w-6 text-muted-foreground" />
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />
    default:
      return (
        <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
      )
  }
}

function getRankBgClass(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-warning/20 to-amber-500/20 border-warning/50'
    case 2:
      return 'bg-gradient-to-r from-muted/40 to-muted/20 border-muted-foreground/30'
    case 3:
      return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50'
    default:
      return 'bg-card border-border'
  }
}

export default function LeaderboardPage() {
  const t = useT()
  const [timeframe, setTimeframe] = useState('all-time')
  const [category, setCategory] = useState('overall')

  const topThree = researchers.slice(0, 3)

  return (
    <div className="py-8 sm:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 border-accent/30 text-accent"
            >
              {t('disclaimer.azCitizensOnly')}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {t('leaderboard.title')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {t('leaderboard.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t('leaderboard.filter.timeframe')} />
            </SelectTrigger>
            <SelectContent>
              {timeframeKeys.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {t(tf.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t('leaderboard.filter.category')} />
            </SelectTrigger>
            <SelectContent>
              {categoryKeys.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {t(cat.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8">
          {/* Second */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1 w-full md:w-72"
          >
            <Card className={`${getRankBgClass(2)} overflow-hidden`}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{getRankIcon(2)}</div>
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-muted-foreground/30">
                  <AvatarFallback>
                    {topThree[1]?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {topThree[1]?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {topThree[1]?.country}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      {t('leaderboard.podium.points')}
                    </p>
                    <p className="font-bold text-foreground">
                      {topThree[1]?.points.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      {t('leaderboard.podium.reports')}
                    </p>
                    <p className="font-bold text-foreground">
                      {topThree[1]?.reportsAccepted}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-1 md:order-2 w-full md:w-80"
          >
            <Card
              className={`${getRankBgClass(1)} overflow-hidden transform md:scale-110`}
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">{getRankIcon(1)}</div>
                <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-warning/50">
                  <AvatarFallback>
                    {topThree[0]?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {topThree[0]?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {topThree[0]?.country}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">
                      {t('leaderboard.podium.points')}
                    </p>
                    <p className="font-bold text-xl text-foreground">
                      {topThree[0]?.points.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      {t('leaderboard.podium.reports')}
                    </p>
                    <p className="font-bold text-xl text-foreground">
                      {topThree[0]?.reportsAccepted}
                    </p>
                  </div>
                </div>
                <Badge className="bg-warning/20 text-warning border-warning/50">
                  <Zap className="h-3 w-3 mr-1" />
                  {t('leaderboard.podium.topResearcher')}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Third */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="order-3 w-full md:w-72"
          >
            <Card className={`${getRankBgClass(3)} overflow-hidden`}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{getRankIcon(3)}</div>
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-amber-600/50">
                  <AvatarFallback>
                    {topThree[2]?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {topThree[2]?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {topThree[2]?.country}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      {t('leaderboard.podium.points')}
                    </p>
                    <p className="font-bold text-foreground">
                      {topThree[2]?.points.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      {t('leaderboard.podium.reports')}
                    </p>
                    <p className="font-bold text-foreground">
                      {topThree[2]?.reportsAccepted}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Full Rankings */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="rankings">
              {t('leaderboard.tabs.rankings')}
            </TabsTrigger>
            <TabsTrigger value="stats">
              {t('leaderboard.tabs.stats')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rankings">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-muted-foreground font-medium">
                          {t('leaderboard.table.rank')}
                        </th>
                        <th className="text-left p-4 text-muted-foreground font-medium">
                          {t('leaderboard.table.researcher')}
                        </th>
                        <th className="text-left p-4 text-muted-foreground font-medium hidden md:table-cell">
                          {t('leaderboard.table.country')}
                        </th>
                        <th className="text-right p-4 text-muted-foreground font-medium">
                          {t('leaderboard.table.points')}
                        </th>
                        <th className="text-right p-4 text-muted-foreground font-medium hidden sm:table-cell">
                          {t('leaderboard.table.reports')}
                        </th>
                        <th className="text-right p-4 text-muted-foreground font-medium hidden lg:table-cell">
                          {t('leaderboard.table.rewards')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {researchers.map((researcher, index) => (
                        <motion.tr
                          key={researcher.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center justify-center w-10">
                              {getRankIcon(index + 1)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                  {researcher.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">
                                  {researcher.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  @{researcher.handle}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell text-muted-foreground">
                            {researcher.country}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <TrendingUp className="h-4 w-4 text-primary hidden sm:block" />
                              <span className="font-bold text-foreground">
                                {researcher.points.toLocaleString()}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right hidden sm:table-cell">
                            <div className="flex items-center justify-end gap-2">
                              <Bug className="h-4 w-4 text-critical" />
                              <span className="text-foreground">
                                {researcher.reportsAccepted}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right hidden lg:table-cell">
                            <div className="flex items-center justify-end gap-2">
                              <DollarSign className="h-4 w-4 text-primary" />
                              <span className="font-medium text-foreground">
                                {formatAZN(researcher.totalRewards)}
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Bug className="h-12 w-12 text-critical mx-auto mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-2">
                    {researchers
                      .reduce((acc, r) => acc + r.reportsAccepted, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">
                    {t('leaderboard.stats.totalReports')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-2">
                    {formatAZN(
                      researchers.reduce(
                        (acc, r) => acc + r.totalRewards,
                        0,
                      ),
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {t('leaderboard.stats.totalRewards')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-2">
                    {researchers.length}
                  </p>
                  <p className="text-muted-foreground">
                    {t('leaderboard.stats.activeResearchers')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-warning mx-auto mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-2">
                    {Math.round(
                      researchers.reduce(
                        (acc, r) => acc + r.reportsAccepted,
                        0,
                      ) / researchers.length,
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    {t('leaderboard.stats.avgReports')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('leaderboard.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('leaderboard.cta.body')}
            </p>
            <Button size="lg" asChild>
              <Link href="/programs">{t('leaderboard.cta.browse')}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
