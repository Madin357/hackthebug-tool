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
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { platformStats } from '@/lib/mock-data'

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'We believe in proactive security. Finding vulnerabilities before malicious actors do is the foundation of a safer regional digital ecosystem.',
  },
  {
    icon: HeartHandshake,
    title: 'Ethical Hacking',
    description:
      'We promote responsible disclosure and ethical hacking practices. Every researcher on the platform agrees to a strict code of conduct.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'The platform is built to grow alongside an emerging community of regional security researchers — researchers who understand local context and compliance.',
  },
  {
    icon: Award,
    title: 'Fair Recognition',
    description:
      'Researchers should be fairly compensated for their findings. Transparent reward tiers and a public hall of fame are core, not optional.',
  },
]

const stats = [
  { value: platformStats.activePrograms.toString(), label: 'Active Programs' },
  {
    value: platformStats.verifiedResearchers.toString(),
    label: 'Verified Researchers',
  },
  {
    value: platformStats.reportsSubmitted.toLocaleString(),
    label: 'Reports Submitted',
  },
  {
    value: `${platformStats.organizationsJoined}`,
    label: 'Partner Organizations',
  },
]

const roles = [
  {
    abbr: 'ENG',
    title: 'Engineering',
    description: 'Frontend, design system, and the path to a real backend.',
    icon: Code2,
  },
  {
    abbr: 'DES',
    title: 'Design',
    description: 'Premium dark cybersecurity SaaS visual language and UX flows.',
    icon: Palette,
  },
  {
    abbr: 'SEC',
    title: 'Security Research',
    description:
      'Domain expertise — scope design, severity tiers, and disclosure workflows.',
    icon: Bug,
  },
  {
    abbr: 'PRD',
    title: 'Product',
    description:
      'Roadmap from prototype to launch — SİMA, organizations, researchers.',
    icon: Compass,
  },
]

const timeline = [
  {
    year: 'Q4 2025',
    title: 'Concept',
    description:
      'Identified the gap: Azerbaijan-focused digital products and organizations had no localized, trusted home for responsible disclosure and bug bounty programs.',
  },
  {
    year: 'Q1 2026',
    title: 'Design & Prototype',
    description:
      'Built the design system, mock data set, and core flows — landing, programs directory, program detail, dashboards, and report submission.',
  },
  {
    year: 'Q2 2026',
    title: 'AZCON Hackathon',
    description:
      'Frontend demo presented at the AZCON Hackathon. Currently here.',
  },
  {
    year: 'Q3 2026',
    title: 'Identity Verification & Private Beta',
    description:
      'Wire up SİMA verification for researchers and organizations. Onboard a small set of regional partners for closed testing.',
  },
  {
    year: 'Q4 2026',
    title: 'Backend, API & Public Launch',
    description:
      'Real database, API, notification system, and triage workflows. Open the platform to the first organizations and verified researchers.',
  },
]

export default function AboutPage() {
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
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              Hackathon Prototype
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              A trusted bug bounty platform for{' '}
              <span className="gradient-text">Azerbaijan&apos;s digital future</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              HackTheBug connects Azerbaijani organizations — banks, telecoms,
              government portals, fintech — with security researchers who can test
              responsibly and report vulnerabilities through a single, regional
              platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="glow-cyan">
                <Link href="/programs">
                  Explore Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/researcher">Researcher Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          Demo data for illustration purposes
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
              title="Our Mission"
              subtitle="Make responsible disclosure the default for Azerbaijan's digital infrastructure — and reward the people doing the work."
              badge="Mission"
            />
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Bring researchers and organizations into one room
                  </h4>
                  <p className="text-muted-foreground">
                    Today, regional security findings happen ad-hoc — by email, by
                    direct message, or not at all. HackTheBug is the structured
                    place to coordinate.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Verify researcher identity through SİMA
                  </h4>
                  <p className="text-muted-foreground">
                    Trust matters in security disclosure. Once integration ships,
                    verified researchers will unlock access to private programs and
                    higher-trust workflows.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Reward fairly, recognize publicly
                  </h4>
                  <p className="text-muted-foreground">
                    Transparent reward tiers per severity, and a public hall of
                    fame so researchers build a portable reputation.
                  </p>
                </div>
              </div>
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
                    For Organizations
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Publish a program, set scope and rewards, triage incoming
                    reports with clear SLAs.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
                <CardContent className="p-6">
                  <Code2 className="h-10 w-10 text-accent mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">
                    For Researchers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Find programs, test responsibly under safe-harbor terms, build
                    a public reputation.
                  </p>
                </CardContent>
              </Card>
              <Card className="col-span-2 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-6">
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">
                    Regional Focus
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Built for Azerbaijani context first — language, identity
                    verification, and partner organizations across banking,
                    telecom, government, and cloud.
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
            title="Our Values"
            subtitle="The principles that guide every product decision."
            badge="Values"
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
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
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
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
          title="Roadmap"
          subtitle="From a hackathon prototype to a launched, trusted regional platform."
          badge="Roadmap"
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
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — hackathon framing */}
      <section className="bg-card/30 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Built for AZCON Hackathon"
            subtitle="A focused team covering the four disciplines a security platform needs from day one."
            badge="Team Holberton"
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
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
                      {role.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {role.description}
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
              Want to see how it would work?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              The demo walks both sides of the platform — researchers browsing
              programs and organizations triaging reports. Real backend, real
              auth, and SİMA verification land in later milestones.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="glow-cyan">
                <Link href="/programs">
                  Browse Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/organization">Organization Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
