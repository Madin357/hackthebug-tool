import { cn } from '@/lib/utils'
import type { Severity } from '@/lib/types'

interface SeverityBadgeProps {
  severity: Severity
  className?: string
  showLabel?: boolean
}

const severityConfig = {
  critical: {
    label: 'Critical',
    className: 'bg-critical/20 text-critical border-critical/30',
    dotColor: 'bg-critical',
  },
  high: {
    label: 'High',
    className: 'bg-warning/20 text-warning border-warning/30',
    dotColor: 'bg-warning',
  },
  medium: {
    label: 'Medium',
    className: 'bg-primary/20 text-primary border-primary/30',
    dotColor: 'bg-primary',
  },
  low: {
    label: 'Low',
    className: 'bg-success/20 text-success border-success/30',
    dotColor: 'bg-success',
  },
  informational: {
    label: 'Info',
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
    dotColor: 'bg-muted-foreground',
  },
}

export function SeverityBadge({ severity, className, showLabel = true }: SeverityBadgeProps) {
  const config = severityConfig[severity]
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dotColor)} />
      {showLabel && config.label}
    </span>
  )
}
