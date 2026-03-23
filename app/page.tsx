import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'
import { JourneySection } from '@/components/sections/JourneySection'
import { IntersectionSection } from '@/components/sections/IntersectionSection'

const FundSection = dynamic(() =>
  import('@/components/sections/FundSection').then((m) => m.FundSection)
)
const BarbershopSection = dynamic(() =>
  import('@/components/sections/BarbershopSection').then((m) => m.BarbershopSection)
)
const MediaSection = dynamic(() =>
  import('@/components/sections/MediaSection').then((m) => m.MediaSection)
)
const FooterSection = dynamic(() =>
  import('@/components/sections/FooterSection').then((m) => m.FooterSection)
)

export default function Home() {
  return (
    <main>
      <HeroSection />
      <JourneySection />
      <IntersectionSection />
      <FundSection />
      <BarbershopSection />
      <MediaSection />
      <FooterSection />
    </main>
  )
}
