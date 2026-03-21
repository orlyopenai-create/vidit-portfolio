'use client'

import { m } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'
import type { BridgeEpisode } from '@/lib/data/barbershop'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

export function BridgeAnimations({ episodes }: { episodes: BridgeEpisode[] }) {
  return (
    <div>
      <SectionLabel text="THE BRIDGE" />

      <div className="mb-4">
        <ClipReveal>
          <h2 className="font-display text-[clamp(3rem,6vw,5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-foreground">
            The Bridge
          </h2>
        </ClipReveal>
      </div>

      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.15 }}
        className="font-subheading italic text-[1.3rem] text-foreground/55 mb-10 max-w-xl leading-relaxed"
      >
        2 CEOs vs 2 Gen Zs. An IP Vidit built, produced, and appeared in.
      </m.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {episodes.map((ep, i) => (
          <m.a
            key={ep.episode}
            href={ep.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LANDO_EASE, delay: i * 0.1 }}
            className="group block bg-background rounded-xl overflow-hidden"
          >
            {/* Thumbnail — 16:9 */}
            <div className="relative w-full aspect-video overflow-hidden">
              <img
                src={ep.thumbnail}
                alt={ep.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Play overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/15 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-background/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[0.65rem] text-[#A6701A] uppercase tracking-widest">
                  {ep.episode}
                </span>
                <span className="font-mono text-[0.65rem] text-foreground/25">·</span>
                <span className="font-body text-[0.65rem] text-foreground/45 uppercase tracking-widest border border-foreground/15 px-2 py-0.5 rounded-full">
                  {ep.topic}
                </span>
              </div>
              <p className="font-display text-[1.05rem] leading-snug text-foreground line-clamp-2">
                {ep.title}
              </p>
            </div>
          </m.a>
        ))}
      </div>
    </div>
  )
}
