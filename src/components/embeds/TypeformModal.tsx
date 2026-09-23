import { useEffect, useRef, useState } from 'react'
import { confetti } from '../wow/confetti'

/**
 * Typeform in a modal (or inline with `inline`).
 * Same behaviour as the current sites: the iframe posts
 * `thank-you-screen-redirect` when the form finishes, and we close the modal
 * (or send the user to `redirectTo`).
 */
interface Props {
  id: string
  region?: 'eu' | 'com'
  label?: string
  title?: string
  inline?: boolean
  redirectTo?: string
  className?: string
  variant?: 'primary' | 'accent'
}

const btn =
  'inline-flex items-center gap-2 rounded-full border-2 border-line px-7 py-3.5 font-display text-base font-bold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card'
const tones = { primary: 'bg-brand text-brand-ink', accent: 'bg-accent text-accent-ink' }

export default function TypeformModal({ id, region = 'eu', label = 'Start now', title = 'Form', inline = false, redirectTo, className = '', variant = 'primary' }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [loaded, setLoaded] = useState(inline)
  const src = `https://form.typeform.${region}/to/${id}?typeform-embed=embed-widget`

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!String(event.origin).includes('typeform')) return
      if (event.data?.type === 'thank-you-screen-redirect' || event.data?.type === 'form-submit') {
        confetti()
        if (redirectTo) setTimeout(() => window.location.assign(redirectTo), 1200)
        else dialog.current?.close()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [redirectTo])

  const frame = (
    <iframe src={src} title={title} className="h-full w-full border-0" allow="camera; microphone; autoplay; encrypted-media" />
  )

  if (inline) return <div className={`h-[640px] overflow-hidden rounded-card border-[3px] border-line shadow-card ${className}`}>{frame}</div>

  return (
    <>
      <button type="button" className={`${btn} ${tones[variant]} ${className}`} onClick={() => { setLoaded(true); dialog.current?.showModal() }}>
        {label}
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4"><path d="M4 10h11m-4-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <dialog
        ref={dialog}
        aria-label={title}
        className="m-auto h-[min(760px,92dvh)] w-[min(900px,94vw)] overflow-hidden rounded-card border-[3px] border-line bg-surface p-0 shadow-soft backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close() }}
      >
        <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border-2 border-line bg-surface font-bold">✕</button>
        {loaded && frame}
      </dialog>
    </>
  )
}
