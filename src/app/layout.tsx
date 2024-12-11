// src/app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/providers'
import { Analytics } from '@/components/analytics'
import { TailwindIndicator } from '../components/tailwind-indicator'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://soso-scheduler.com'),
  title: {
    default: 'Soso - Social Media Scheduler',
    template: '%s | Soso'
  },
  description: 'Efficiently schedule and manage your social media posts across multiple platforms',
  keywords: [
    'social media',
    'scheduler',
    'posts',
    'team management',
    'analytics',
    'content planning',
    'social media management',
    'marketing tools'
  ],
  authors: [
    {
      name: 'Soso Team',
      url: 'https://soso-scheduler.com/team',
    }
  ],
  creator: 'Soso Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://soso-scheduler.com',
    title: 'Soso - Social Media Scheduler',
    description: 'Efficiently schedule and manage your social media posts',
    siteName: 'Soso',
    images: [
      {
        url: 'https://soso-scheduler.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Soso Social Media Scheduler'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soso - Social Media Scheduler',
    description: 'Efficiently schedule and manage your social media posts',
    creator: '@soso_scheduler',
    images: ['https://soso-scheduler.com/twitter-image.jpg']
  },
  manifest: 'https://soso-scheduler.com/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <ClerkProvider>
        <body className="min-h-screen bg-background font-sans antialiased">
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
            <TailwindIndicator />
          </Providers>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  )
}