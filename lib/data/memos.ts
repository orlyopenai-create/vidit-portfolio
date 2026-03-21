export interface MemoFounder {
  name: string
  role: string
  background: string
}

export interface Memo {
  slug: string
  company: string
  sector: string
  stage: string
  notableInvestors: string
  oneLiner: string
  summary: string
  founders: MemoFounder[]
  companyDetails: string
  market: string
  competition: string
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
    summary: 'India\'s first premium, tech-enabled seafood brand ensuring high-quality, traceable, and sustainably sourced seafood for urban consumers. We first backed Fishmongers at a ₹31Cr valuation; they raised their Series A at ₹150Cr pre-money — a 5x markup in under 18 months — led by Rainmatter (Zerodha), Wavemaker, and EIC Japan.',
    founders: [
      {
        name: 'Suvo Sarkar',
        role: 'CEO',
        background: 'Deep expertise in seafood supply chains across India and Southeast Asia.',
      },
      {
        name: 'Dr. Vivek Saha',
        role: 'CBO',
        background: 'Medical background bringing scientific rigour to food safety and traceability standards.',
      },
      {
        name: 'Arindom Sanyal',
        role: 'CTO',
        background: 'Technology and logistics background powering Fishmongers\' supply chain platform.',
      },
    ],
    companyDetails: 'Fishmongers has built a direct-from-source procurement model across 158 fishing markets — zero middlemen, patented live fish transport technology that brings wastage to 0.25% against a 25% industry standard. The model guarantees freshness, traceability, and pricing power that no wet market can replicate. The company was recently honoured by the Minister of Electronics & IT for leading India\'s AI mission in Fisheries.',
    market: 'India\'s seafood market is a $15B category almost entirely dominated by unbranded wet markets. Rising disposable incomes, health-consciousness, and urban preference for hygienic, sustainably sourced food are driving a structural shift to organised players. The government\'s PMMSY scheme backs this with a $2.6B investment to boost aquaculture production by 40%.',
    competition: 'There is no premium, tech-enabled seafood brand in India today — this is true whitespace. The closest analogy is what Licious did for meat: building a branded, quality-assured alternative to the wet market. Fishmongers is doing the same for fish, with a deeper supply chain moat given the complexity of live seafood logistics.',
    whyExcited: [
      {
        heading: 'Category-creating opportunity',
        body: 'Despite India\'s $15B seafood market, no premium tech-enabled brand guarantees traceability, quality, and consistency. Fishmongers is positioned to own this whitespace, much like Licious did for meat.',
      },
      {
        heading: 'Strong external validation',
        body: 'A 5x valuation markup in under 18 months, and participation from Rainmatter, Wavemaker, and EIC Japan reinforce the strength of the business model and execution.',
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
        body: 'Direct-from-source procurement with patented live fish transport — 0.25% wastage vs. 25% industry standard. Zero middlemen means better freshness, stronger pricing power, and high customer trust.',
      },
    ],
    preParade: [
      'Expands from 158 to 640 fishing markets, solidifying its position as India\'s leading live fish supply chain.',
      'Achieves ₹2,000Cr+ revenue by FY28 with EBITDA margins reaching 16%.',
      'Dominant inland fish logistics player with minimal wastage and exclusive B2B partnerships.',
      'International expansion into Southeast Asia leveraging patented live fish transport and aquaculture solutions.',
    ],
    preMortem: [
      'Expansion beyond core geographies stalls due to high logistics costs and operational complexity.',
      'Farmer and fisher adoption of new technology is slow due to financing constraints or resistance.',
      'Revenue plateaus at ₹50–100Cr annually with margins squeezed by rising transport costs.',
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
    summary: 'A network of premium K-12 schools with a new-age curriculum, targeting India\'s growing affluent urban households. Founded by Prachi Pawar — HBS alum and former investor at Peak XV (Surge) — with deep institutional backing in education. Peak XV led the round at a $16M valuation.',
    founders: [
      {
        name: 'Prachi Pawar',
        role: 'Founder & CEO',
        background: 'HBS alum. Former investor at Peak XV (Surge) — she has been on the other side of the table evaluating education businesses. Her partner founded Master\'s Union; his family are the promoters of Lovely Professional University, giving her direct access to deep institutional knowledge and networks in Indian education.',
      },
    ],
    companyDetails: 'Anandi Schools is building a premium K-12 school network with an international curriculum, emphasising extracurricular excellence and assessments beyond JEE/NEET. The model is asset-light, targeting franchise and partnership expansion across Tier 1 cities. Leading international schools operate at 45–50% EBITDA margins with peak revenues of ₹100Cr+ per school. Parents rarely switch schools once enrolled — making this a high LTV, high retention business.',
    market: 'Cities like Mumbai, Bangalore, Hyderabad, Pune, and Gurgaon are seeing a surge in ₹2Cr+ housing developments — a leading indicator of premium school demand. The number of ₹60L+ income households is projected to triple over the next decade. Nearly 1 million students go abroad annually, reflecting the growing demand for holistic, internationally benchmarked education.',
    competition: 'Despite clear demand, no large-scale, asset-light, experience-driven premium school chain has emerged in India. The market is dominated by individual institutions with no national brands. This is the first-mover opportunity: the equivalent of what Narayana or FIITJEE did for coaching, but applied to full-stack premium schooling.',
    whyExcited: [
      {
        heading: 'No national chain exists',
        body: 'Despite clear demand, no large-scale, asset-light premium school chain has emerged in India. This is a significant first-mover advantage in an otherwise fragmented market dominated by individual institutions.',
      },
      {
        heading: 'Founder-market fit is exceptional',
        body: 'Prachi Pawar is an HBS alum who invested at Peak XV (Surge) — she has evaluated businesses from the investor side. Her family network provides direct access to Indian education institutions at the highest level.',
      },
      {
        heading: 'Urban expansion and rising incomes',
        body: 'Mumbai, Bangalore, Hyderabad, and Gurgaon are seeing a surge in ₹2Cr+ housing. The number of ₹60L+ income households is projected to triple over the next decade.',
      },
      {
        heading: 'High-return unit economics',
        body: 'Leading international schools operate at 45–50% EBITDA margins with peak revenues of ₹100Cr+ per school. High LTV — parents rarely switch schools once enrolled.',
      },
      {
        heading: 'Demand for new learning models',
        body: 'Nearly 1M students go abroad annually. Growing demand for holistic education — international curricula, extracurricular excellence, assessments beyond JEE/NEET.',
      },
    ],
    preParade: [
      'Full capacity achieved within 2–3 years per campus.',
      '13 locations across India and international markets by 2030.',
      'Becomes the leading premium K-12 school brand in India with Ivy League and global university partnerships.',
      'Projected revenues of $280M+ in 10 years with EBITDA margins consistently above 40%.',
    ],
    preMortem: [
      'Scaling challenges due to competition, economic downturns, or regulatory hurdles in accreditation.',
      'Initial enrolment falls short due to ineffective marketing or strong local competition.',
      'Education businesses scale linearly — extended breakeven timeline is the primary risk.',
    ],
    finalThoughts: 'Anandi Schools presents a compelling opportunity to build a premium education brand in India. Strong macroeconomic tailwinds, an experienced founder with deep institutional backing, and attractive long-term unit economics make this an asymmetric risk-reward opportunity in a market that has never seen a national brand emerge.',
  },
  {
    slug: 'better-nutrition',
    company: 'Better Nutrition',
    sector: 'Agritech / FMCG',
    stage: 'Seed Convertible',
    notableInvestors: 'GVFL (Gujarat Ventures), Namita Thapar (Shark Tank), PV Sindhu (equity + ambassador)',
    oneLiner: 'Biofortified staples from farm to table — a category incumbents aren\'t incentivised to create.',
    summary: 'A vertically integrated agritech startup bringing nutrient-dense, biofortified staples — rice, atta, and grains — directly from farm to urban consumers. In a country where 4 in 5 Indians suffer from nutrition deficiency, Better Nutrition is building a category that large incumbents have no reason to create: their seeds are optimised for yield, not nutrients.',
    founders: [
      {
        name: 'Prateek Rastogi',
        role: 'CEO',
        background: 'SRCC and IIM Ahmedabad (PGP). Ex-strategy background. Has spent 7+ years building the Greenday biofortified seeds vertical before launching the consumer brand.',
      },
      {
        name: 'Aishwarya Bhatnagar',
        role: 'CMO',
        background: 'BSc Food Science and Nutrition, IHM. Husband-wife founding team — deep product expertise in food science paired with commercial leadership.',
      },
    ],
    companyDetails: 'Better Nutrition has built the full stack: R&D partnerships to develop biofortified seeds matched to farmer needs and urban taste → 15,000+ farmer partnerships with training and support → 100+ Greenday procurement centres eliminating middlemen → consumer brand selling rice, ragi atta, multigrain atta, makka atta, daliya, and bajra atta. Currently 90% of revenue is from seed sales; the consumer brand (10%) is growing rapidly via quick commerce and e-commerce. Gross margins exceed 30%.',
    market: 'The branded staples market is currently ₹35,000Cr and projected to reach ₹1,05,000Cr by 2031. The biofortification category specifically represents a ₹5,250Cr opportunity by 2035 at just 5% market share. In August 2024, the Prime Minister launched 109 high-yielding, climate-resilient, biofortified crop varieties — government policy momentum is firmly behind the category.',
    competition: 'Biofortified staples is a new category with no direct competitor. Fortified atta players (Annapurna, Aashirvaad, Golden Harvest) add nutrients post-production — those nutrients are lost in cooking. Organic atta players (Organic Tattva, 24 Mantra) offer no nutrient boost. Better Nutrition\'s biofortification happens at the seed level — naturally retained through cooking — which is a defensible, first-mover position that incumbents have no incentive to build.',
    whyExcited: [
      {
        heading: 'New category creation',
        body: 'Existing incumbents are focused on yield-optimised seeds. Better Nutrition is the only player building a biofortified staples brand — a category with no direct competition and a clear consumer need.',
      },
      {
        heading: 'Full-stack vertical integration',
        body: 'R&D → 15,000+ farmer partnerships → 100+ Greenday procurement centres → consumer brand. Every part of the value chain is controlled, ensuring quality, traceability, and margin.',
      },
      {
        heading: 'Government tailwind',
        body: 'In August 2024, PM Modi launched 109 high-yielding, climate-resilient, biofortified crop varieties — policy momentum firmly behind the category.',
      },
      {
        heading: 'Brand momentum',
        body: 'PV Sindhu is brand ambassador with an equity stake. Pankaj Bhadouria on a 3-year contract. Featured on Shark Tank — raised successfully from Namita Thapar.',
      },
      {
        heading: 'Large addressable market',
        body: 'Branded staples at ₹35,000Cr growing to ₹1,05,000Cr by 2031. A 5% biofortified share alone represents a ₹5,250Cr opportunity by 2035.',
      },
    ],
    preParade: [
      'Farmer adoption accelerates on the back of government policy and market creation for biofortified crops.',
      'Better Nutrition becomes the go-to biofortified staples brand for urban consumers via quick commerce.',
      'Emerges as category leader — analogous to what Daawat did for basmati, now a ₹8,000Cr brand.',
    ],
    preMortem: [
      'Slow farmer adoption — farmers continue to prefer high-yielding seeds with established demand.',
      'Urban consumers are unwilling to pay a premium for biofortification over standard alternatives.',
      'Large incumbents launch similar lines, eroding the first-mover advantage.',
    ],
    finalThoughts: 'The incentive misalignment of incumbents (yield over nutrition) and the years Better Nutrition has invested in developing seeds palatable to urban taste give us confidence in their category-creator thesis. The Better-for-You trend in Indian FMCG is real and accelerating — Better Nutrition is one of the few plays built from the ground up to meet it.',
  },
  {
    slug: 'replyall',
    company: 'ReplyAll',
    sector: 'D2C Apparel',
    stage: 'Pre-Seed',
    notableInvestors: 'Antler India, Sparrow Capital, DeVC, Bharat Founders Fund',
    oneLiner: 'Performance apparel in India sits at <3% penetration vs. 20%+ in mature markets. The timing is right.',
    summary: 'A premium D2C apparel brand built around proprietary Nano PE-infused fabric — superior cooling, moisture-wicking, and durability — positioned not as athletic wear but as elevated everyday lifestyle wear. The India athleisure opportunity is where the US was in 2010.',
    founders: [
      {
        name: 'Rushabh Sanghavi',
        role: 'Founder & CEO',
        background: 'Chief Merchandise Officer at Urban Ladder. Director of Private Labels (Furniture and Home) at Flipkart. Chief Merchandising and Marketing Officer at Brosa, Australia. 15+ years scaling iconic consumer brands across India and Australia. Previously founded The Stiff Collar — a D2C apparel business — giving him first-hand experience of what doesn\'t work.',
      },
      {
        name: 'Josh Hiney',
        role: 'Product & Design (External)',
        background: '15 years at The North Face, Under Armour, and Lululemon. Led development of ReplyAll\'s proprietary Nano PE-infused fabric, which provides measurably superior cooling, moisture-wicking, and durability.',
      },
    ],
    companyDetails: 'ReplyAll is launching with 10 core products — heavy focus on t-shirts and polos — made with proprietary Nano PE-infused yarn. The fabric provides superior cooling, moisture-wicking, and durability, positioned as everyday lifestyle wear rather than traditional athletic wear. D2C first, minimising marketplace reliance. The moat is the fabric, not just the brand — which is unusual and defensible in the D2C apparel space.',
    market: 'India\'s western wear market is $42B, growing at a 19% CAGR and set to double by 2027. Athleisure specifically sits at less than 3% penetration in India against 20%+ in mature markets. This is where the US was in 2010 before Lululemon, Vuori, and Athleta built multi-billion dollar businesses. The Indian upgrade in apparel expectations is structural — driven by rising fitness culture, work-from-anywhere, and premiumisation.',
    competition: 'Bombay Shirt Company raised ₹54Cr from Singularity. Lyskraft raised $26M from Peak XV. Snitch raised ₹110Cr. Rare Rabbit and Manyavar prove men\'s apparel brands can scale in India. ReplyAll differentiates on fabric technology, not just brand — the Nano PE yarn is a product moat that competitors cannot easily replicate without significant R&D investment.',
    whyExcited: [
      {
        heading: 'Founder with proven scale',
        body: 'Rushabh Sanghavi has 15+ years scaling consumer brands: CMO at Urban Ladder, Director of Private Labels at Flipkart, CMMO at Brosa (Australia). He has also failed once — which we view as an asset.',
      },
      {
        heading: 'Proprietary product moat',
        body: 'Nano PE-infused yarn delivers measurably superior cooling, moisture-wicking, and durability. Unlike most D2C apparel brands, the moat is the fabric — not just the brand story.',
      },
      {
        heading: 'Market timing',
        body: 'Athleisure sits at <3% penetration in India vs. 20%+ in mature markets. India\'s western wear market ($42B) is growing at 19% CAGR and set to double by 2027.',
      },
      {
        heading: 'Category momentum',
        body: 'Bombay Shirt Company, Lyskraft, Snitch, Rare Rabbit, Manyavar — the men\'s apparel category in India is proving it can produce large, standalone businesses. ReplyAll is entering at the right moment.',
      },
    ],
    preParade: [
      'Significant traction within 2–3 years, with products adopted by a growing premium consumer base.',
      'Expands to 10+ locations across India and internationally by 2030.',
      'Becomes a household name in performance lifestyle wear, reaching ₹100Cr+ revenue with strong EBITDA margins.',
    ],
    preMortem: [
      'Challenges in scaling supply chain or maintaining fabric quality at volume.',
      'Premium pricing does not resonate strongly enough with the target market.',
      'Delay in finding a strong co-founder to complement Rushabh\'s commercial background.',
    ],
    finalThoughts: 'We like ReplyAll. We love Rushabh. The space is right, the product is genuinely differentiated, and he has the execution track record to go all the way. The bet here is that the Indian consumer\'s upgrade in apparel expectations — already visible in Rare Rabbit, Manyavar, and Bombay Shirt Company — is structural, not cyclical.',
  },
]
