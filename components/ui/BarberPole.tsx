export function BarberPole({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-sm overflow-hidden shrink-0 ${className}`}
      style={{
        background: `repeating-linear-gradient(
          -45deg,
          #C4832A 0px,
          #C4832A 3px,
          #F2EAE0 3px,
          #F2EAE0 7px
        )`,
      }}
    />
  )
}
