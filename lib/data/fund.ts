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
    sector: 'Healthier F&B',
    entryValuation: '₹25Cr',
    latestValuation: '₹324Cr',
    multiple: '~12x',
    coInvestors: '—',
  },
  {
    company: 'Kilrr',
    sector: 'D2C Spices',
    entryValuation: '₹17Cr',
    latestValuation: '₹85Cr',
    multiple: '~5x',
    coInvestors: 'Anupam Mittal',
  },
  {
    company: 'Fishmongers',
    sector: 'Seafood Tech',
    entryValuation: '₹31Cr',
    latestValuation: '₹150Cr',
    multiple: '~5x',
    coInvestors: 'Rainmatter, Wavemaker, EIC Japan',
  },
  {
    company: 'Anveshan',
    sector: 'Natural Foods',
    entryValuation: '₹160Cr',
    latestValuation: '₹400Cr',
    multiple: '~2.5x',
    coInvestors: 'Wipro Consumer Care Ventures, DSGCP',
  },
  {
    company: 'Mekr',
    sector: 'Contract Manufacturing',
    entryValuation: '₹100Cr',
    latestValuation: '₹210Cr',
    multiple: '~2x',
    coInvestors: 'Titan Capital',
  },
]

export const portfolioCompanies: Company[] = [
  {
    name: 'Go Zero',
    slug: 'go-zero',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/letsgozero.in/w/400/h/400/logo',
  },
  {
    name: 'Anveshan',
    slug: 'anveshan',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/anveshan.farm/w/400/h/400/logo',
  },
  {
    name: 'Kilrr',
    slug: 'kilrr',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/kilrr.com/w/400/h/400/logo',
  },
  {
    name: 'Mekr',
    slug: 'mekr',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/mekr.in/w/400/h/400/logo',
  },
  {
    name: 'EVeez',
    slug: 'eveez',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/eveez.in/w/400/h/400/logo',
  },
  {
    name: 'Fiona Diamonds',
    slug: 'fiona-diamonds',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/fionadiamonds.com/w/400/h/400/logo',
  },
  {
    name: 'RocketPay',
    slug: 'rocketpay',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/rocketpay.in/w/400/h/400/logo',
  },
  {
    name: 'Kritsnam',
    slug: 'kritsnam',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/kritsnam.com/w/400/h/400/logo',
  },
  {
    name: 'SBNRI',
    slug: 'sbnri',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/sbnri.com/w/400/h/400/logo',
  },
  {
    name: 'Better Nutrition',
    slug: 'better-nutrition',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/betternutrition.in/w/400/h/400/logo',
  },
  {
    name: 'Wanderlooms',
    slug: 'wanderlooms',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/wanderlooms.com/w/400/h/400/logo',
  },
  {
    name: 'Woodsmen',
    slug: 'woodsmen',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/woodsmenwhiskey.com/w/400/h/400/logo',
  },
  {
    name: 'Kookar.AI',
    slug: 'kookar-ai',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/kookar.ai/w/400/h/400/logo',
  },
  {
    name: 'Epithera',
    slug: 'epithera',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/epithera.com/w/400/h/400/logo',
  },
  {
    name: 'Absolut Pet',
    slug: 'absolut-pet',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/absolutpet.in/w/400/h/400/logo',
  },
  {
    name: 'Relso',
    slug: 'relso',
    sector: '',
    logoPath: 'https://cdn.brandfetch.io/relso.com/w/400/h/400/logo',
  },
  {
    name: 'Fishmongers',
    slug: 'fishmongers',
    sector: '',
    logoPath: '/logos/fishmongers.svg',
  },
  {
    name: 'Basil',
    slug: 'basil',
    sector: '',
    logoPath: '/logos/basil.svg',
  },
  {
    name: 'Done Deal',
    slug: 'done-deal',
    sector: '',
    logoPath: '/logos/done-deal.svg',
  },
  {
    name: 'OctoLife',
    slug: 'octolife',
    sector: '',
    logoPath: '/logos/octolife.svg',
  },
  {
    name: 'Yuomo',
    slug: 'yuomo',
    sector: '',
    logoPath: '/logos/yuomo.svg',
  },
  {
    name: 'Anandi School',
    slug: 'anandi-school',
    sector: '',
    logoPath: '/logos/anandi-school.svg',
  },
  {
    name: 'ReplyAll',
    slug: 'replyall',
    sector: '',
    logoPath: '/logos/replyall.svg',
  },
  {
    name: 'Crest Wealth',
    slug: 'crest-wealth',
    sector: '',
    logoPath: '/logos/crest-wealth.svg',
  },
  {
    name: 'BetterPlace Health',
    slug: 'betterplace-health',
    sector: '',
    logoPath: '/logos/betterplace-health.svg',
  },
]

export const fundData: FundData = {
  name: 'The Barbershop Fund',
  subtitle: '\u20B925Cr Category-I AIF \u00B7 80 LPs \u00B7 2023\u20132025',
  stats: fundStats,
  standoutInvestments,
  portfolioCompanies,
}
