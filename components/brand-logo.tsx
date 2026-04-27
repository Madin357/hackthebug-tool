import { cn } from '@/lib/utils'

interface BrandLogoProps {
  size?: number
  className?: string
}

export function BrandLogo({ size = 36, className }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={cn('text-primary shrink-0', className)}
    >
      <rect width="64" height="64" rx="10" fill="#000404" />
      <g fill="currentColor">
        <rect x="18" y="12" width="8" height="40" rx="1.5" />
        <rect x="38" y="12" width="8" height="40" rx="1.5" />
        <rect x="26" y="29" width="12" height="6" rx="1" />
      </g>
    </svg>
  )
}
