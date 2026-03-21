'use client'
import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

export function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <div ref={ref} className="flex flex-col gap-2 mb-6">
      <m.span
        className={`font-body text-[0.7rem] font-semibold tracking-[0.2em] uppercase ${dark ? 'text-[#A6701A]' : 'text-accent'}`}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
      >
        {text}
      </m.span>
      <m.div
        className="h-[2px] bg-accent origin-left"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        style={{ width: 40 }}
      />
    </div>
  )
}
