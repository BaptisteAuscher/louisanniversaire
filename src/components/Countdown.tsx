import { useCountdown } from '../hooks/useCountdown'

interface CountdownProps {
  targetDate: Date
}

interface CountdownUnitProps {
  value: number
  label: string
  accent?: boolean
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

function CountdownUnit({ value, label, accent = false }: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      <span
        className={`tabular-nums text-5xl font-black leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl ${
          accent ? 'text-accent-terracotta' : 'text-gallery-900'
        }`}
      >
        {pad(value)}
      </span>
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-gallery-800/45 sm:text-xs md:text-sm">
        {label}
      </span>
    </div>
  )
}

export function Countdown({ targetDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetDate)

  if (isComplete) {
    return (
      <div className="animate-fade-up-delay-3 text-center">
        <p className="font-serif text-3xl italic text-gallery-900 sm:text-4xl md:text-5xl">
          C&apos;est aujourd&apos;hui.
        </p>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.4em] text-accent-gold">
          Joyeux anniversaire, Louisa
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-up-delay-3 w-full max-w-5xl">
      <p className="mb-6 text-center text-[0.65rem] font-medium uppercase tracking-[0.45em] text-gallery-800/40 sm:text-xs md:mb-8">
        Compte à rebours
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 md:gap-x-10">
        <CountdownUnit value={days} label="Jours" accent />
        <CountdownUnit value={hours} label="Heures" />
        <CountdownUnit value={minutes} label="Minutes" />
        <CountdownUnit value={seconds} label="Secondes" />
      </div>
    </div>
  )
}
