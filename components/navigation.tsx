'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserRound,
  BadgeCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SettingsMenu } from '@/components/settings-menu'
import { useT } from '@/lib/i18n/locale-provider'
import { useAuth, dashboardPathForRole } from '@/lib/auth/auth-provider'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const navItems = [
  { href: '/', key: 'nav.home' },
  { href: '/programs', key: 'nav.programs' },
  { href: '/leaderboard', key: 'nav.leaderboard' },
  { href: '/about', key: 'nav.about' },
]

const dashboardItems: Array<{ href: string; key: string; role: UserRole }> = [
  {
    href: '/dashboard/researcher',
    key: 'nav.dashboard.researcher',
    role: 'researcher',
  },
  {
    href: '/dashboard/organization',
    key: 'nav.dashboard.organization',
    role: 'organization',
  },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useT()
  const { status, session, logout } = useAuth()

  const isAuthed = status === 'authenticated' && session
  const visibleDashboardItems = isAuthed
    ? dashboardItems.filter((item) => item.role === session.role)
    : dashboardItems

  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
    router.push('/')
  }

  const isResearcher = isAuthed && session.role === 'researcher'

  const handleVerifyWithSima = () => {
    toast.message(t('nav.verify.sima.toast'))
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size={36} />
            <span className="text-lg font-semibold text-foreground">
              Hack<span className="text-primary">The</span>Bug
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Dashboard link — only visible when signed in */}
            {isAuthed && (
              <Link
                href={dashboardPathForRole(session.role)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname.startsWith('/dashboard')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )}
              >
                {t('nav.user.myDashboard')}
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isResearcher && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleVerifyWithSima}
                aria-label={t('nav.verify.sima.button')}
                className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary glow-cyan"
              >
                <BadgeCheck className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">
                  {t('nav.verify.sima.button')}
                </span>
              </Button>
            )}
            <SettingsMenu />
            {isAuthed ? (
              <UserMenu
                displayName={session.displayName}
                role={session.role}
                onLogout={handleLogout}
                t={t}
              />
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/register">{t('nav.cta.register')}</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">{t('nav.cta.login')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
              {isAuthed && (
                <div className="border-t border-border pt-2 mt-2">
                  <p className="px-4 py-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {t('nav.dashboard')}
                  </p>
                  {visibleDashboardItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                        pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
              <div className="pt-4 space-y-3">
                <SettingsMenu variant="block" />
                {isAuthed ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-3 py-2">
                      <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
                        <UserRound className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {session.displayName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t(`role.${session.role}`)}
                        </p>
                      </div>
                    </div>
                    {isResearcher && (
                      <Button
                        variant="outline"
                        className="w-full border-primary/40 text-primary hover:bg-primary/10 hover:text-primary glow-cyan"
                        onClick={handleVerifyWithSima}
                      >
                        <BadgeCheck className="h-4 w-4 mr-2" />
                        {t('nav.verify.sima.button')}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.cta.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.cta.register')}
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.cta.login')}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface UserMenuProps {
  displayName: string
  role: UserRole
  onLogout: () => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

function UserMenu({ displayName, role, onLogout, t }: UserMenuProps) {
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card/50 hover:bg-card pl-1.5 pr-3 py-1 transition-colors">
          <span className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
            {initials}
          </span>
          <span className="hidden lg:flex flex-col items-start leading-tight">
            <span className="text-xs font-medium text-foreground max-w-[140px] truncate">
              {displayName}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t(`role.${role}`)}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          {t('nav.user.signedInAs')}
          <br />
          <span className="font-medium text-foreground">{displayName}</span>
          <span className="text-muted-foreground"> · {t(`role.${role}`)}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            onLogout()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('nav.cta.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
