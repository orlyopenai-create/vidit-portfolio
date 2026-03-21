'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ClipReveal } from '@/components/ui/ClipReveal'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

const domains = [
  {
    label: 'Finance',
    direction: { x: -40, y: 0 },
    points: ['Nomura London · Large-cap M&A', 'Sovereign Green Samurai bond'],
  },
  {
    label: 'Operations',
    direction: { x: 40, y: 0 },
    points: ['Chief of Staff, BSC · P&L, teams, brands', 'Head of Business · Orly est. 1989'],
  },
  {
    label: 'Content',
    direction: { x: 0, y: -40 },
    points: ['The Bridge IP · The Orly Times', '18K LinkedIn · Brand storytelling'],
  },
]

const proofCards = [
  {
    world: 'Finance',
    detail: 'Large-cap M&A transactions across renewable energy, consumer, and financial services. First sovereign Green Samurai bond transaction.',
  },
  {
    world: 'Operations',
    detail: 'Chief of Staff at Bombay Shaving Company. P&L ownership, teams, 0→1 brand building. Now Head of Business at Orly — the family brand since 1989.',
  },
  {
    world: 'Content',
    detail: 'Built The Bridge IP. Co-created The Orly Times neighbourhood newspaper. 18,000 readers on LinkedIn writing about brands and capital.',
  },
]

// SVG Venn — three circles, outline only, labels outside
function VennDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Circle centres (normalized SVG space 0-400 x 0-340)
  const cx = 200
  const cy = 170
  const r = 95
  const offset = 55

  const centres = [
    { x: cx - offset, y: cy + 18, label: 'Finance', labelX: cx - offset - r - 12, labelY: cy + 18, anchor: 'end' },
    { x: cx + offset, y: cy + 18, label: 'Operations', labelX: cx + offset + r + 12, labelY: cy + 18, anchor: 'start' },
    { x: cx, y: cy - offset, label: 'Content', labelX: cx, labelY: cy - offset - r - 16, anchor: 'middle' },
  ]

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 400 340" className="w-full h-auto overflow-visible">
        {/* Three circles */}
        {centres.map((c, i) => (
          <m.circle
            key={c.label}
            cx={c.x}
            cy={c.y}
            r={r}
            fill="#A6701A"
            fillOpacity={0.05}
            stroke="#241E18"
            strokeOpacity={0.15}
            strokeWidth={1.5}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, ease: LANDO_EASE, delay: i * 0.2 }}
            style={{ transformOrigin: `${c.x}px ${c.y}px` }}
          />
        ))}

        {/* Labels outside circles */}
        {centres.map((c, i) => (
          <m.g key={`label-${c.label}`}
            initial={{ opacity: 0, x: i === 0 ? -20 : i === 1 ? 20 : 0, y: i === 2 ? -20 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.6 + i * 0.08 }}
          >
            <text
              x={c.labelX}
              y={c.labelY}
              textAnchor={c.anchor as 'start' | 'end' | 'middle'}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                fill: '#241E18',
              }}
            >
              {c.label}
            </text>
          </m.g>
        ))}

        {/* Centre label */}
        <m.text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontStyle: 'italic',
            fill: '#A6701A',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: LANDO_EASE, delay: 0.85 }}
        >
          Operator-Investor
        </m.text>
      </svg>

      {/* Proof points per domain */}
      <div className="absolute left-0 top-[30%] -translate-y-1/2 max-w-[130px]">
        {domains[0].points.map((pt) => (
          <p key={pt} className="font-body text-[0.7rem] text-foreground/50 leading-snug mb-1">{pt}</p>
        ))}
      </div>
      <div className="absolute right-0 top-[30%] -translate-y-1/2 max-w-[130px] text-right">
        {domains[1].points.map((pt) => (
          <p key={pt} className="font-body text-[0.7rem] text-foreground/50 leading-snug mb-1">{pt}</p>
        ))}
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-[140px] text-center">
        {domains[2].points.map((pt) => (
          <p key={pt} className="font-body text-[0.7rem] text-foreground/50 leading-snug mb-1">{pt}</p>
        ))}
      </div>
    </div>
  )
}

// Mobile: stacked cards
function MobileCards() {
  return (
    <div className="flex flex-col gap-4 md:hidden mb-12">
      {proofCards.map((card, i) => (
        <m.div
          key={card.world}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: LANDO_EASE, delay: i * 0.1 }}
          className="bg-surface rounded-xl p-5"
        >
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-accent mb-2">{card.world}</p>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">{card.detail}</p>
        </m.div>
      ))}
    </div>
  )
}

export function IntersectionAnimations() {
  return (
    <div>
      <SectionLabel text="THE INTERSECTION" />

      <div className="mb-12">
        <ClipReveal>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[1.1] tracking-[-0.01em] text-foreground">
            Three worlds. One lens.
          </h2>
        </ClipReveal>
      </div>

      {/* Desktop Venn */}
      <div className="hidden md:block mb-16">
        <VennDiagram />
      </div>

      {/* Mobile cards */}
      <MobileCards />

      {/* Payoff */}
      <m.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: LANDO_EASE, delay: 0.3 }}
        className="max-w-2xl"
      >
        <p className="font-body text-[1.05rem] text-foreground/65 leading-relaxed">
          Most people have one of these worlds. Having all three means walking into every conversation having been on both sides of the table — as the person who built, and as the person who backed.
        </p>
      </m.div>
    </div>
  )
}
