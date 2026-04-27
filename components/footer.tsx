'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { useT } from '@/lib/i18n/locale-provider'

const platformLinks = [
  { href: '/programs', key: 'nav.programs' },
  { href: '/leaderboard', key: 'nav.leaderboard' },
  { href: '/dashboard/researcher', key: 'footer.dashboardResearcher' },
  { href: '/dashboard/organization', key: 'footer.dashboardOrganization' },
]

const resourceLinks = [
  { href: '/about', key: 'footer.about' },
  { href: '/about#faq', key: 'footer.faq' },
  { href: '/about#how-it-works', key: 'footer.howItWorks' },
]

const legalLinks = [
  { href: '#', key: 'footer.privacy' },
  { href: '#', key: 'footer.terms' },
  { href: '#', key: 'footer.safeHarbor' },
]

export function Footer() {
  const t = useT()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={36} />
              <span className="text-lg font-semibold text-foreground">
                Hack<span className="text-primary">The</span>Bug
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="mt-4 text-xs text-muted-foreground border border-border rounded-md px-3 py-2 inline-block">
              {t('disclaimer.azCitizensOnly')}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t('footer.platform')}
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {t('common.hackathonDemo')}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('common.fictionalDataNote')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
