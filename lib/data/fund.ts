import type { FundData, Stat, Investment, Company } from '@/lib/types'

export const fundStats: Stat[] = [
  { value: 1.8, label: 'MOIC on \u20B920Cr Deployed', suffix: 'x', decimals: 1 },
  { value: 16, label: 'Investments Made', decimals: 0 },
  { value: 50, label: 'Portfolio with Follow-on Rounds', suffix: '%+', decimals: 0 },
  { value: 5, label: 'Companies Featured on Shark Tank India', decimals: 0 },
]

export const standoutInvestments: Investment[] = [
  {
    company: 'Go Zero',
    sector: '[Sector]',
    entryValuation: '[Entry]',
    latestValuation: '[Latest]',
    multiple: '[Multiple]',
    coInvestors: '[Co-investors]',
  },
  {
    company: 'Kilrr',
    sector: '[Sector]',
    entryValuation: '[Entry]',
    latestValuation: '[Latest]',
    multiple: '[Multiple]',
    coInvestors: '[Co-investors]',
  },
  {
    company: 'Fishmongers',
    sector: '[Sector]',
    entryValuation: '[Entry]',
    latestValuation: '[Latest]',
    multiple: '[Multiple]',
    coInvestors: '[Co-investors]',
  },
  {
    company: 'Anveshan',
    sector: '[Sector]',
    entryValuation: '[Entry]',
    latestValuation: '[Latest]',
    multiple: '[Multiple]',
    coInvestors: '[Co-investors]',
  },
  {
    company: 'Mekr',
    sector: '[Sector]',
    entryValuation: '[Entry]',
    latestValuation: '[Latest]',
    multiple: '[Multiple]',
    coInvestors: '[Co-investors]',
  },
]

export const portfolioCompanies: Company[] = Array.from({ length: 25 }, (_, i) => ({
  name: `Company ${i + 1}`,
  slug: `company-${i + 1}`,
  sector: '[Sector]',
  logoPath: `/logos/company-${i + 1}.svg`,
}))

export const fundData: FundData = {
  name: 'The Barbershop Fund',
  subtitle: '\u20B925Cr Category-I AIF \u00B7 80 LPs \u00B7 2023\u20132025',
  stats: fundStats,
  standoutInvestments,
  portfolioCompanies,
}
