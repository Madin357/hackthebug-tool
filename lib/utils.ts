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

/**
 * URL-safe slug from arbitrary text. Handles Azerbaijani diacritics
 * (ə → e, ş → s, etc.) so org / program names survive the trip to the
 * database. Returns empty string when the input has no usable characters.
 */
const SLUG_DIACRITICS: Record<string, string> = {
  ə: 'e',
  Ə: 'e',
  ı: 'i',
  İ: 'i',
  ş: 's',
  Ş: 's',
  ç: 'c',
  Ç: 'c',
  ğ: 'g',
  Ğ: 'g',
  ö: 'o',
  Ö: 'o',
  ü: 'u',
  Ü: 'u',
}

export function slugify(input: string): string {
  return input
    .trim()
    .replace(/./g, (ch) => SLUG_DIACRITICS[ch] ?? ch)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}
