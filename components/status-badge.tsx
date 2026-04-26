'use client'

import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n/locale-provider'
import type { ReportStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: ReportStatus
  className?: string
}

const statusConfig: Record<ReportStatus, { className: string }> = {
  draft: {
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
  pending: {
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  triaged: {
    className: 'bg-primary/20 text-primary border-primary/30',
  },
  resolved: {
    className: 'bg-success/20 text-success border-success/30',
  },
  rewarded: {
    className: 'bg-accent/20 text-accent border-accent/30',
  },
  duplicate: {
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
  invalid: {
    className: 'bg-destructive/20 text-destructive border-destructive/30',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const t = useT()
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className,
      )}
    >
      {t(`status.${status}`)}
    </span>
  )
}
