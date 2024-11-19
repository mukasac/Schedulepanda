// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SchedulerProvider } from '@/contexts/scheduler-context'
import { DraftsProvider } from '@/contexts/drafts-context'
import { TeamProvider } from '@/contexts/team-context'
import { NotificationProvider } from '@/contexts/notification-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soso - Social Media Scheduler',
  description: 'Efficiently schedule and manage your social media posts',
  keywords: 'social media, scheduler, posts, team management, analytics',
  authors: [{ name: 'Soso Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://soso-scheduler.com',
    title: 'Soso - Social Media Scheduler',
    description: 'Efficiently schedule and manage your social media posts',
    siteName: 'Soso',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soso - Social Media Scheduler',
    description: 'Efficiently schedule and manage your social media posts',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            <TeamProvider>
              <SchedulerProvider>
                <DraftsProvider>
                  <main className="min-h-screen bg-background">
                    {children}
                  </main>
                  <Toaster />
                </DraftsProvider>
              </SchedulerProvider>
            </TeamProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}