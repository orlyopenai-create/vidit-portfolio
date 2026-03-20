import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { JourneySection } from '@/components/sections/JourneySection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { FundSection } from '@/components/sections/FundSection'
import { KilrrSection } from '@/components/sections/KilrrSection'
import { MediaSection } from '@/components/sections/MediaSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <PhilosophySection />
      <FundSection />
      <KilrrSection />
      <MediaSection />
      <FooterSection />
    </main>
  )
}
