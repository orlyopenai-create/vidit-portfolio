import { BridgeAnimations } from '@/components/barbershop/BridgeAnimations'
import { bridgeEpisodes } from '@/lib/data/barbershop'

export function BarbershopSection() {
  return (
    <section id="bridge" className="py-24 md:py-36 lg:py-48 px-6 bg-surface">
      <div className="max-w-6xl mx-auto md:px-6">
        <BridgeAnimations episodes={bridgeEpisodes} />
      </div>
    </section>
  )
}
