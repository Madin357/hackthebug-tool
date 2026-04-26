'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Clock, DollarSign, Target, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormattedDate } from '@/components/formatted-date'
import { cn } from '@/lib/utils'
import { useT } from '@/lib/i18n/locale-provider'
import type { Program } from '@/lib/types'

interface ProgramCardProps {
  program: Program
  index?: number
}

const statusColors = {
  active: 'bg-success/20 text-success border-success/30',
  upcoming: 'bg-warning/20 text-warning border-warning/30',
  paused: 'bg-muted text-muted-foreground border-muted',
  closed: 'bg-destructive/20 text-destructive border-destructive/30',
}

export function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  const t = useT()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {program.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {program.organization}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn('shrink-0', statusColors[program.status])}
          >
            {t(`programStatus.${program.status}`)}
          </Badge>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {program.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {t(`programType.${program.type}`)}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {program.industry}
          </Badge>
          {program.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t('programCard.rewards')}
              </p>
              <p className="text-sm font-medium text-foreground">
                ${program.rewardRange.min} - $
                {program.rewardRange.max.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t('programCard.assets')}
              </p>
              <p className="text-sm font-medium text-foreground">
                {program.assetsCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">
                {t('programCard.updated')}
              </p>
              <p className="text-sm font-medium text-foreground">
                <FormattedDate
                  date={program.lastUpdated}
                  options={{ month: 'short', day: 'numeric' }}
                />
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Button
            asChild
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Link href={`/programs/${program.slug}`}>
              {t('programCard.viewProgram')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Featured indicator */}
      {program.featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
            {t('programCard.featured')}
          </div>
        </div>
      )}
    </motion.div>
  )
}
