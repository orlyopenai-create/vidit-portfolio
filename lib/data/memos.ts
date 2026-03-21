export interface Memo {
  slug: string
  company: string
  sector: string
  stage: string
  notableInvestors: string
  oneLiner: string
  summary: string
  whyExcited: { heading: string; body: string }[]
  preParade: string[]
  preMortem: string[]
  finalThoughts: string
}

export const memos: Memo[] = [
  {
    slug: 'fishmongers',
    company: 'Fishmongers',
    sector: 'Food & Beverage',
    stage: 'Series A',
    notableInvestors: 'Rainmatter (Zerodha), Wavemaker, EIC Japan',
    oneLiner: 'What Licious did for meat — building India\'s first premium, traceable seafood brand in a ₹15B unbranded market.',
    summary: 'India\'s first premium, tech-enabled seafood brand ensuring high-quality, traceable, and sustainably sourced seafood for urban consumers. We first backed Fishmongers at a ₹31Cr valuation; they raised their Series A at ₹150Cr pre-money — a 5x markup in under 18 months — led by Rainmatter, Wavemaker, and EIC Japan.',
    whyExcited: [
      {
        heading: 'Category-creating opportunity',
        body: 'Despite India\'s $15B seafood market, no premium tech-enabled brand guarantees traceability, quality, and consistency. Fishmongers is positioned to own this whitespace, much like Licious did for meat.',
      },
      {
        heading: 'Strong external validation',
        body: 'The 5x valuation markup in under 18 months, and participation of Rainmatter, Wavemaker, and EIC, reinforce the strength of the business model and execution.',
      },
      {
        heading: 'Massive market shift',
        body: 'Rising disposable incomes, health-consciousness, and urban demand for hygienic sustainable seafood are driving a structural shift from wet markets to organised, branded players.',
      },
      {
        heading: 'Best-in-class unit economics',
        body: '30%+ gross margins and strong repeat purchase rates, operating in a category with low competitive intensity compared to meat and dairy.',
      },
      {
        heading: 'Tech-led supply chain moat',
        body: 'Direct-from-source procurement — zero middlemen, better freshness, high customer trust, and strong pricing power. Recently recognised by the Minister of Electronics & IT for leading India\'s AI mission in Fisheries.',
      },
    ],
    preParade: [
      'Expands from 158 to 640 fishing markets, solidifying its position as India\'s leading live fish supply chain.',
      'Achieves ₹2,000Cr+ revenue by FY28 with EBITDA margins reaching 16%.',
      'Dominant inland fish logistics player with minimal wastage (0.25% vs. 25% industry standard).',
      'International expansion into Southeast Asia leveraging patented live fish transport and aquaculture solutions.',
    ],
    preMortem: [
      'Expansion beyond core geographies stalls due to high logistics costs and operational inefficiencies.',
      'Farmer adoption of new technology is slow due to financing constraints or resistance.',
      'Revenue growth plateaus at ₹50–100Cr annually with margins squeezed by rising transport costs.',
    ],
    finalThoughts: 'Fishmongers is uniquely positioned to build India\'s first premium seafood brand, capitalising on shifting consumer preferences, an underserved market, and best-in-class supply chain operations. With strong external validation, robust unit economics, and scalable execution, this is a category-defining bet.',
  },
  {
    slug: 'anandi-schools',
    company: 'Anandi Schools',
    sector: 'Education',
    stage: 'Seed',
    notableInvestors: 'Peak XV (Surge) — $4M lead',
    oneLiner: 'No national premium K-12 chain exists in India despite clear demand. First-mover in a fragmented, high-margin market.',
    summary: 'A network of premium K-12 schools with a new-age curriculum, targeting India\'s growing affluent urban households. Founded by Prachi Pawar — HBS alum and former investor at Peak XV (Surge) — with deep institutional backing in education.',
    whyExcited: [
      {
        heading: 'Lack of national chains',
        body: 'Despite clear demand, no large-scale, asset-light, experience-driven premium school chain has emerged in India. This is a significant first-mover advantage in an otherwise fragmented market dominated by individual institutions.',
      },
      {
        heading: 'Strong founder-market fit',
        body: 'Prachi Pawar is an HBS alum with prior investment experience at Peak XV (Surge). Her partner founded Master\'s Union; his family promotes Lovely Professional University — deep institutional knowledge and network access in education.',
      },
      {
        heading: 'Urban expansion and rising incomes',
        body: 'Mumbai, Bangalore, Hyderabad, and Gurgaon are seeing a surge in ₹2Cr+ housing developments — a leading indicator of premium school demand. The number of ₹60L+ income households is projected to triple over the next decade.',
      },
      {
        heading: 'High-return unit economics',
        body: 'Leading international schools operate at 45–50% EBITDA margins, peak revenues of ₹100Cr+ per school. High LTV — parents rarely switch schools once enrolled.',
      },
      {
        heading: 'Demand for new learning pedagogy',
        body: 'Nearly 1M students go abroad annually. Growing demand for holistic learning models — international curricula, extracurricular excellence, assessments beyond JEE/NEET.',
      },
    ],
    preParade: [
      'Full capacity achieved within 2–3 years per campus.',
      '13 locations across India and international markets by 2030.',
      'Becomes the leading premium K-12 school brand in India, leveraging partnerships with Ivy League and global universities.',
      'Projected revenues of $280M+ in 10 years with EBITDA margins consistently above 40%.',
    ],
    preMortem: [
      'Scaling challenges due to competition, economic downturns, or regulatory hurdles in accreditation.',
      'Initial enrolment falls short due to ineffective marketing or strong local competition.',
      'Education businesses scale linearly — unlike tech startups. Extended breakeven timeline is the primary risk.',
    ],
    finalThoughts: 'Anandi Schools presents a compelling opportunity to build a premium education brand in India. Strong macroeconomic tailwinds, an experienced founder with deep institutional backing, and attractive long-term unit economics make this an asymmetric risk-reward opportunity in a market that has never seen a national brand emerge.',
  },
  {
    slug: 'better-nutrition',
    company: 'Better Nutrition',
    sector: 'Agritech / FMCG',
    stage: 'Seed Convertible',
    notableInvestors: 'GVFL (Gujarat Ventures), Namita Thapar (Shark Tank), PV Sindhu (brand + equity)',
    oneLiner: 'Biofortified staples from farm to table — a category incumbents aren\'t incentivised to create.',
    summary: 'A vertically integrated agritech startup bringing nutrient-dense, biofortified staples — rice, atta, and grains — directly from farm to urban consumers. In a country where 4 in 5 Indians suffer from nutrition deficiency, Better Nutrition is building a category that large incumbents have no reason to create: their seeds are optimised for yield, not nutrients.',
    whyExcited: [
      {
        heading: 'New category creation',
        body: 'Existing incumbents (Aashirvaad, Annapurna, Daawat) are focused on yield-optimised seeds. Better Nutrition is the only player building a biofortified staples brand — a category with no direct competition and a clear consumer need.',
      },
      {
        heading: 'Full-stack vertical integration',
        body: 'R&D to develop biofortified seeds → 15,000+ farmer partnerships → 100+ Greenday procurement centres → consumer brand. Every part of the value chain is controlled, ensuring quality and traceability.',
      },
      {
        heading: 'Government tailwind',
        body: 'In August 2024, PM Modi launched 109 high-yielding, climate-resilient, biofortified crop varieties — policy momentum firmly behind the category.',
      },
      {
        heading: 'Brand momentum',
        body: 'PV Sindhu is brand ambassador (equity stake at ₹100Cr valuation); Pankaj Bhadouria on a 3-year contract. Featured on Shark Tank, raising successfully from Namita Thapar.',
      },
      {
        heading: 'Large addressable market',
        body: 'Branded staples currently at ₹35,000Cr, projected to reach ₹1,05,000Cr by 2031. A 5% share of biofortified staples alone represents a ₹5,250Cr opportunity by 2035.',
      },
    ],
    preParade: [
      'Farmer adoption accelerates on the back of government policy and market creation.',
      'Better Nutrition captures urban consumers via quick commerce as the go-to biofortified staples brand.',
      'Emerges as category leader — analogous to what Daawat did for basmati (now a ₹8,000Cr brand).',
    ],
    preMortem: [
      'Slow farmer adoption — farmers continue to prefer high-yielding seeds with established market demand.',
      'Urban consumers unwilling to pay a premium for biofortification over standard alternatives.',
      'Large incumbents launch similar lines, eroding first-mover advantage.',
    ],
    finalThoughts: 'The incentive alignment of incumbents (yield over nutrition) and the years Better Nutrition has invested in developing seeds palatable to urban taste give us confidence in their category-creator thesis. The B4U (Better-for-You) trend in Indian FMCG is real and accelerating — Better Nutrition is one of the few plays built from the ground up to meet it.',
  },
  {
    slug: 'replyall',
    company: 'ReplyAll',
    sector: 'D2C Apparel',
    stage: 'Pre-Seed',
    notableInvestors: 'Antler India, Sparrow Capital, DeVC, Bharat Founders Fund',
    oneLiner: 'Performance apparel in India sits at <3% penetration vs. 20%+ in mature markets. The timing is right.',
    summary: 'A premium D2C apparel brand built around proprietary Nano PE-infused fabric — superior cooling, moisture-wicking, and durability — positioned not as athletic wear but as elevated everyday lifestyle wear. The India athleisure opportunity is where the US was in 2010.',
    whyExcited: [
      {
        heading: 'Strong founder-market fit',
        body: 'Rushabh Sanghavi has 15+ years scaling consumer brands: Chief Merchandise Officer at Urban Ladder, Director of Private Labels at Flipkart, Chief Merchandising Officer at Brosa (Australia). His product collaborator Josh Hiney brings 15 years at The North Face, Under Armour, and Lululemon.',
      },
      {
        heading: 'Unique proprietary product',
        body: 'Nano PE-infused yarn provides measurably superior cooling, moisture-wicking, and durability. Unlike most D2C apparel brands, the moat is the fabric — not just the brand.',
      },
      {
        heading: 'Market timing',
        body: 'Athleisure sits at <3% penetration in India vs. 20%+ in mature markets. India\'s western wear market ($42B) is growing at a 19% CAGR, set to double by 2027.',
      },
      {
        heading: 'Strong category momentum',
        body: 'Bombay Shirt Company raised ₹54Cr from Singularity. Lyskraft raised $26M from Peak XV. Snitch raised ₹110Cr. Rare Rabbit and Manyavar prove that men\'s apparel brands can become large standalone businesses in India.',
      },
    ],
    preParade: [
      'Significant traction within the first 2–3 years, with products adopted by a growing premium consumer base.',
      'Expands to 10+ locations across India and internationally by 2030.',
      'Becomes a household name in performance lifestyle wear, reaching ₹100Cr+ revenue with strong EBITDA margins.',
    ],
    preMortem: [
      'Challenges in scaling supply chain or maintaining quality at volume.',
      'Premium pricing does not resonate strongly enough with the target market, slowing growth.',
      'Delay in finding a strong co-founder to complement Rushabh\'s commercial background with operational depth.',
    ],
    finalThoughts: 'We like ReplyAll. We love Rushabh. The space is right, the product is genuinely differentiated, and he has the execution track record to go all the way. The bet here is that the Indian consumer\'s upgrade in apparel expectations — already visible in Rare Rabbit, Manyavar, and Bombay Shirt Company — is structural, not cyclical.',
  },
]
