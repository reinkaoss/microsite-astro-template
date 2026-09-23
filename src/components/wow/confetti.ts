/**
 * Tiny dependency-free confetti burst in brand colours, e.g. after a form
 * is submitted. Respects prefers-reduced-motion.
 */
export function confetti(count = 140) {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const css = getComputedStyle(document.documentElement)
  const colours = ['--color-brand', '--color-accent', '--color-ink'].map((v) => css.getPropertyValue(v).trim() || '#3b2fd9')
  const canvas = Object.assign(document.createElement('canvas'), { width: innerWidth, height: innerHeight })
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  const parts = Array.from({ length: count }, () => ({
    x: innerWidth / 2, y: innerHeight * 0.6,
    vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 18 - 6,
    r: Math.random() * 6 + 4, a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3,
    c: colours[Math.floor(Math.random() * colours.length)],
  }))
  const start = performance.now()
  const frame = (t: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of parts) {
      p.vy += 0.45; p.x += p.vx; p.y += p.vy; p.a += p.va
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore()
    }
    if (t - start < 2600) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}
