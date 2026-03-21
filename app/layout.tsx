import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter, DM_Mono } from 'next/font/google'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { LenisProvider } from '@/components/ui/LenisProvider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-subheading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://viditdugar.orlyfashion.com'),
  title: 'Vidit Dugar — Investments. Operations. Content.',
  description: 'Portfolio of Vidit Dugar. Formerly Nomura London, Bombay Shaving Company, Orly.',
  openGraph: {
    type: 'website',
    title: 'Vidit Dugar — Investments. Operations. Content.',
    description: 'Portfolio of Vidit Dugar. Formerly Nomura London, Bombay Shaving Company, Orly.',
    url: 'https://viditdugar.orlyfashion.com',
    siteName: 'Vidit Dugar',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Vidit Dugar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidit Dugar — Investments. Operations. Content.',
    description: 'Portfolio of Vidit Dugar. Formerly Nomura London, Bombay Shaving Company, Orly.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${dmMono.variable}`}>
      <body className="font-body antialiased">
        <MotionProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
