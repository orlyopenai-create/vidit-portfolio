import type { Stat } from '@/lib/types'

export const heroStats: Stat[] = [
  { value: 16, label: 'Early-Stage Investments', decimals: 0 },
  { value: 1.8, label: 'Fund MOIC', suffix: 'x', decimals: 1 },
  { value: 20, label: 'Capital Deployed', prefix: '\u20B9', suffix: 'Cr', decimals: 0 },
  { value: 50, label: 'Portfolio with Follow-on Rounds', suffix: '%+', decimals: 0 },
]

export const heroHeadshot: string | null = null // [Photo - Vidit to upload]

export const heroIdentity = {
  name: 'VIDIT DUGAR',
  descriptor: 'Investor. Operator. Builder.',
  subline: 'Formerly Nomura London \u00B7 Bombay Shaving Company \u00B7 The Barbershop Fund',
}
