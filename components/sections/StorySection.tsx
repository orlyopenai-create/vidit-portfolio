'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

const timelinePills = [
  { label: 'Mumbai', years: '2016 – 2021' },
  { label: 'London', years: '2021 – 2023' },
  { label: 'Delhi + Kolkata', years: '2023 – now' },
]

const proseParagraphs = [
  `I grew up in a family that has been building things since 1989. My grandfather started Orly in Kolkata — a men's ethnicwear brand that has outlasted trends, recessions, and fast fashion by simply being good. That early exposure to patient building shaped how I see companies.`,
  `At Nomura in Mumbai and London, I learned rigour. Every assumption stress-tested. Every number checked twice. I worked on large-cap M&A transactions across renewable energy, consumer, and financial services — the kind of deals that teach you how big institutions think about value.`,
  `Then I joined Bombay Shaving Company as Chief of Staff, and everything changed. As the sole investment professional at The Barbershop Fund — a ₹25Cr AIF built by BSC founder Shantanu Deshpande — I spent two years learning what it means to back a company, not just analyse one. I sat across from 200+ founders, evaluated 25 investments, and watched what separates the ones that break out.`,
  `Along the way, I helped build The Bridge — a YouTube format exploring India's generational conversation about work, ambition, and mental health. And I wrote. A lot. 18,000 people read what I think about brands and capital.`,
  `Now I'm back in Kolkata, running Orly. Everything I've learned — finance, operations, investing, storytelling — gets applied here every day. It turns out the best preparation for any of these things is to have done the others.`,
]

function ProseBlock({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  return (
    <m.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: LANDO_EASE, delay }}
      className="font-body text-[1.05rem] leading-[1.75] text-foreground/80"
    >
      {text}
    </m.p>
  )
}

export function StorySection() {
  return (
    <section id="story" className="py-24 md:py-36 lg:py-48 px-6 bg-surface">
      <div className="max-w-6xl mx-auto md:px-6">
        <SectionLabel text="THE STORY" />

        {/* Pull quote */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <ClipReveal delay={0.1}>
            <blockquote className="font-display font-normal italic text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.4] text-foreground">
              &ldquo;I went from modelling transactions in London to backing ice cream brands from inside a startup. The lens didn&rsquo;t change — only the table.&rdquo;
            </blockquote>
          </ClipReveal>
        </div>

        {/* Prose — two columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div className="space-y-6">
            {proseParagraphs.slice(0, 3).map((para, i) => (
              <ProseBlock key={i} text={para} delay={i * 0.08} />
            ))}
          </div>
          <div className="space-y-6">
            {proseParagraphs.slice(3).map((para, i) => (
              <ProseBlock key={i} text={para} delay={0.24 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* Timeline pills */}
        <div className="flex flex-wrap gap-3">
          {timelinePills.map((pill, i) => (
            <m.div
              key={pill.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: LANDO_EASE, delay: i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2.5 border border-foreground/15 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-none" />
              <span className="font-body text-sm font-medium text-foreground/70">
                {pill.label}
              </span>
              <span className="font-mono text-[0.72rem] text-foreground/40">
                {pill.years}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
