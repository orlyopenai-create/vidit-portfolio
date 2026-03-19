import { KilrrAnimations } from '@/components/kilrr/KilrrAnimations'

const kilrrTitle = 'Kilrr \u2014 Backing a Founder Before the Category Existed'

const kilrrParagraphs = [
  `When Hitesh Bhagia first showed us Kilrr, the idea was simple: instant meat marinades for the Indian home cook. Clean ingredients, bold branding, 10 SKUs. No grocery store presence. No institutional backing.`,

  `Most investors would have passed. Meat spice blends felt like a niche within a niche \u2014 and the obvious question was: if there\u2019s a real market here, why haven\u2019t MDH or Everest entered it? But that question was actually the answer. The big incumbents hadn\u2019t entered because they\u2019re built for mass-market vegetarian spice blends. The meat cooking moment in India is structurally different \u2014 it\u2019s more occasion-led, more emotional, more willing to pay for convenience. Hitesh understood that instinctively. He wasn\u2019t pitching a market. He was describing his own kitchen.`,

  `What made us back him wasn\u2019t the TAM slide. It was three things: first, he was a repeat founder \u2014 his previous startup HomeVeda had been backed by Blume, and he\u2019d learned from the experience. Second, he had the marketing instinct to make Kilrr feel like a brand, not just a product \u2014 the packaging, tone of voice, and community-building were all deliberate and all his. Third, he had the network to raise. Within months of our investment at \u20b917Cr, he had competing term sheets from multiple VCs.`,

  `We entered at \u20b917Cr. Kilrr is now valued at ~\u20b985Cr \u2014 roughly 5x \u2014 is live on Blinkit and Instamart across 190+ cities, and Hitesh recently closed a round on Shark Tank India from Anupam Mittal.`,

  `The lesson we take from Kilrr: the best early-stage bets are often hiding in plain sight. You find them by listening to founders who know their customer better than anyone in the room.`,
]

export function KilrrSection() {
  return (
    <section id="kilrr" className="bg-surface py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <KilrrAnimations title={kilrrTitle} paragraphs={kilrrParagraphs} />
      </div>
    </section>
  )
}
