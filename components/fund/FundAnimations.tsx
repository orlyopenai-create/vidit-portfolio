'use client'

import { useRef, useEffect, useState } from 'react'
import { m, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

const fundStats = [
  { value: 25, label: 'COMPANIES BACKED', suffix: '', decimals: 0 },
  { value: 1.8, label: 'MOIC (FUND)', suffix: 'x', decimals: 1 },
  { value: 5, label: 'SHARK TANK ALUMNI', suffix: '', decimals: 0 },
]

const highlights = [
  {
    name: 'Go Zero',
    tag: 'Food & Beverage',
    multiple: '~12x',
    line: '#1 guilt-free ice cream on quick commerce. ₹90Cr ARR run-rate.',
  },
  {
    name: 'Kilrr',
    tag: 'Food & Beverage',
    multiple: '~5x',
    line: 'Raised on Shark Tank from Anupam Mittal. 190+ cities on Blinkit & Instamart.',
  },
  {
    name: 'Epithera',
    tag: 'Health & Wellness',
    multiple: 'Clinical win',
    line: '100% user improvement in Cohort 1 trials. 77% reported drastic acne reduction.',
  },
  {
    name: 'Crest Wealth',
    tag: 'Fintech',
    multiple: '₹100Cr',
    line: '₹100Cr in soft commitments. Active onboarding now underway under licensed structure.',
  },
]

const founderTraits = [
  'Deep domain expertise',
  'Irrational conviction',
  'Would build without funding',
]

const companyTraits = [
  'Brand as a moat',
  'Content-led growth',
  'Category creation',
]

function StatCountUp({ value, label, suffix, decimals }: { value: number; label: string; suffix: string; decimals: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * value).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, decimals])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <span className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] text-[#A6701A] leading-none tracking-[-0.02em]">
        {count.toFixed(decimals)}{suffix}
      </span>
      <span className="font-body text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[#F0E8DC]/45 text-center">
        {label}
      </span>
    </div>
  )
}

export function FundAnimations() {
  return (
    <div>
      <SectionLabel text="THE BARBERSHOP FUND" dark />

      <div className="mb-6">
        <ClipReveal>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#F0E8DC]">
            The Barbershop Fund
          </h2>
        </ClipReveal>
      </div>

      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.15 }}
        className="font-body text-[1rem] text-[#F0E8DC]/60 leading-relaxed max-w-2xl mb-12"
      >
        The Barbershop Fund is a ₹25Cr Category-I AIF built by Shantanu Deshpande, founder of Bombay Shaving Company. As the fund&rsquo;s sole investment professional, I ran deal flow, built the evaluation process, and worked closely with every founder in the portfolio.
      </m.p>

      {/* Stats strip */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.2 }}
        className="grid grid-cols-3 gap-8 mb-14 border-t border-[#F0E8DC]/8 pt-10"
      >
        {fundStats.map((stat) => (
          <StatCountUp key={stat.label} {...stat} />
        ))}
      </m.div>

      {/* Portfolio highlights */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.1 }}
        className="mb-14 border-t border-[#F0E8DC]/8 pt-10"
      >
        <p className="font-subheading italic text-[1.3rem] text-[#F0E8DC]/70 mb-7">
          Portfolio standouts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <m.div
              key={h.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: LANDO_EASE, delay: 0.05 + i * 0.07 }}
              className="rounded-xl bg-[#2A1F14] p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-display text-[1.05rem] text-[#F0E8DC]">{h.name}</span>
                <span className="font-mono text-[0.72rem] text-[#A6701A] shrink-0">{h.multiple}</span>
              </div>
              <p className="font-mono text-[0.65rem] text-[#A6701A]/55 uppercase tracking-widest mb-2">{h.tag}</p>
              <p className="font-body text-[0.85rem] text-[#F0E8DC]/50 leading-snug">{h.line}</p>
            </m.div>
          ))}
        </div>
      </m.div>

      {/* What I Look For */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.1 }}
        className="border-t border-[#F0E8DC]/8 pt-10"
      >
        <p className="font-subheading italic text-[1.3rem] text-[#F0E8DC]/70 mb-7">
          What three years of deal flow taught me.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#A6701A]/60 mb-4">
              In Founders
            </p>
            <div className="space-y-2.5">
              {founderTraits.map((trait) => (
                <div key={trait} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#A6701A]/50 shrink-0" />
                  <p className="font-body text-[0.9rem] text-[#F0E8DC]/60 leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#A6701A]/60 mb-4">
              In Companies
            </p>
            <div className="space-y-2.5">
              {companyTraits.map((trait) => (
                <div key={trait} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#A6701A]/50 shrink-0" />
                  <p className="font-body text-[0.9rem] text-[#F0E8DC]/60 leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </m.div>
    </div>
  )
}
