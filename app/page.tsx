import { HeroSection } from '@/components/sections/HeroSection'
import { VideoIntroSection } from '@/components/sections/VideoIntroSection'
import { JourneySection } from '@/components/sections/JourneySection'
import { IntersectionSection } from '@/components/sections/IntersectionSection'
import { BarbershopSection } from '@/components/sections/BarbershopSection'
import { FundSection } from '@/components/sections/FundSection'
import { MediaSection } from '@/components/sections/MediaSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VideoIntroSection />
      <JourneySection />
      <IntersectionSection />
      <BarbershopSection />
      <FundSection />
      <MediaSection />
      <FooterSection />
    </main>
  )
}
