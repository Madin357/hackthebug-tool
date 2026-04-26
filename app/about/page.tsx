"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Target, 
  Users, 
  Award, 
  Globe, 
  Lock, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Building2,
  Code2,
  HeartHandshake
} from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We believe in proactive security. Finding vulnerabilities before malicious actors do is the foundation of a safer digital world."
  },
  {
    icon: HeartHandshake,
    title: "Ethical Hacking",
    description: "We promote responsible disclosure and ethical hacking practices. Every researcher on our platform agrees to our strict code of conduct."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our platform thrives because of our incredible community of security researchers who dedicate their skills to protecting organizations."
  },
  {
    icon: Award,
    title: "Fair Recognition",
    description: "We ensure researchers are fairly compensated for their findings. Good work deserves good pay and public recognition."
  }
]

const stats = [
  { value: "50,000+", label: "Security Researchers" },
  { value: "500+", label: "Partner Organizations" },
  { value: "100,000+", label: "Vulnerabilities Fixed" },
  { value: "$75M+", label: "Bounties Paid" }
]

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former security engineer at Google. 15+ years in cybersecurity.",
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-NSA analyst turned ethical hacker. Built security tools used by millions.",
    avatar: "MR"
  },
  {
    name: "Aisha Patel",
    role: "VP of Engineering",
    bio: "Led security teams at Amazon and Microsoft. PhD in Computer Security.",
    avatar: "AP"
  },
  {
    name: "James Wilson",
    role: "Head of Research",
    bio: "Published researcher with 50+ CVEs. Regular speaker at DEF CON and Black Hat.",
    avatar: "JW"
  }
]

const timeline = [
  {
    year: "2019",
    title: "The Beginning",
    description: "HackTheBug was founded with a mission to connect ethical hackers with organizations needing security testing."
  },
  {
    year: "2020",
    title: "Rapid Growth",
    description: "Reached 10,000 researchers and partnered with Fortune 500 companies. Paid out $5M in bounties."
  },
  {
    year: "2021",
    title: "Global Expansion",
    description: "Expanded to 100+ countries. Launched our enterprise platform and private bug bounty programs."
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description: "Named top bug bounty platform by SC Magazine. Community grew to 30,000 researchers."
  },
  {
    year: "2023",
    title: "Innovation",
    description: "Launched AI-powered vulnerability detection and automated triaging. Reached $50M in total bounties."
  },
  {
    year: "2024",
    title: "The Future",
    description: "Continuing to innovate with new tools, expanded scope coverage, and deeper integrations."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Making the Internet <span className="text-primary">Safer</span>, Together
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                HackTheBug connects the world&apos;s best security researchers with organizations 
                that need to protect their digital assets. We&apos;re building a safer internet, one bug at a time.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/programs">
                    Explore Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard/researcher">
                    Join as Researcher
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
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
                    <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                title="Our Mission"
                subtitle="Empowering security researchers and organizations to work together for a safer digital future."
              />
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Connect Talent with Opportunity</h4>
                    <p className="text-muted-foreground">We bridge the gap between skilled researchers and organizations that need their expertise.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Promote Responsible Disclosure</h4>
                    <p className="text-muted-foreground">We advocate for ethical hacking practices and responsible vulnerability disclosure.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Reward Excellence</h4>
                    <p className="text-muted-foreground">We ensure researchers are fairly compensated and recognized for their contributions.</p>
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
                <Card className="bg-gradient-to-br from-primary/10 to-blue-600/10 border-primary/20">
                  <CardContent className="p-6">
                    <Building2 className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">For Organizations</h4>
                    <p className="text-sm text-muted-foreground">
                      Access a global network of security experts to find vulnerabilities before attackers do.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border-blue-500/20">
                  <CardContent className="p-6">
                    <Code2 className="h-10 w-10 text-blue-400 mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">For Researchers</h4>
                    <p className="text-sm text-muted-foreground">
                      Get paid for finding bugs, build your reputation, and join an elite community.
                    </p>
                  </CardContent>
                </Card>
                <Card className="col-span-2 bg-gradient-to-r from-primary/5 to-blue-600/5">
                  <CardContent className="p-6">
                    <Globe className="h-10 w-10 text-cyan-400 mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Global Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Our community spans 100+ countries, protecting millions of users worldwide.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Our Values"
              subtitle="The principles that guide everything we do"
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-4 py-16">
          <SectionHeading
            title="Our Journey"
            subtitle="From a small idea to a global security platform"
            centered
          />
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 mb-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-1.5" />
                  
                  <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Leadership Team"
              subtitle="The people behind HackTheBug"
              centered
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">{member.avatar}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <CardContent className="p-8 md:p-12 text-center relative">
              <Lock className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Make the Internet Safer?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you&apos;re a security researcher looking for your next challenge or an organization 
                seeking to improve your security posture, we&apos;re here to help.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/programs">
                    Browse Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
