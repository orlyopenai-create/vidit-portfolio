import { AboutAnimations } from '@/components/about/AboutAnimations'

const aboutProse = `I've spent my career building toward a single conviction: the best early-stage investors are the ones who've lived the problems they're backing.

I started in investment banking at Nomura — first in Mumbai on DCM, then in London on EMEA M&A, advising on transactions ranging from a €300M consumer deal to a £6Bn renewable energy acquisition that won Global M&A Deal of the Year. I learned rigour, pattern recognition, and how capital really moves.

But I wanted to get closer to the building. In 2023, I joined Bombay Shaving Company as Chief of Staff to the CEO, Shantanu Deshpande — and that role turned into something I couldn't have designed. I ran a ₹25Cr venture fund (The Barbershop Fund), helped grow one of India's most-watched entrepreneurship podcasts to 400K+ subscribers and 100M+ views, and worked inside a consumer brand navigating real operational problems. Three completely different lenses on the same ecosystem, all at once.

Then I went even deeper. I took over my family's ethnic wear business, Orly — built the D2C channel from scratch, launched cross-border wholesale into UAE and Bangladesh, and drove 40% YoY revenue growth. Running a company taught me things no pitch deck ever could.

That journey — from structuring M&A in London to arguing with a tailor in Kolkata — is what I bring to every investment conversation.`

const pullQuote = 'Running a company taught me things no pitch deck ever could.'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AboutAnimations prose={aboutProse} pullQuote={pullQuote} />
      </div>
    </section>
  )
}
