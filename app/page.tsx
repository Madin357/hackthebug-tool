'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Shield,
  Search,
  FileText,
  Award,
  Target,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Bug,
  Lock,
  BarChart3,
  Eye,
  Fingerprint,
  Flag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/section-heading'
import { ProgramCard } from '@/components/program-card'
import { useT } from '@/lib/i18n/locale-provider'
import { programs, platformStats } from '@/lib/mock-data'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const statsConfig = [
  { key: 'home.stats.activePrograms', icon: Target, value: platformStats.activePrograms.toString() },
  { key: 'home.stats.verifiedResearchers', icon: Users, value: platformStats.verifiedResearchers.toString() },
  { key: 'home.stats.reportsSubmitted', icon: FileText, value: platformStats.reportsSubmitted.toLocaleString() },
  { key: 'home.stats.avgTriage', icon: Clock, value: platformStats.avgTriageTime },
  { key: 'home.stats.rewardsPaid', icon: DollarSign, value: `$${(platformStats.rewardsPaid / 1000).toFixed(0)}K+` },
  { key: 'home.stats.organizations', icon: Shield, value: platformStats.organizationsJoined.toString() },
]

const howItWorks = [
  { step: 1, titleKey: 'home.how.step1.title', descKey: 'home.how.step1.desc', icon: Search },
  { step: 2, titleKey: 'home.how.step2.title', descKey: 'home.how.step2.desc', icon: Target },
  { step: 3, titleKey: 'home.how.step3.title', descKey: 'home.how.step3.desc', icon: FileText },
  { step: 4, titleKey: 'home.how.step4.title', descKey: 'home.how.step4.desc', icon: Award },
]

const features = [
  { titleKey: 'home.features.scope.title', descKey: 'home.features.scope.desc', icon: Target },
  { titleKey: 'home.features.reporting.title', descKey: 'home.features.reporting.desc', icon: FileText },
  { titleKey: 'home.features.rewards.title', descKey: 'home.features.rewards.desc', icon: DollarSign },
  { titleKey: 'home.features.leaderboard.title', descKey: 'home.features.leaderboard.desc', icon: BarChart3 },
  { titleKey: 'home.features.tracking.title', descKey: 'home.features.tracking.desc', icon: Eye },
  { titleKey: 'home.features.identity.title', descKey: 'home.features.identity.desc', icon: Fingerprint },
]

const roadmapPhases = [
  { labelKey: 'home.roadmap.frontendDemo', status: 'current' as const },
  { labelKey: 'home.roadmap.identity', status: 'planned' as const },
  { labelKey: 'home.roadmap.orgDashboard', status: 'planned' as const },
  { labelKey: 'home.roadmap.backend', status: 'planned' as const },
  { labelKey: 'home.roadmap.launch', status: 'future' as const },
]

export default function HomePage() {
  const t = useT()
  const featuredPrograms = programs.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="initial" animate="animate" variants={stagger}>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  <Bug className="mr-1 h-3 w-3" />
                  {t('home.hero.badge')}
                </Badge>
                <Badge variant="outline" className="border-accent/30 text-accent">
                  <Flag className="mr-1 h-3 w-3" />
                  {t('home.hero.azBadge')}
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
              >
                {t('home.hero.title.line1')}
                <br />
                <span className="gradient-text">
                  {t('home.hero.title.line2')}
                </span>
                <br />
                {t('home.hero.title.line3')}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg text-muted-foreground max-w-lg text-pretty"
              >
                {t('home.hero.subtitle')}
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="glow-cyan">
                  <Link href="/programs">
                    {t('home.hero.cta.explore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/leaderboard">
                    {t('home.hero.cta.leaderboard')}
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  {t('home.hero.simaNote')}
                </span>
              </motion.div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t('home.preview.dashboardTitle')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('home.preview.dashboardSubtitle')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{t('home.preview.live')}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { labelKey: 'home.preview.openReports', value: '18' },
                    { labelKey: 'home.preview.resolved', value: '156' },
                    { labelKey: 'home.preview.critical', value: '3' },
                    { labelKey: 'home.preview.rewards', value: '$12.5K' },
                  ].map((stat) => (
                    <div
                      key={stat.labelKey}
                      className="rounded-lg bg-secondary/50 p-3"
                    >
                      <p className="text-xs text-muted-foreground">
                        {t(stat.labelKey)}
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-secondary/30 p-4 h-32 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 90, 65].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/60 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>

                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                  {t('home.preview.prototype')}
                </div>
              </div>

              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {statsConfig.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{t(stat.key)}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            {t('common.demoBanner')}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('home.how.title')}
            subtitle={t('home.how.subtitle')}
            badge={t('home.how.badge')}
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="absolute -top-3 left-6 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mt-2">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('home.features.title')}
            subtitle={t('home.features.subtitle')}
            badge={t('home.features.badge')}
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <SectionHeading
              title={t('home.featured.title')}
              subtitle={t('home.featured.subtitle')}
              badge={t('home.featured.badge')}
              className="mb-0"
            />
            <Button asChild variant="outline" className="mt-6 sm:mt-0">
              <Link href="/programs">
                {t('home.featured.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrograms.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 sm:py-28 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                {t('home.value.badge')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t('home.value.title')}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('home.value.body')}
              </p>
              <ul className="space-y-3">
                {[
                  t('home.value.bullet1'),
                  t('home.value.bullet2'),
                  t('home.value.bullet3'),
                  t('home.value.bullet4'),
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {t('home.value.forOrgs.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('home.value.forOrgs.desc')}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Target className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {t('home.value.forResearchers.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('home.value.forResearchers.desc')}
                  </p>
                </div>
                <div className="col-span-2 rounded-xl border border-border bg-card p-6">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {t('home.value.forEveryone.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('home.value.forEveryone.desc')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Strip */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('home.roadmap.title')}
            subtitle={t('home.roadmap.subtitle')}
            badge={t('home.roadmap.badge')}
            centered
          />

          <div className="flex flex-wrap justify-center gap-4">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.labelKey}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                  phase.status === 'current'
                    ? 'bg-primary/20 border-primary text-primary'
                    : phase.status === 'planned'
                      ? 'bg-secondary border-border text-muted-foreground'
                      : 'bg-card border-border text-muted-foreground opacity-60'
                }`}
              >
                {phase.status === 'current' && (
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
                <span className="text-sm font-medium">{t(phase.labelKey)}</span>
                {phase.status === 'current' && (
                  <Badge
                    variant="outline"
                    className="ml-1 text-xs border-primary/30"
                  >
                    {t('home.roadmap.current')}
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

            <div className="relative">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                {t('home.cta.badge')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('home.cta.title')}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                {t('home.cta.body')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="glow-cyan">
                  <Link href="/programs">
                    {t('home.cta.browse')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard/researcher">
                    {t('home.cta.tryDashboard')}
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                {t('disclaimer.notLiveYet')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
