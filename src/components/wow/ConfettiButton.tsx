import { confetti } from './confetti'

export default function ConfettiButton({ label = 'Celebrate' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => confetti()}
      className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-accent-ink transition hover:-translate-y-0.5 hover:shadow-card"
    >
      🎉 {label}
    </button>
  )
}
