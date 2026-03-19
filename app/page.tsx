import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { FundSection } from '@/components/sections/FundSection'
import { KilrrSection } from '@/components/sections/KilrrSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { BeyondWorkSection } from '@/components/sections/BeyondWorkSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <FundSection />
      <KilrrSection />
      <TimelineSection />
      <BeyondWorkSection />
      <FooterSection />
    </main>
  )
}
