import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { LocaleProvider } from '@/lib/i18n/locale-provider'
import { DEFAULT_LOCALE } from '@/lib/i18n/dictionary'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { AccentProvider } from '@/lib/settings/accent-provider'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'HackTheBug - Bug Bounty Platform',
  description: 'Responsible security testing for modern digital platforms. Find vulnerabilities, reward researchers, strengthen trust.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      className={`bg-background ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AccentProvider>
            <LocaleProvider>
              <AuthProvider>
                <Navigation />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
                <Toaster />
                {process.env.NODE_ENV === 'production' && <Analytics />}
              </AuthProvider>
            </LocaleProvider>
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
