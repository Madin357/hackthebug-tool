import Link from 'next/link'
import { Bug, Github, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  platform: [
    { href: '/programs', label: 'Programs' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/dashboard/researcher', label: 'Researcher Dashboard' },
    { href: '/dashboard/organization', label: 'Organization Dashboard' },
  ],
  resources: [
    { href: '/about', label: 'About' },
    { href: '/about#faq', label: 'FAQ' },
    { href: '/about#how-it-works', label: 'How It Works' },
  ],
  legal: [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Safe Harbor' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Bug className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                Hack<span className="text-primary">The</span>Bug
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Responsible security testing for modern digital platforms. Connecting organizations with ethical hackers in Azerbaijan and beyond.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 HackTheBug. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              Hackathon Demo
            </span>
            <span className="text-xs text-muted-foreground">
              Fictional programs and sample data
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
