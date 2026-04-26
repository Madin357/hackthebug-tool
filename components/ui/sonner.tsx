'use client'

import { Toaster as SonnerToaster } from 'sonner'

/**
 * Project-wide toast surface. Mounted once in `app/layout.tsx`. Use
 * `import { toast } from 'sonner'` from any client component to call it
 * (e.g., `toast.success(...)`, `toast.error(...)`,
 * `toast.message('Coming soon')`).
 *
 * Theme is locked to `dark` to match the rest of the app — `next-themes`
 * is not wired up.
 */
export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'rounded-xl border border-border bg-card text-foreground shadow-lg',
          description: 'text-muted-foreground',
        },
      }}
    />
  )
}
