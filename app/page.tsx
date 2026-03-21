import { HeroSection } from '@/components/sections/HeroSection'
import { StorySection } from '@/components/sections/StorySection'
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
      <StorySection />
      <JourneySection />
      <IntersectionSection />
      <BarbershopSection />
      <FundSection />
      <MediaSection />
      <FooterSection />
    </main>
  )
}
