export function BarberPole({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-sm overflow-hidden shrink-0 ${className}`}
      style={{
        background: `repeating-linear-gradient(
          -45deg,
          #A6701A 0px,
          #A6701A 3px,
          #F5EFE6 3px,
          #F5EFE6 7px
        )`,
      }}
    />
  )
}
