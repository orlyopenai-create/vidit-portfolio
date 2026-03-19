export interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export interface PhilosophyPillar {
  number: string
  title: string
  body: string
}

export interface Company {
  name: string
  slug: string
  sector: string
  logoPath: string
  websiteUrl?: string
}

export interface Investment {
  company: string
  sector: string
  entryValuation: string
  latestValuation: string
  multiple: string
  coInvestors: string
}

export interface FundData {
  name: string
  subtitle: string
  stats: Stat[]
  standoutInvestments: Investment[]
  portfolioCompanies: Company[]
}

export interface TimelineEntry {
  role: string
  organization: string
  period: string
  description: string
}

export interface LinkedInPost {
  id: string
  excerpt: string
  date: string
  url: string
}

export interface Photo {
  id: string
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface MediaData {
  linkedInPosts: LinkedInPost[]
  photos: Photo[]
}
