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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/section-heading'
import { ProgramCard } from '@/components/program-card'
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

const stats = [
  { label: 'Active Programs', value: platformStats.activePrograms, icon: Target },
  { label: 'Verified Researchers', value: platformStats.verifiedResearchers, icon: Users },
  { label: 'Reports Submitted', value: platformStats.reportsSubmitted.toLocaleString(), icon: FileText },
  { label: 'Avg. Triage Time', value: platformStats.avgTriageTime, icon: Clock },
  { label: 'Rewards Paid', value: `$${(platformStats.rewardsPaid / 1000).toFixed(0)}K+`, icon: DollarSign },
  { label: 'Organizations', value: platformStats.organizationsJoined, icon: Shield },
]

const howItWorks = [
  {
    step: 1,
    title: 'Browse Programs',
    description: 'Explore active bug bounty and vulnerability disclosure programs from leading organizations.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Test Responsibly',
    description: 'Follow scope guidelines and test in-scope assets using ethical hacking practices.',
    icon: Target,
  },
  {
    step: 3,
    title: 'Submit Reports',
    description: 'Document your findings with detailed reports including steps to reproduce and impact.',
    icon: FileText,
  },
  {
    step: 4,
    title: 'Earn Recognition',
    description: 'Get rewarded for valid findings, build your reputation, and climb the leaderboard.',
    icon: Award,
  },
]

const features = [
  {
    title: 'Program Scope & Rules',
    description: 'Clear in-scope and out-of-scope definitions for every program.',
    icon: Target,
  },
  {
    title: 'Structured Reporting',
    description: 'Guided submission process for detailed, actionable vulnerability reports.',
    icon: FileText,
  },
  {
    title: 'Severity-Based Rewards',
    description: 'Transparent reward tiers based on vulnerability severity and impact.',
    icon: DollarSign,
  },
  {
    title: 'Researcher Leaderboard',
    description: 'Compete with peers and showcase your skills on the public leaderboard.',
    icon: BarChart3,
  },
  {
    title: 'Report Tracking',
    description: 'Real-time status updates from submission to resolution.',
    icon: Eye,
  },
  {
    title: 'Identity Verification',
    description: 'Coming soon: Secure researcher verification for enhanced trust.',
    icon: Fingerprint,
  },
]

const roadmapPhases = [
  { label: 'Frontend Demo', status: 'current' },
  { label: 'Identity Verification', status: 'planned' },
  { label: 'Organization Dashboard', status: 'planned' },
  { label: 'Backend & API', status: 'planned' },
  { label: 'Full Launch', status: 'future' },
]

export default function HomePage() {
  const featuredPrograms = programs.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
                  <Bug className="mr-1 h-3 w-3" />
                  Azerbaijan&apos;s First Bug Bounty Platform
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                Find Vulnerabilities.
                <br />
                <span className="gradient-text">Reward Researchers.</span>
                <br />
                Strengthen Trust.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg text-muted-foreground max-w-lg"
              >
                HackTheBug connects organizations with ethical hackers for responsible 
                security testing. Discover vulnerabilities before attackers do.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="glow-cyan">
                  <Link href="/programs">
                    Explore Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/leaderboard">View Leaderboard</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  Identity verification via SIMA coming soon
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
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Security Dashboard</p>
                      <p className="text-xs text-muted-foreground">Demo Preview</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Live</Badge>
                </div>

                {/* Mock Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Open Reports', value: '18' },
                    { label: 'Resolved', value: '156' },
                    { label: 'Critical', value: '3' },
                    { label: 'Rewards', value: '$12.5K' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-secondary/50 p-3">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Mock Chart Area */}
                <div className="rounded-lg bg-secondary/30 p-4 h-32 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 90, 65].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/60 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                  Prototype
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            Demo data for illustration purposes
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="A simple four-step process for researchers to find and report vulnerabilities responsibly."
            badge="Process"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.title}
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
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Platform Features"
            subtitle="Everything you need for effective bug bounty and vulnerability disclosure programs."
            badge="Features"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              title="Featured Programs"
              subtitle="Explore active bug bounty programs from leading organizations."
              badge="Programs"
              className="mb-0"
            />
            <Button asChild variant="outline" className="mt-6 sm:mt-0">
              <Link href="/programs">
                View All Programs
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
                Why HackTheBug?
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                A Trusted Platform for Regional Security
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Azerbaijan&apos;s digital transformation demands robust cybersecurity. HackTheBug provides 
                a localized, trusted platform connecting organizations with skilled security researchers 
                who understand regional contexts and compliance requirements.
              </p>
              <ul className="space-y-3">
                {[
                  'Local expertise with global security standards',
                  'Transparent reward structures and SLAs',
                  'Upcoming identity verification via SIMA',
                  'Safe harbor protection for ethical researchers',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
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
                  <h3 className="font-semibold text-foreground mb-2">For Organizations</h3>
                  <p className="text-sm text-muted-foreground">
                    Proactively find vulnerabilities before malicious actors do.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Target className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">For Researchers</h3>
                  <p className="text-sm text-muted-foreground">
                    Get recognized and rewarded for your security skills.
                  </p>
                </div>
                <div className="col-span-2 rounded-xl border border-border bg-card p-6">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">For Everyone</h3>
                  <p className="text-sm text-muted-foreground">
                    A more secure digital ecosystem benefits all stakeholders in the region.
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
            title="Development Roadmap"
            subtitle="Our journey from hackathon demo to production-ready platform."
            badge="Roadmap"
            centered
          />

          <div className="flex flex-wrap justify-center gap-4">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.label}
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
                <span className="text-sm font-medium">{phase.label}</span>
                {phase.status === 'current' && (
                  <Badge variant="outline" className="ml-1 text-xs border-primary/30">
                    Current
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
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            
            <div className="relative">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                Hackathon Demo
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Explore?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                This is a hackathon prototype showcasing the HackTheBug vision. 
                Explore the demo to see how the platform could work for researchers and organizations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="glow-cyan">
                  <Link href="/programs">
                    Browse Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard/researcher">Try Researcher Dashboard</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
