import { fundData } from '@/lib/data/fund'
import { FundAnimations } from '@/components/fund/FundAnimations'
import { LogoGrid } from '@/components/fund/LogoGrid'

export function FundSection() {
  return (
    <section
      id="fund"
      className="py-24 md:py-36 lg:py-48 px-6"
      style={{ backgroundColor: '#1C1410', color: '#F0E8DC' }}
    >
      <div className="max-w-6xl mx-auto md:px-6">
        <FundAnimations />
        <LogoGrid companies={fundData.portfolioCompanies} />
      </div>
    </section>
  )
}
