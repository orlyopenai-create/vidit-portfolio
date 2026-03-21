import { fundData } from '@/lib/data/fund'
import { FundAnimations } from '@/components/fund/FundAnimations'
import { LogoGrid } from '@/components/fund/LogoGrid'

export function FundSection() {
  return (
    <section
      id="fund"
      className="py-16 md:py-24 px-6"
      style={{ backgroundColor: '#080604', color: '#F2EAE0' }}
    >
      <div className="max-w-6xl mx-auto md:px-6">
        <FundAnimations />
        <LogoGrid companies={fundData.portfolioCompanies} />
      </div>
    </section>
  )
}
