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
  { name: 'Go Zero',           slug: 'go-zero',           sector: '', logoPath: '/logos/go-zero.jpeg' },
  { name: 'Anveshan',          slug: 'anveshan',          sector: '', logoPath: '/logos/anveshan.png' },
  { name: 'Kilrr',             slug: 'kilrr',             sector: '', logoPath: '/logos/kilrr.jpeg' },
  { name: 'Mekr',              slug: 'mekr',              sector: '', logoPath: '/logos/mekr.png' },
  { name: 'EVeez',             slug: 'eveez',             sector: '', logoPath: '/logos/eveez.png' },
  { name: 'Fiona Diamonds',    slug: 'fiona-diamonds',    sector: '', logoPath: '/logos/fiona-diamonds.png' },
  { name: 'RocketPay',         slug: 'rocketpay',         sector: '', logoPath: '/logos/rocketpay.png' },
  { name: 'Kritsnam',          slug: 'kritsnam',          sector: '', logoPath: '/logos/kritsnam.png' },
  { name: 'SBNRI',             slug: 'sbnri',             sector: '', logoPath: '/logos/sbnri.png' },
  { name: 'Better Nutrition',  slug: 'better-nutrition',  sector: '', logoPath: '/logos/better-nutrition.png' },
  { name: 'Wanderlooms',       slug: 'wanderlooms',       sector: '', logoPath: '/logos/wanderlooms.png' },
  { name: 'Woodsmen',          slug: 'woodsmen',          sector: '', logoPath: '/logos/woodsmen.jpeg' },
  { name: 'Kookar.AI',         slug: 'kookar-ai',         sector: '', logoPath: '/logos/kookar-ai.png' },
  { name: 'Epithera',          slug: 'epithera',          sector: '', logoPath: '/logos/epithera.png' },
  { name: 'Absolut Pet',       slug: 'absolut-pet',       sector: '', logoPath: '/logos/absolut-pet.png' },
  { name: 'Relso',             slug: 'relso',             sector: '', logoPath: '/logos/relso.png' },
  { name: 'Fishmongers',       slug: 'fishmongers',       sector: '', logoPath: '/logos/fishmongers.jpeg' },
  { name: 'Basil',             slug: 'basil',             sector: '', logoPath: '/logos/basil.png' },
  { name: 'Done Deal',         slug: 'done-deal',         sector: '', logoPath: '/logos/done-deal.png' },
  { name: 'OctoLife',          slug: 'octolife',          sector: '', logoPath: '/logos/octolife.jpeg' },
  { name: 'Yuomo',             slug: 'yuomo',             sector: '', logoPath: '/logos/yuomo.jpeg' },
  { name: 'Anandi School',     slug: 'anandi-school',     sector: '', logoPath: '/logos/anandi-school.png' },
  { name: 'ReplyAll',          slug: 'replyall',          sector: '', logoPath: '/logos/replyall.png' },
  { name: 'Crest Wealth',      slug: 'crest-wealth',      sector: '', logoPath: '/logos/crest-wealth.png' },
  { name: 'BetterPlace Health',slug: 'betterplace-health',sector: '', logoPath: '/logos/betterplace-health.png' },
]

export const fundData: FundData = {
  name: 'The Barbershop Fund',
  subtitle: '\u20B925Cr Category-I AIF \u00B7 80 LPs \u00B7 2023\u20132025',
  stats: fundStats,
  standoutInvestments,
  portfolioCompanies,
}
