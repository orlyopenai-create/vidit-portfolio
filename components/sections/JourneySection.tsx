'use client'
import dynamic from 'next/dynamic'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'

const WorldMap = dynamic(
  () => import('@/components/journey/WorldMap').then((m) => m.WorldMap),
  { ssr: false, loading: () => <div className="w-full" style={{ height: '60vh', backgroundColor: '#EDE4D8', borderRadius: '12px' }} /> }
)

export function JourneySection() {
  return (
    <section id="journey" className="py-16 md:py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto md:px-6">
        <SectionLabel text="THE JOURNEY" />

        <div className="mb-8">
          <ClipReveal>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
              Four cities. One thread.
            </h2>
          </ClipReveal>
        </div>

        <p className="font-subheading italic text-[1.3rem] text-foreground/55 mb-10 leading-relaxed">
          From Kolkata to Mumbai to London to Delhi — and back to where it started.
        </p>

        <WorldMap />
      </div>
    </section>
  )
}
