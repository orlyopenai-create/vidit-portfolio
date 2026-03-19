import { heroIdentity, heroHeadshot, heroChapters, heroCities } from '@/lib/data/hero'
import { HeroAnimations } from '@/components/hero/HeroAnimations'

export function HeroSection() {
  return (
    <section className="bg-background">
      <HeroAnimations
        identity={heroIdentity}
        headshot={heroHeadshot}
        chapters={heroChapters}
        cities={heroCities}
      />
    </section>
  )
}
