import type { Stat } from '@/lib/types'

// Used in the Barbershop Fund section (not the hero)
export const heroStats: Stat[] = [
  { value: 16, label: 'Early-Stage Investments', decimals: 0 },
  { value: 1.8, label: 'Fund MOIC', suffix: 'x', decimals: 1 },
  { value: 20, label: 'Capital Deployed', prefix: '\u20B9', suffix: 'Cr', decimals: 0 },
  { value: 50, label: 'Portfolio with Follow-on Rounds', suffix: '%+', decimals: 0 },
]

export const heroHeadshot: string = '/vidit-headshot.jpg' // 506×900 portrait — from LinkedIn export 2026-03-19

export const heroIdentity = {
  name: 'VIDIT DUGAR',
  descriptor: 'Investor. Operator. Builder.',
  subline: 'Formerly Nomura London \u00B7 Bombay Shaving Company \u00B7 The Barbershop Fund',
}

export const heroChapters = [
  { label: 'Investment Banking' },
  { label: 'Venture Capital' },
  { label: 'Operator' },
  { label: 'Content & Media' },
  { label: 'Chief of Staff' },
  { label: 'Founder' },
]

export const heroCities = ['London', 'Kolkata', 'Delhi', 'Mumbai']
