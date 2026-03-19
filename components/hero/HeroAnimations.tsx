'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { StatCountUp } from '@/components/hero/StatCountUp'
import type { Stat } from '@/lib/types'

interface HeroAnimationsProps {
  identity: { name: string; descriptor: string; subline: string }
  stats: Stat[]
  headshot: string
}

export function HeroAnimations({ identity, stats, headshot }: HeroAnimationsProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-center px-6 md:px-16 lg:px-24 pb-12 pt-24 gap-8 md:gap-12">
        {/* Left text column */}
        <div className="md:w-3/5 flex flex-col gap-4">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
          >
            {identity.name}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="font-body text-xl md:text-2xl text-foreground"
          >
            {identity.descriptor}
          </m.p>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.30 }}
            className="font-body text-sm md:text-base text-muted"
          >
            {identity.subline}
          </m.p>
        </div>

        {/* Right photo column */}
        <div className="md:w-2/5 flex justify-center md:justify-end items-end">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
            className="hidden md:block"
          >
            <Image
              src={headshot}
              alt="Vidit Dugar"
              width={280}
              height={420}
              className="object-cover rounded-sm"
              priority={false}
            />
          </m.div>
        </div>
      </div>

      {/* Hairline separator */}
      <div className="border-t border-muted/30" />

      {/* Stat strip */}
      <div className="flex justify-around items-start px-6 md:px-16 lg:px-24 py-8">
        {stats.map((stat, i) => (
          <StatCountUp key={i} stat={stat} />
        ))}
      </div>
    </div>
  )
}
