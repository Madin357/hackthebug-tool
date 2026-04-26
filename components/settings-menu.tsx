'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Check, Languages, Monitor, Moon, Settings, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n/locale-provider'
import { LOCALES, type Locale } from '@/lib/i18n/dictionary'
import { useAccent, type AccentId } from '@/lib/settings/accent-provider'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  az: 'Azərbaycan',
}

type ThemeId = 'light' | 'dark' | 'system'
const THEME_OPTIONS: Array<{
  id: ThemeId
  labelKey: string
  icon: typeof Sun
}> = [
  { id: 'light', labelKey: 'settings.theme.light', icon: Sun },
  { id: 'dark', labelKey: 'settings.theme.dark', icon: Moon },
  { id: 'system', labelKey: 'settings.theme.system', icon: Monitor },
]

interface SettingsMenuProps {
  /**
   * `header` (default) renders the gear button as a borderless icon
   * suitable for the navigation bar; `block` renders a full-width
   * variant for the mobile drawer.
   */
  variant?: 'header' | 'block'
}

export function SettingsMenu({ variant = 'header' }: SettingsMenuProps) {
  const { locale, setLocale, t } = useLocale()
  const { theme, setTheme } = useTheme()
  const { accent, setAccent, accents } = useAccent()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch on the theme icon — `useTheme()` is
  // unresolved on the server.
  useEffect(() => setMounted(true), [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={variant === 'block' ? 'default' : 'icon'}
          className={cn(
            variant === 'block' && 'w-full justify-start gap-2',
            variant === 'header' && 'h-9 w-9',
          )}
          aria-label={t('settings.label')}
        >
          <Settings className="h-4 w-4" />
          {variant === 'block' && (
            <span className="text-sm">{t('settings.label')}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[260px] p-3"
      >
        {/* ─── Language ─── */}
        <DropdownMenuLabel className="flex items-center gap-2 px-1 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Languages className="h-3.5 w-3.5" />
          {t('settings.language')}
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {LOCALES.map((code) => {
            const isActive = locale === code
            return (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={isActive}
                className={cn(
                  'flex items-center justify-between rounded-md border px-2.5 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/15 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30',
                )}
              >
                <span>{LOCALE_LABELS[code]}</span>
                {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            )
          })}
        </div>

        <DropdownMenuSeparator />

        {/* ─── Theme ─── */}
        <DropdownMenuLabel className="flex items-center gap-2 px-1 pt-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {mounted && theme === 'light' ? (
            <Sun className="h-3.5 w-3.5" />
          ) : mounted && theme === 'system' ? (
            <Monitor className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
          {t('settings.theme')}
        </DropdownMenuLabel>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isActive = mounted && theme === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                aria-pressed={isActive}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/15 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{t(opt.labelKey)}</span>
              </button>
            )
          })}
        </div>

        <DropdownMenuSeparator />

        {/* ─── Accent color ─── */}
        <DropdownMenuLabel className="px-1 pt-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('settings.accent')}
        </DropdownMenuLabel>
        <div className="flex flex-wrap items-center gap-2 px-1 pb-1">
          {accents.map((opt) => {
            const isActive = accent === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAccent(opt.id as AccentId)}
                aria-label={t(opt.labelKey)}
                aria-pressed={isActive}
                title={t(opt.labelKey)}
                className={cn(
                  'group relative flex h-8 w-8 items-center justify-center rounded-full transition-all',
                  isActive
                    ? 'ring-2 ring-offset-2 ring-offset-popover'
                    : 'hover:scale-110',
                )}
                style={
                  isActive
                    ? {
                        ['--tw-ring-color' as never]: opt.swatch,
                      }
                    : undefined
                }
              >
                <span
                  className="block h-7 w-7 rounded-full shadow-inner"
                  style={{ backgroundColor: opt.swatch }}
                />
                {isActive && (
                  <Check className="absolute h-4 w-4 text-white drop-shadow" />
                )}
              </button>
            )
          })}
        </div>
        <p className="mt-2 px-1 text-[11px] text-muted-foreground">
          {t('settings.accent.hint')}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
