'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Shield,
  Users,
  Award,
  Globe,
  Lock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Code2,
  HeartHandshake,
  Palette,
  Bug,
  Compass,
  Flag,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useT } from '@/lib/i18n/locale-provider'
import { platformStats } from '@/lib/mock-data'

const values = [
  {
    icon: Shield,
    titleKey: 'about.values.security.title',
    bodyKey: 'about.values.security.body',
  },
  {
    icon: HeartHandshake,
    titleKey: 'about.values.ethics.title',
    bodyKey: 'about.values.ethics.body',
  },
  {
    icon: Users,
    titleKey: 'about.values.community.title',
    bodyKey: 'about.values.community.body',
  },
  {
    icon: Award,
    titleKey: 'about.values.recognition.title',
    bodyKey: 'about.values.recognition.body',
  },
] as const

const roles = [
  {
    abbr: 'ENG',
    titleKey: 'about.team.eng.title',
    bodyKey: 'about.team.eng.body',
    icon: Code2,
  },
  {
    abbr: 'DES',
    titleKey: 'about.team.des.title',
    bodyKey: 'about.team.des.body',
    icon: Palette,
  },
  {
    abbr: 'SEC',
    titleKey: 'about.team.sec.title',
    bodyKey: 'about.team.sec.body',
    icon: Bug,
  },
  {
    abbr: 'PRD',
    titleKey: 'about.team.prd.title',
    bodyKey: 'about.team.prd.body',
    icon: Compass,
  },
] as const

const timeline = [
  {
    year: 'Q4 2025',
    titleKey: 'about.roadmap.q4_2025.title',
    bodyKey: 'about.roadmap.q4_2025.body',
  },
  {
    year: 'Q1 2026',
    titleKey: 'about.roadmap.q1_2026.title',
    bodyKey: 'about.roadmap.q1_2026.body',
  },
  {
    year: 'Q2 2026',
    titleKey: 'about.roadmap.q2_2026.title',
    bodyKey: 'about.roadmap.q2_2026.body',
  },
  {
    year: 'Q3 2026',
    titleKey: 'about.roadmap.q3_2026.title',
    bodyKey: 'about.roadmap.q3_2026.body',
  },
  {
    year: 'Q4 2026',
    titleKey: 'about.roadmap.q4_2026.title',
    bodyKey: 'about.roadmap.q4_2026.body',
  },
] as const

export default function AboutPage() {
  const t = useT()

  const stats = [
    {
      value: platformStats.activePrograms.toString(),
      labelKey: 'about.stats.label.activePrograms',
    },
    {
      value: platformStats.verifiedResearchers.toString(),
      labelKey: 'about.stats.label.verifiedResearchers',
    },
    {
      value: platformStats.reportsSubmitted.toLocaleString(),
      labelKey: 'about.stats.label.reportsSubmitted',
    },
    {
      value: platformStats.organizationsJoined.toString(),
      labelKey: 'about.stats.label.partnerOrgs',
    },
  ]

  return (
    <div className="py-8 sm:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {t('about.badge.prototype')}
              </Badge>
              <Badge variant="outline" className="border-accent/30 text-accent">
                <Flag className="mr-1 h-3 w-3" />
                {t('disclaimer.azCitizensOnly')}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t('about.hero.title.lead')}{' '}
              <span className="gradient-text">
                {t('about.hero.title.highlight')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              {t('about.hero.subtitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="glow-cyan">
                <Link href="/programs">
                  {t('about.hero.cta.explore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/researcher">
                  {t('about.hero.cta.dashboard')}
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto">
              {t('disclaimer.azCitizensLong')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{t(stat.labelKey)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          {t('common.demoBanner')}
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title={t('about.mission.title')}
              subtitle={t('about.mission.subtitle')}
              badge={t('about.mission.badge')}
            />
            <div className="space-y-4 mt-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {t(`about.mission.b${n}.title`)}
                    </h4>
                    <p className="text-muted-foreground">
                      {t(`about.mission.b${n}.body`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <Building2 className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('about.mission.forOrgs.title')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('about.mission.forOrgs.body')}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                <CardContent className="p-6">
                  <Code2 className="h-10 w-10 text-accent mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('about.mission.forResearchers.title')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('about.mission.forResearchers.body')}
                  </p>
                </CardContent>
              </Card>
              <Card className="col-span-2 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-6">
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">
                    {t('about.mission.regional.title')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('about.mission.regional.body')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card/30 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('about.values.title')}
            subtitle={t('about.values.subtitle')}
            badge={t('about.values.badge')}
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(value.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(value.bodyKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          title={t('about.roadmap.title')}
          subtitle={t('about.roadmap.subtitle')}
          badge={t('about.roadmap.badge')}
          centered
        />
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-6 mb-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-1.5" />
                <div
                  className={`flex-1 pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(item.bodyKey)}
                  </p>
                </div>
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-card/30 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('about.team.title')}
            subtitle={t('about.team.subtitle')}
            badge={t('about.team.badge')}
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {roles.map((role, index) => (
              <motion.div
                key={role.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <role.icon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xs font-mono text-muted-foreground tracking-widest mb-1">
                      {role.abbr}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(role.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(role.bodyKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 overflow-hidden relative">
          <CardContent className="p-8 md:p-12 text-center relative">
            <Lock className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('about.cta.body')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="glow-cyan">
                <Link href="/programs">
                  {t('about.cta.browse')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/organization">
                  {t('about.cta.orgDashboard')}
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              {t('disclaimer.notLiveYet')}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
