import { fundData } from '@/lib/data/fund'
import { FundAnimations } from '@/components/fund/FundAnimations'
import { LogoGrid } from '@/components/fund/LogoGrid'

export function FundSection() {
  return (
    <section id="fund" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FundAnimations
          name={fundData.name}
          subtitle={fundData.subtitle}
          stats={fundData.stats}
          investments={fundData.standoutInvestments}
        />
        <LogoGrid companies={fundData.portfolioCompanies} />
      </div>
    </section>
  )
}
