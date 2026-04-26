'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/i18n/locale-provider'

interface FormattedDateProps {
  date: string | Date
  options?: Intl.DateTimeFormatOptions
}

/**
 * Renders `en-US` on the server and on the first client paint, then swaps to
 * the user's selected locale after mount. This avoids hydration mismatches
 * caused by Node.js Intl shipping a smaller ICU data set than the browser
 * (e.g., `az-AZ` falls back to `M04 20` on the server but produces `20 apr`
 * in the browser).
 */
export function FormattedDate({ date, options }: FormattedDateProps) {
  const { locale } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const value = typeof date === 'string' ? new Date(date) : date
  const formatLocale = mounted && locale === 'az' ? 'az-AZ' : 'en-US'

  return <>{value.toLocaleDateString(formatLocale, options)}</>
}
