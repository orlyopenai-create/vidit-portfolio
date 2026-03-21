'use client'

import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import type { Company } from '@/lib/types'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

// 25 scatter positions (left%, top%) — 3 rings around center (50%, 46%)
const POSITIONS = [
  // Ring 1 – 5
  { left: 65, top: 49 },
  { left: 50, top: 61 },
  { left: 35, top: 49 },
  { left: 41, top: 33 },
  { left: 59, top: 33 },
  // Ring 2 – 9
  { left: 79, top: 46 },
  { left: 72, top: 62 },
  { left: 55, top: 71 },
  { left: 37, top: 68 },
  { left: 23, top: 55 },
  { left: 23, top: 37 },
  { left: 37, top: 23 },
  { left: 55, top: 20 },
  { left: 72, top: 28 },
  // Ring 3 – 11
  { left: 88, top: 46 },
  { left: 81, top: 64 },
  { left: 65, top: 76 },
  { left: 46, top: 80 },
  { left: 28, top: 72 },
  { left: 15, top: 57 },
  { left: 15, top: 35 },
  { left: 28, top: 20 },
  { left: 46, top: 13 },
  { left: 65, top: 16 },
  { left: 81, top: 27 },
]

// Per-logo float timing (delay s, duration s)
const FLOAT = [
  { d: 0.0, t: 3.2 }, { d: 0.6, t: 2.8 }, { d: 1.2, t: 3.5 },
  { d: 0.3, t: 3.0 }, { d: 0.9, t: 2.6 }, { d: 1.5, t: 3.3 },
  { d: 0.2, t: 2.9 }, { d: 0.8, t: 3.6 }, { d: 1.4, t: 2.7 },
  { d: 0.4, t: 3.1 }, { d: 1.0, t: 3.4 }, { d: 0.1, t: 2.8 },
  { d: 0.7, t: 3.0 }, { d: 1.3, t: 3.2 }, { d: 0.5, t: 2.9 },
  { d: 0.8, t: 3.5 }, { d: 1.1, t: 3.1 }, { d: 0.3, t: 2.7 },
  { d: 0.7, t: 3.3 }, { d: 1.4, t: 3.0 }, { d: 0.5, t: 2.8 },
  { d: 1.0, t: 3.4 }, { d: 0.2, t: 3.1 }, { d: 0.6, t: 2.9 },
  { d: 1.2, t: 3.2 },
]

function getBarWidth(multiple: string): number {
  const match = multiple.match(/[\d.]+/)
  if (!match) return 0
  return Math.min(parseFloat(match[0]) / 5, 1) * 100
}

export function LogoGrid({ companies }: { companies: Company[] }) {
  const [selected, setSelected] = useState<Company | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [floatReady, setFloatReady] = useState(false)

  // Gate everything on scroll-into-view
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-5% 0px' })

  // Start floating ~1.8s after burst begins (burst takes ~0.25 + 25*0.045 ≈ 1.4s)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setFloatReady(true), 1800)
    return () => clearTimeout(t)
  }, [inView])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <m.div
        ref={containerRef}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-4 mb-6 mt-2">
          <img
            src="/the_barbershop_with_shantanu_logo.jpg"
            alt="The Barbershop Fund"
            className="h-8 w-auto object-contain opacity-80"
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#F2EAE0]/30">
            Portfolio — 24 Companies
          </span>
        </div>

        {/* ── Desktop: constellation ── */}
        <div
          className="relative w-full hidden md:block"
          style={{ paddingBottom: '68%' }}
        >
          {/* Center badge */}
          <div
            className="absolute z-10"
            style={{ left: '50%', top: '46%', transform: 'translate(-50%, -50%)' }}
          >
            <m.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 180, damping: 16 }}
              className="w-20 h-20 rounded-full border border-[#C4832A]/40 flex items-center justify-center overflow-hidden bg-[#161210]"
            >
              <img
                src="/logos/barbershop-cover.png"
                alt="The Barbershop Fund"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    parent.innerHTML = '<span style="font-family:var(--font-display);font-size:9px;color:#C4832A;text-align:center;line-height:1.4;padding:8px;display:block">The<br/>Barbershop<br/>Fund</span>'
                  }
                }}
              />
            </m.div>
          </div>

          {/* Logo nodes */}
          {companies.map((company, i) => {
            const pos = POSITIONS[i] || { left: 50, top: 46 }
            const fp = FLOAT[i] || { d: 0, t: 3 }
            const burstDelay = 0.2 + i * 0.05

            return (
              <div
                key={company.slug}
                className="absolute"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              >
                {/* Float wrapper */}
                <div
                  style={{
                    transform: 'translate(-50%, -50%)',
                    animationName: floatReady ? 'logo-float' : 'none',
                    animationDuration: `${fp.t}s`,
                    animationDelay: `${fp.d}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                  }}
                >
                  <m.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: burstDelay,
                      type: 'spring',
                      stiffness: 220,
                      damping: 16,
                    }}
                    className="relative flex items-center justify-center rounded-xl bg-[#161210] hover:bg-[#3D2E1A] transition-colors duration-200 cursor-pointer"
                    style={{ width: '90px', height: '54px' }}
                    onClick={() => setSelected(company)}
                    onMouseEnter={() => setHovered(company.slug)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`View ${company.name}`}
                  >
                    <img
                      src={company.logoPath}
                      alt={company.name}
                      className="h-7 w-auto max-w-[72px] object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const span = document.createElement('span')
                        span.textContent = company.name
                        span.style.cssText = 'font-size:8px;color:#F2EAE0;opacity:0.7;text-align:center;padding:0 6px;line-height:1.2;font-family:var(--font-body)'
                        e.currentTarget.parentElement?.appendChild(span)
                      }}
                    />

                    {/* Tooltip */}
                    {hovered === company.slug && (
                      <div
                        className="absolute pointer-events-none z-30 whitespace-nowrap"
                        style={{ bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }}
                      >
                        <div className="bg-[#080604] border border-[#C4832A]/25 rounded-lg px-3 py-2 shadow-xl">
                          <p className="font-body text-[11px] font-medium text-[#F2EAE0] leading-none mb-0.5">{company.name}</p>
                          <p className="font-mono text-[9px] text-[#C4832A]/70 uppercase tracking-widest">{company.sector}</p>
                        </div>
                        <div
                          style={{
                            width: 0,
                            marginLeft: '50%',
                            transform: 'translateX(-50%)',
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid rgba(166,112,26,0.25)',
                          }}
                        />
                      </div>
                    )}
                  </m.button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile: animated grid burst + float ── */}
        <div className="md:hidden">
          {/* Center icon */}
          <div className="flex justify-center mb-6">
            <m.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 180, damping: 16 }}
              className="w-16 h-16 rounded-full border border-[#C4832A]/40 flex items-center justify-center overflow-hidden bg-[#161210]"
            >
              <img
                src="/logos/barbershop-cover.png"
                alt="The Barbershop Fund"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    parent.innerHTML = '<span style="font-family:var(--font-display);font-size:7px;color:#C4832A;text-align:center;line-height:1.4;padding:6px;display:block">BSF</span>'
                  }
                }}
              />
            </m.div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {companies.map((company, i) => {
              const fp = FLOAT[i] || { d: 0, t: 3 }
              return (
                <m.button
                  key={company.slug}
                  className="flex items-center justify-center rounded-xl bg-[#161210]"
                  style={{
                    width: '86px',
                    height: '50px',
                    animationName: 'logo-float-grid',
                    animationDuration: `${fp.t}s`,
                    animationDelay: `${fp.d + 1.5}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.035,
                    type: 'spring',
                    stiffness: 220,
                    damping: 18,
                  }}
                  onClick={() => setSelected(company)}
                  aria-label={`View ${company.name}`}
                >
                  <img
                    src={company.logoPath}
                    alt={company.name}
                    className="h-7 w-auto max-w-[68px] object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const span = document.createElement('span')
                      span.textContent = company.name
                      span.style.cssText = 'font-size:8px;color:#F2EAE0;opacity:0.7;text-align:center;padding:0 6px;line-height:1.2;font-family:var(--font-body)'
                      e.currentTarget.parentElement?.appendChild(span)
                    }}
                  />
                </m.button>
              )
            })}
          </div>
        </div>
      </m.div>

      {/* Popout modal */}
      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(28,20,16,0.8)' }}
            onClick={() => setSelected(null)}
          >
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: LANDO_EASE }}
              className="relative rounded-2xl p-8 max-w-sm w-full shadow-2xl"
              style={{ backgroundColor: '#161210' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close company details"
                className="absolute top-4 right-5 font-mono text-lg text-[#F2EAE0]/30 hover:text-[#F2EAE0]/70 transition-colors"
              >
                ×
              </button>

              <div className="flex items-center justify-center h-14 mb-5">
                <img
                  src={selected.logoPath}
                  alt={selected.name}
                  className="h-10 w-auto max-w-[160px] object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>

              <h3 className="font-display text-xl font-normal text-[#F2EAE0] mb-1 text-center">{selected.name}</h3>
              <p className="font-mono text-[10px] text-[#C4832A]/60 uppercase tracking-widest text-center mb-5">{selected.sector}</p>

              {selected.entryValuation && (
                <div className="border-t border-[#F2EAE0]/10 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#F2EAE0]/50">Entry</span>
                    <span className="font-mono text-sm text-[#F2EAE0]">{selected.entryValuation}</span>
                  </div>
                  {selected.latestValuation && (
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-[#F2EAE0]/50">Latest</span>
                      <span className="font-mono text-sm text-[#F2EAE0]">{selected.latestValuation}</span>
                    </div>
                  )}
                  {selected.multiple && (
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-[#F2EAE0]/50">Multiple</span>
                      <span className="font-mono text-sm font-semibold text-[#C4832A]">{selected.multiple}</span>
                    </div>
                  )}
                  {selected.coInvestors && selected.coInvestors !== '—' && (
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-body text-sm text-[#F2EAE0]/50 shrink-0">Co-investors</span>
                      <span className="font-body text-sm text-[#F2EAE0]/80 text-right">{selected.coInvestors}</span>
                    </div>
                  )}
                  {selected.multiple && (
                    <div className="pt-1">
                      <div className="h-1 rounded-full overflow-hidden bg-[#080604]">
                        <m.div
                          className="h-full rounded-full bg-[#C4832A]"
                          initial={{ width: 0 }}
                          animate={{ width: `${getBarWidth(selected.multiple)}%` }}
                          transition={{ duration: 1.2, type: 'spring', stiffness: 60, damping: 20 }}
                        />
                      </div>
                      <p className="font-mono text-[9px] text-[#F2EAE0]/25 mt-1 text-right">{selected.multiple} return</p>
                    </div>
                  )}
                </div>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
