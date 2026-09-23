import { useEffect, useState } from 'react'

/**
 * Demo only (Kit page): re-skins the whole site live by swapping the theme
 * tokens in theme.css. Shows how one template becomes any client's brand.
 */
const themes = [
  { id: 'default', name: 'Acme', swatch: ['#3b2fd9', '#ffcf33'] },
  { id: 'midnight', name: 'Midnight', swatch: ['#0d1321', '#00e0b8'] },
  { id: 'sunrise', name: 'Sunrise', swatch: ['#ff5a1f', '#2b2be0'] },
  { id: 'forest', name: 'Forest', swatch: ['#1f6f4a', '#d7f25e'] },
]

function apply(id: string) {
  const root = document.documentElement
  if (id === 'default') delete root.dataset.theme
  else root.dataset.theme = id
}

export default function BrandSwitcher() {
  const [current, setCurrent] = useState('default')
  useEffect(() => {
    try { const saved = sessionStorage.getItem('demo-theme'); if (saved) { setCurrent(saved); apply(saved) } } catch {}
  }, [])
  const pick = (id: string) => {
    setCurrent(id); apply(id)
    try { sessionStorage.setItem('demo-theme', id) } catch {}
  }
  return (
    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Demo brand">
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={current === t.id}
          onClick={() => pick(t.id)}
          className={`flex items-center gap-3 rounded-full border-2 border-line px-4 py-2 font-display text-sm font-bold uppercase transition ${current === t.id ? 'bg-ink text-surface' : 'bg-surface text-ink hover:-translate-y-0.5'}`}
        >
          <span className="flex" aria-hidden="true">
            {t.swatch.map((c) => <span key={c} className="-mr-1.5 size-5 rounded-full border-2 border-surface" style={{ background: c }} />)}
          </span>
          {t.name}
        </button>
      ))}
    </div>
  )
}
