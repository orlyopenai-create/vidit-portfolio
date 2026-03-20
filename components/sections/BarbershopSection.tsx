import { BridgeAnimations } from '@/components/barbershop/BridgeAnimations'
import { bridgeEpisodes } from '@/lib/data/barbershop'

export function BarbershopSection() {
  return (
    <section
      id="bridge"
      className="py-24 px-6"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent 0px,
          transparent 18px,
          rgba(166,112,26,0.03) 18px,
          rgba(166,112,26,0.03) 19px
        )`,
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <BridgeAnimations episodes={bridgeEpisodes} />
      </div>
    </section>
  )
}
