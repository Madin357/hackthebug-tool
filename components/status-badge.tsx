import { cn } from '@/lib/utils'
import type { ReportStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: ReportStatus
  className?: string
}

const statusConfig = {
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
  pending: {
    label: 'Pending',
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  triaged: {
    label: 'Triaged',
    className: 'bg-primary/20 text-primary border-primary/30',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-success/20 text-success border-success/30',
  },
  rewarded: {
    label: 'Rewarded',
    className: 'bg-accent/20 text-accent border-accent/30',
  },
  duplicate: {
    label: 'Duplicate',
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
  invalid: {
    label: 'Invalid',
    className: 'bg-destructive/20 text-destructive border-destructive/30',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
