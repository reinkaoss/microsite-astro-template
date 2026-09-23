import { useEffect, useRef, useState } from 'react'

/** Number that counts up when it scrolls into view. */
interface Props { value: number; prefix?: string; suffix?: string; label: string; duration?: number }

export default function StatCounter({ value, prefix = '', suffix = '', label, duration = 1600 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(value) // final value in the HTML, so no-JS and crawlers see real numbers
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return // already on screen: leave it
    setShown(0)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration)
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])
  return (
    <div ref={ref}>
      <p className="font-display text-5xl font-bold tabular-nums sm:text-6xl">{prefix}{shown.toLocaleString('en-GB')}{suffix}</p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-widest opacity-80">{label}</p>
    </div>
  )
}
