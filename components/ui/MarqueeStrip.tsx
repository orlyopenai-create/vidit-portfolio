const ITEMS = [
  'The Barbershop Fund',
  '₹25Cr Category-I AIF',
  '25 Portfolio Companies',
  '1.8x MOIC',
  '80 LPs',
  'Consumer First',
  'Operator-Investor',
  '5 Shark Tank India Companies',
  '50%+ Follow-on Rate',
]

const separator = <span className="mx-6 text-accent/40">·</span>

const track = (
  <span className="inline-flex items-center whitespace-nowrap">
    {ITEMS.map((item, i) => (
      <span key={i} className="inline-flex items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
          {item}
        </span>
        {separator}
      </span>
    ))}
  </span>
)

export function MarqueeStrip() {
  return (
    <div className="border-y border-muted/20 py-3 overflow-hidden bg-surface/30">
      <div
        className="flex"
        style={{ animation: 'marquee-scroll 28s linear infinite' }}
      >
        {/* Duplicate for seamless loop */}
        {track}
        {track}
        {track}
        {track}
      </div>
    </div>
  )
}
