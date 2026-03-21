'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import type { Company } from '@/lib/types'

const LANDO_EASE = [0.65, 0.05, 0, 1] as const

const SECTOR_ORDER = [
  'Food & Beverage',
  'Fashion & Lifestyle',
  'Fintech',
  'Health & Wellness',
  'Climate & Mobility',
  'Consumer Durables',
  'Home & Furniture',
  'AI & Tech',
  'Education',
]

function getBarWidth(multiple: string): number {
  const match = multiple.match(/[\d.]+/)
  if (!match) return 0
  return Math.min(parseFloat(match[0]) / 5, 1) * 100
}

export function LogoGrid({ companies }: { companies: Company[] }) {
  const [selected, setSelected] = useState<Company | null>(null)

  // Escape key handler
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const grouped = SECTOR_ORDER.reduce<Record<string, Company[]>>((acc, sector) => {
    const items = companies.filter((c) => c.sector === sector)
    if (items.length) acc[sector] = items
    return acc
  }, {})

  return (
    <>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#F0E8DC]/30 mb-8 mt-2">
          Portfolio — 25 Companies
        </p>

        <div className="space-y-5">
          {Object.entries(grouped).map(([sector, items], gi) => (
            <m.div
              key={sector}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.04 }}
              className="flex items-start gap-4 md:gap-8"
            >
              {/* Sector label */}
              <div className="w-24 md:w-32 shrink-0 pt-3 text-right">
                <p className="font-mono text-[9px] text-[#A6701A]/70 uppercase tracking-widest leading-tight">
                  {sector}
                </p>
              </div>

              {/* Logo tiles */}
              <div className="flex flex-wrap gap-2 flex-1">
                {items.map((company) => (
                  <button
                    key={company.slug}
                    onClick={() => setSelected(company)}
                    aria-label={`View details for ${company.name}`}
                    className="flex items-center justify-center w-28 h-16 rounded-md bg-[#2A1F14] hover:bg-[#3A2E20] transition-colors duration-200 cursor-pointer"
                    title={company.name}
                  >
                    <img
                      src={company.logoPath}
                      alt={company.name}
                      className="h-8 w-auto max-w-[88px] object-contain"
                      style={{ mixBlendMode: 'luminosity', opacity: 0.85 }}
                      loading="lazy"
                      onError={(e) => {
                        // Text fallback if logo 404s
                        const el = e.currentTarget
                        el.style.display = 'none'
                        const span = document.createElement('span')
                        span.textContent = company.name
                        span.style.cssText = 'font-size:8px;color:#F0E8DC;opacity:0.6;text-align:center;padding:0 4px;line-height:1.2;font-family:var(--font-body)'
                        el.parentElement?.appendChild(span)
                      }}
                    />
                  </button>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </m.div>

      {/* Popout modal */}
      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(28,20,16,0.75)' }}
            onClick={() => setSelected(null)}
          >
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: LANDO_EASE }}
              className="relative rounded-2xl p-8 max-w-sm w-full shadow-2xl"
              style={{ backgroundColor: '#2A1F14' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close company details"
                className="absolute top-4 right-5 font-mono text-lg text-[#F0E8DC]/30 hover:text-[#F0E8DC]/70 transition-colors"
              >
                ×
              </button>

              {/* Logo or name */}
              <div className="flex items-center justify-center h-14 mb-5">
                <img
                  src={selected.logoPath}
                  alt={selected.name}
                  className="h-9 w-auto max-w-[160px] object-contain"
                  style={{ mixBlendMode: 'luminosity', opacity: 0.9 }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              <h3 className="font-display text-xl font-normal text-[#F0E8DC] mb-1 text-center">
                {selected.name}
              </h3>
              <p className="font-mono text-[10px] text-[#A6701A]/60 uppercase tracking-widest text-center mb-5">
                {selected.sector}
              </p>

              {selected.multiple && (
                <div className="border-t border-[#F0E8DC]/10 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#F0E8DC]/50">Entry</span>
                    <span className="font-mono text-sm text-[#F0E8DC]">{selected.entryValuation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#F0E8DC]/50">Latest</span>
                    <span className="font-mono text-sm text-[#F0E8DC]">{selected.latestValuation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#F0E8DC]/50">Multiple</span>
                    <span className="font-mono text-sm font-semibold text-[#A6701A]">{selected.multiple}</span>
                  </div>
                  {selected.coInvestors && selected.coInvestors !== '—' && (
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-body text-sm text-[#F0E8DC]/50 shrink-0">Co-investors</span>
                      <span className="font-body text-sm text-[#F0E8DC]/80 text-right">{selected.coInvestors}</span>
                    </div>
                  )}

                  {/* Valuation bar */}
                  <div className="pt-1">
                    <div className="h-1 rounded-full overflow-hidden bg-[#1C1410]">
                      <m.div
                        className="h-full rounded-full bg-[#A6701A]"
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(selected.multiple)}%` }}
                        transition={{ duration: 1.2, type: 'spring', stiffness: 60, damping: 20 }}
                      />
                    </div>
                    <p className="font-mono text-[9px] text-[#F0E8DC]/25 mt-1 text-right">
                      {selected.multiple} return
                    </p>
                  </div>
                </div>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
