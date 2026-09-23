import { useEffect, useState } from 'react'

/**
 * Live countdown to a date from campaign.config.ts (opening or closing).
 * Renders a static placeholder on the server, then ticks in the browser.
 */
interface Props { to: string; label?: string; onDoneText?: string }

const units = [
  ['days', 86_400_000],
  ['hours', 3_600_000],
  ['mins', 60_000],
  ['secs', 1_000],
] as const

function split(ms: number) {
  let rest = Math.max(0, ms)
  return units.map(([name, size]) => {
    const v = Math.floor(rest / size)
    rest -= v * size
    return [name, v] as const
  })
}

export default function Countdown({ to, label = 'Entries close in', onDoneText = 'Entries are now closed' }: Props) {
  const target = new Date(to).getTime()
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const left = now === null ? null : target - now
  if (left !== null && left <= 0) return <p className="font-display text-xl font-bold">{onDoneText}</p>
  return (
    <div role="timer" aria-live="off">
      <p className="eyebrow mb-3">{label}</p>
      <div className="flex gap-2 sm:gap-3">
        {split(left ?? 0).map(([name, v]) => (
          <div key={name} className="min-w-16 rounded-2xl border-[3px] border-line bg-surface px-3 py-2 text-center text-ink shadow-card sm:min-w-20">
            <span className="block font-display text-3xl font-bold tabular-nums sm:text-4xl">{left === null ? '--' : String(v).padStart(2, '0')}</span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
