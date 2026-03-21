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
    const end = value

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * end).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, decimals])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span className="font-mono text-[clamp(2.5rem,5vw,5rem)] text-[#A6701A] leading-none tracking-[-0.02em]">
        {count.toFixed(decimals)}{suffix}
      </span>
      <span className="font-body text-[0.75rem] font-medium tracking-[0.1em] uppercase text-[#F0E8DC]/50 text-center">
        {label}
      </span>
    </div>
  )
}

export function FundAnimations() {
  return (
    <div>
      <SectionLabel text="THE BARBERSHOP FUND" dark />

      <div className="mb-8">
        <ClipReveal>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#F0E8DC]">
            The Barbershop Fund
          </h2>
        </ClipReveal>
      </div>

      {/* Honest intro */}
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.15 }}
        className="font-body text-[1.05rem] text-[#F0E8DC]/65 leading-relaxed max-w-2xl mb-16"
      >
        The Barbershop Fund is a ₹25Cr Category-I AIF built by Shantanu Deshpande, founder of Bombay Shaving Company. As the fund&rsquo;s sole investment professional, I ran deal flow, built the evaluation process, and worked closely with every founder in the portfolio.
      </m.p>

      {/* Stats strip */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.2 }}
        className="grid grid-cols-3 gap-8 mb-20 border-t border-[#F0E8DC]/8 pt-12"
      >
        {fundStats.map((stat) => (
          <StatCountUp key={stat.label} {...stat} />
        ))}
      </m.div>

      {/* What I Look For */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.1 }}
        className="mb-16 border-t border-[#F0E8DC]/8 pt-12"
      >
        <p className="font-display italic text-[1.4rem] text-[#F0E8DC] mb-8 max-w-xl">
          What three years of deal flow taught me.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-[#A6701A]/70 mb-5">
              In Founders
            </p>
            <div className="space-y-3">
              {founderTraits.map((trait) => (
                <div key={trait} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#A6701A]/50 shrink-0" />
                  <p className="font-body text-sm text-[#F0E8DC]/65 leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-[#A6701A]/70 mb-5">
              In Companies
            </p>
            <div className="space-y-3">
              {companyTraits.map((trait) => (
                <div key={trait} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#A6701A]/50 shrink-0" />
                  <p className="font-body text-sm text-[#F0E8DC]/65 leading-snug">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </m.div>
    </div>
  )
}
