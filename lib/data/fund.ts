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
    sector: 'Food & Beverage',
    entryValuation: '₹25Cr',
    latestValuation: '₹324Cr',
    multiple: '~12x',
    coInvestors: '—',
  },
  {
    company: 'Kilrr',
    sector: 'Food & Beverage',
    entryValuation: '₹17Cr',
    latestValuation: '₹85Cr',
    multiple: '~5x',
    coInvestors: 'Anupam Mittal',
  },
  {
    company: 'Fishmongers',
    sector: 'Food & Beverage',
    entryValuation: '₹31Cr',
    latestValuation: '₹150Cr',
    multiple: '~5x',
    coInvestors: 'Rainmatter, Wavemaker, EIC Japan',
  },
  {
    company: 'Anveshan',
    sector: 'Food & Beverage',
    entryValuation: '₹160Cr',
    latestValuation: '₹400Cr',
    multiple: '~2.5x',
    coInvestors: 'Wipro Consumer Care Ventures, DSGCP',
  },
  {
    company: 'Mekr',
    sector: 'Climate & Mobility',
    entryValuation: '₹100Cr',
    latestValuation: '₹210Cr',
    multiple: '~2x',
    coInvestors: 'Titan Capital',
  },
]

export const portfolioCompanies: Company[] = [
  // Food & Beverage
  { name: 'Go Zero',          slug: 'go-zero',          sector: 'Food & Beverage',      logoPath: '/logos/go-zero.jpeg',          entryValuation: '₹25Cr',  latestValuation: '₹324Cr', multiple: '~12x', coInvestors: '—' },
  { name: 'Anveshan',         slug: 'anveshan',         sector: 'Food & Beverage',      logoPath: '/logos/anveshan.png',          entryValuation: '₹160Cr', latestValuation: '₹400Cr', multiple: '~2.5x', coInvestors: 'Wipro Consumer Care Ventures, DSGCP' },
  { name: 'Kilrr',            slug: 'kilrr',            sector: 'Food & Beverage',      logoPath: '/logos/kilrr.jpeg',            entryValuation: '₹17Cr',  latestValuation: '₹85Cr',  multiple: '~5x',  coInvestors: 'Anupam Mittal' },
  { name: 'Fishmongers',      slug: 'fishmongers',      sector: 'Food & Beverage',      logoPath: '/logos/fishmongers.jpeg',      entryValuation: '₹31Cr',  latestValuation: '₹150Cr', multiple: '~5x',  coInvestors: 'Rainmatter, Wavemaker, EIC Japan' },
  { name: 'Better Nutrition', slug: 'better-nutrition', sector: 'Food & Beverage',      logoPath: '/logos/better-nutrition.png' },
  { name: 'Basil',            slug: 'basil',            sector: 'Food & Beverage',      logoPath: '/logos/basil.png' },
  // Fashion & Lifestyle
  { name: 'Wanderlooms',      slug: 'wanderlooms',      sector: 'Fashion & Lifestyle',  logoPath: '/logos/wanderlooms.png' },
  { name: 'Woodsmen',         slug: 'woodsmen',         sector: 'Fashion & Lifestyle',  logoPath: '/logos/woodsmen.jpeg' },
  { name: 'Fiona Diamonds',   slug: 'fiona-diamonds',   sector: 'Fashion & Lifestyle',  logoPath: '/logos/fiona-diamonds.png' },
  { name: 'Absolut Pet',      slug: 'absolut-pet',      sector: 'Fashion & Lifestyle',  logoPath: '/logos/absolut-pet.png' },
  { name: 'ReplyAll',         slug: 'replyall',         sector: 'Fashion & Lifestyle',  logoPath: '/logos/replyall.png' },
  // Fintech
  { name: 'SBNRI',            slug: 'sbnri',            sector: 'Fintech',              logoPath: '/logos/sbnri.png' },
  { name: 'RocketPay',        slug: 'rocketpay',        sector: 'Fintech',              logoPath: '/logos/rocketpay.png' },
  { name: 'Crest Wealth',     slug: 'crest-wealth',     sector: 'Fintech',              logoPath: '/logos/crest-wealth.png' },
  { name: 'Done Deal',        slug: 'done-deal',        sector: 'Fintech',              logoPath: '/logos/done-deal.png' },
  // Health & Wellness
  { name: 'Epithera',         slug: 'epithera',         sector: 'Health & Wellness',    logoPath: '/logos/epithera.png' },
  { name: 'BetterPlace Health', slug: 'betterplace-health', sector: 'Health & Wellness', logoPath: '/logos/betterplace-health.png' },
  { name: 'Yuomo',            slug: 'yuomo',            sector: 'Health & Wellness',    logoPath: '/logos/yuomo.jpeg' },
  // Climate & Mobility
  { name: 'EVeez',            slug: 'eveez',            sector: 'Climate & Mobility',   logoPath: '/logos/eveez.png' },
  { name: 'Kritsnam',         slug: 'kritsnam',         sector: 'Climate & Mobility',   logoPath: '/logos/kritsnam.png' },
  { name: 'Mekr',             slug: 'mekr',             sector: 'Climate & Mobility',   logoPath: '/logos/mekr.png',              entryValuation: '₹100Cr', latestValuation: '₹210Cr', multiple: '~2x', coInvestors: 'Titan Capital' },
  // Consumer Durables
  { name: 'OctoLife',         slug: 'octolife',         sector: 'Consumer Durables',    logoPath: '/logos/octolife.jpeg' },
  // Home & Furniture
  { name: 'Relso',            slug: 'relso',            sector: 'Home & Furniture',     logoPath: '/logos/relso.png' },
  // AI & Tech
  { name: 'Kookar.AI',        slug: 'kookar-ai',        sector: 'AI & Tech',            logoPath: '/logos/kookar-ai.png' },
  // Education
  { name: 'Anandi School',    slug: 'anandi-school',    sector: 'Education',            logoPath: '/logos/anandi-school.png' },
]

export const fundData: FundData = {
  name: 'The Barbershop Fund',
  subtitle: '\u20B925Cr Category-I AIF \u00B7 80 LPs \u00B7 2023\u20132025',
  stats: fundStats,
  standoutInvestments,
  portfolioCompanies,
}
