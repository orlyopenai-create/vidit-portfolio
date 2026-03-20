'use client'
import dynamic from 'next/dynamic'
import { m } from 'framer-motion'

const WorldMap = dynamic(
  () => import('@/components/journey/WorldMap').then((m) => m.WorldMap),
  { ssr: false, loading: () => <div className="w-full aspect-[2/1] bg-surface rounded-xl animate-pulse" /> }
)

export function JourneySection() {
  return (
    <section id="journey" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            The Journey
          </h2>
          <p className="font-body text-sm text-foreground/60 mb-10">
            Four cities. Nine years. One through-line.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WorldMap />
        </m.div>
      </div>
    </section>
  )
}
