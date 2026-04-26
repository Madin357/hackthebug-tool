'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  badge?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, subtitle, badge, centered = false, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-12',
        centered && 'text-center',
        className
      )}
    >
      {badge && (
        <span className="inline-block mb-4 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
