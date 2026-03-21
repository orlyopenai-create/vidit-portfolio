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
  { name: 'Go Zero',          slug: 'go-zero',          sector: 'Food & Beverage',     logoPath: '/logos/go-zero.jpeg',           entryValuation: '₹25Cr',    latestValuation: '₹324Cr', multiple: '~12x',  coInvestors: '—' },
  { name: 'Anveshan',         slug: 'anveshan',         sector: 'Food & Beverage',     logoPath: '/logos/anveshan.png',           entryValuation: '₹160Cr',   latestValuation: '₹400Cr', multiple: '~2.5x', coInvestors: 'Wipro Consumer Care Ventures, DSGCP' },
  { name: 'Kilrr',            slug: 'kilrr',            sector: 'Food & Beverage',     logoPath: '/logos/kilrr.jpeg',             entryValuation: '₹17Cr',    latestValuation: '₹85Cr',  multiple: '~5x',   coInvestors: 'Anupam Mittal, DSGCP' },
  { name: 'Fishmongers',      slug: 'fishmongers',      sector: 'Food & Beverage',     logoPath: '/logos/fishmongers.jpeg',       entryValuation: '₹31Cr',    latestValuation: '₹150Cr', multiple: '~5x',   coInvestors: 'Rainmatter, Wavemaker, EIC Japan' },
  { name: 'Better Nutrition', slug: 'better-nutrition', sector: 'Food & Beverage',     logoPath: '/logos/better-nutrition.png' },
  { name: 'Basil',            slug: 'basil',            sector: 'Food & Beverage',     logoPath: '/logos/basil.png',              entryValuation: '₹39Cr',    latestValuation: '₹44Cr',  multiple: '~1.1x' },
  // Fashion & Lifestyle
  { name: 'Wanderlooms',      slug: 'wanderlooms',      sector: 'Fashion & Lifestyle', logoPath: '/logos/wanderlooms.png',        logoFilter: 'brightness(0) invert(1)', entryValuation: '₹7Cr',     latestValuation: '₹12Cr',  multiple: '~1.7x' },
  { name: 'Woodsmen',         slug: 'woodsmen',         sector: 'Fashion & Lifestyle', logoPath: '/logos/woodsmen.jpeg' },
  { name: 'Fiona Diamonds',   slug: 'fiona-diamonds',   sector: 'Fashion & Lifestyle', logoPath: '/logos/fiona-diamonds.png',     entryValuation: '₹101Cr',   latestValuation: '₹150Cr', multiple: '~1.5x' },
  { name: 'ReplyAll',         slug: 'replyall',         sector: 'Fashion & Lifestyle', logoPath: '/logos/replyall.png' },
  // Fintech
  { name: 'SBNRI',            slug: 'sbnri',            sector: 'Fintech',             logoPath: '/logos/sbnri.png' },
  { name: 'RocketPay',        slug: 'rocketpay',        sector: 'Fintech',             logoPath: '/logos/rocketpay.png',          entryValuation: '₹50Cr',    latestValuation: '₹80Cr',  multiple: '~1.6x' },
  { name: 'Crest Wealth',     slug: 'crest-wealth',     sector: 'Fintech',             logoPath: '/logos/crest-wealth.png',       entryValuation: '₹73Cr' },
  { name: 'Done Deal',        slug: 'done-deal',        sector: 'Fintech',             logoPath: '/logos/done-deal.png',          entryValuation: '₹36Cr' },
  // Health & Wellness
  { name: 'Epithera',         slug: 'epithera',         sector: 'Health & Wellness',   logoPath: '/logos/epithera.png',           entryValuation: '₹31Cr' },
  { name: 'BetterPlace Health', slug: 'betterplace-health', sector: 'Health & Wellness', logoPath: '/logos/betterplace-health.png', entryValuation: '₹22Cr' },
  { name: 'Yuomo',            slug: 'yuomo',            sector: 'Health & Wellness',   logoPath: '/logos/yuomo.jpeg' },
  // Climate & Mobility
  { name: 'EVeez',            slug: 'eveez',            sector: 'Climate & Mobility',  logoPath: '/logos/eveez.png' },
  { name: 'Kritsnam',         slug: 'kritsnam',         sector: 'Climate & Mobility',  logoPath: '/logos/kritsnam.png',           entryValuation: '₹90Cr',    latestValuation: '₹144Cr', multiple: '~1.6x' },
  { name: 'Mekr',             slug: 'mekr',             sector: 'Climate & Mobility',  logoPath: '/logos/mekr.png',               entryValuation: '₹100Cr',   latestValuation: '₹210Cr', multiple: '~2x',   coInvestors: 'Titan Capital' },
  // InsurTech
  { name: 'OctoLife',         slug: 'octolife',         sector: 'InsurTech',           logoPath: '/logos/octolife.jpeg' },
  // Home & Furniture
  { name: 'Relso',            slug: 'relso',            sector: 'Home & Furniture',    logoPath: '/logos/relso.png',              entryValuation: '₹40Cr' },
  // AI & Tech
  { name: 'Kookar.AI',        slug: 'kookar-ai',        sector: 'AI & Tech',           logoPath: '/logos/kookar-ai.png' },
  // Education
  { name: 'Anandi School',    slug: 'anandi-school',    sector: 'Education',           logoPath: '/logos/anandi-school.png',      entryValuation: '₹128Cr' },
]

export const fundData: FundData = {
  name: 'The Barbershop Fund',
  subtitle: '\u20B925Cr Category-I AIF \u00B7 80 LPs \u00B7 2023\u20132025',
  stats: fundStats,
  standoutInvestments,
  portfolioCompanies,
}
