import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', style: ['normal', 'italic'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://jmk-holiday-guest-house.vercel.app'),
  title: 'JMK Holiday Guest House | Stay in Sohra, Meghalaya',
  description:
    'A family-run guest house in Mawsmai, Sohra near Eco Park, with warm rooms, hot water, kitchen access and parking. Call or WhatsApp to book.',
  generator: 'v0.app',
  openGraph: {
    title: 'JMK Holiday Guest House | Stay in Sohra, Meghalaya',
    description: 'Warm rooms, hot water and a kitchen for groups near Eco Park, Sohra.',
    url: 'https://jmk-holiday-guest-house.vercel.app',
    images: ['/images/hero-sohra.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1f3d2f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
