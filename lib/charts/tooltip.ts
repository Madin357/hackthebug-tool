/**
 * Shared recharts <Tooltip /> styling so every chart in the app stays
 * legible on the dark theme.
 *
 * The default recharts tooltip colors each *item* line in the same hue
 * as its bar / line / pie slice. That means "Critical: 1" gets painted
 * in the chart-5 hex (dark red), which becomes invisible on the
 * `--card` background. Forcing `itemStyle.color` to `--foreground`
 * keeps the text readable while the leading colored dot still gives
 * the legend cue.
 */

import type { CSSProperties } from 'react'

export const chartTooltipContentStyle: CSSProperties = {
  backgroundColor: 'var(--popover)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--popover-foreground)',
  boxShadow: '0 8px 24px color-mix(in oklch, black 30%, transparent)',
  padding: '8px 10px',
}

export const chartTooltipLabelStyle: CSSProperties = {
  color: 'var(--popover-foreground)',
  fontWeight: 500,
  marginBottom: '4px',
}

export const chartTooltipItemStyle: CSSProperties = {
  color: 'var(--popover-foreground)',
}

export const chartTooltipCursor = {
  fill: 'color-mix(in oklch, var(--primary) 8%, transparent)',
  stroke: 'color-mix(in oklch, var(--primary) 30%, transparent)',
}

/**
 * Spread on every <Tooltip /> inside a recharts chart:
 *   <Tooltip {...chartTooltipProps} />
 */
export const chartTooltipProps = {
  contentStyle: chartTooltipContentStyle,
  labelStyle: chartTooltipLabelStyle,
  itemStyle: chartTooltipItemStyle,
  cursor: chartTooltipCursor,
} as const
