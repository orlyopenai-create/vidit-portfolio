'use client'

import { m } from 'framer-motion'
import { StatCountUp } from '@/components/hero/StatCountUp'
import type { Stat, Investment } from '@/lib/types'

interface FundAnimationsProps {
  name: string
  subtitle: string
  stats: Stat[]
  investments: Investment[]
}

export function FundAnimations({ name, subtitle, stats, investments }: FundAnimationsProps) {
  return (
    <div>
      {/* Section header */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{name}</h2>
        <p className="font-body text-sm text-foreground/70 mb-12">{subtitle}</p>
      </m.div>

      {/* Fund stats strip — reusing StatCountUp */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <StatCountUp key={stat.label} stat={stat} />
          ))}
        </div>
      </m.div>

      {/* Standout investments table */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-6">Standout Investments</h3>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="border-b border-muted/20">
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Company</th>
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Sector</th>
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Entry Val.</th>
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Latest Val.</th>
                <th className="text-left py-3 pr-6 font-semibold text-foreground">Multiple</th>
                <th className="text-left py-3 font-semibold text-foreground">Co-investors</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.company} className="border-b border-muted/10 hover:bg-surface/50 transition-colors">
                  <td className="py-3 pr-6 font-semibold text-foreground">{inv.company}</td>
                  <td className="py-3 pr-6 text-foreground/70">{inv.sector}</td>
                  <td className="py-3 pr-6 font-mono text-foreground/70">{inv.entryValuation}</td>
                  <td className="py-3 pr-6 font-mono text-foreground/70">{inv.latestValuation}</td>
                  <td className="py-3 pr-6 font-mono text-accent font-semibold">{inv.multiple}</td>
                  <td className="py-3 text-foreground/70 text-xs">{inv.coInvestors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </m.div>
    </div>
  )
}
