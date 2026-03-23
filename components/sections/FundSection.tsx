import dynamic from 'next/dynamic'
import { fundData } from '@/lib/data/fund'

const FundAnimations = dynamic(() =>
  import('@/components/fund/FundAnimations').then((m) => m.FundAnimations)
)
const LogoGrid = dynamic(() =>
  import('@/components/fund/LogoGrid').then((m) => m.LogoGrid)
)

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
