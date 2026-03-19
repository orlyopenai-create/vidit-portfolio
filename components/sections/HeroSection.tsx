import { heroIdentity, heroStats, heroHeadshot } from '@/lib/data/hero'
import { HeroAnimations } from '@/components/hero/HeroAnimations'

export function HeroSection() {
  return (
    <section className="bg-background">
      <HeroAnimations identity={heroIdentity} stats={heroStats} headshot={heroHeadshot} />
    </section>
  )
}
