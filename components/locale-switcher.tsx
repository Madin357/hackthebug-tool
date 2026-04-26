'use client'

import { Languages } from 'lucide-react'
import { useLocale } from '@/lib/i18n/locale-provider'
import { LOCALES, type Locale } from '@/lib/i18n/dictionary'
import { cn } from '@/lib/utils'

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  az: 'AZ',
}

interface LocaleSwitcherProps {
  className?: string
  variant?: 'inline' | 'block'
}

export function LocaleSwitcher({
  className,
  variant = 'inline',
}: LocaleSwitcherProps) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      role="group"
      aria-label={t('nav.lang.label')}
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-border bg-card/60 p-1',
        variant === 'block' && 'w-full justify-center',
        className,
      )}
    >
      <Languages
        aria-hidden
        className="h-4 w-4 text-muted-foreground mx-1.5 shrink-0"
      />
      {LOCALES.map((code) => {
        const isActive = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
              isActive
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
            )}
          >
            {LOCALE_LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
