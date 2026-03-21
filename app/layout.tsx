import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { LenisProvider } from '@/components/ui/LenisProvider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
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
  metadataBase: new URL('https://vidit-portfolio-vert.vercel.app'),
  title: 'Vidit Dugar — Builder. Investor. Storyteller.',
  description: 'Third-generation entrepreneur. Formerly Nomura London, Bombay Shaving Company. Builder of The Bridge and The Orly Times.',
  openGraph: {
    type: 'website',
    title: 'Vidit Dugar — Builder. Investor. Storyteller.',
    description: 'Third-generation entrepreneur. Formerly Nomura London, Bombay Shaving Company. Builder of The Bridge and The Orly Times.',
    url: 'https://vidit-portfolio-vert.vercel.app',
    siteName: 'Vidit Dugar',
  },
  twitter: {
    card: 'summary',
    title: 'Vidit Dugar — Builder. Investor. Storyteller.',
    description: 'Third-generation entrepreneur. Formerly Nomura London, Bombay Shaving Company. Builder of The Bridge and The Orly Times.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
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
