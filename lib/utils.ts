import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as AZN currency. Always uses `en-US` for the digit grouping
 * separator so server and client renders agree (avoids a hydration mismatch
 * the way locale-aware formatting did with `<FormattedDate>`).
 */
export function formatAZN(amount: number): string {
  return `${amount.toLocaleString('en-US')} AZN`
}

export function formatAZNRange(min: number, max: number): string {
  return `${min.toLocaleString('en-US')} - ${max.toLocaleString('en-US')} AZN`
}
