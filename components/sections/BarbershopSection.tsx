import { BridgeAnimations } from '@/components/barbershop/BridgeAnimations'
import { bridgeEpisodes } from '@/lib/data/barbershop'

export function BarbershopSection() {
  return (
    <section id="bridge" className="py-24 px-6 bg-surface/40">
      <div className="max-w-4xl mx-auto">
        <BridgeAnimations episodes={bridgeEpisodes} />
      </div>
    </section>
  )
}
