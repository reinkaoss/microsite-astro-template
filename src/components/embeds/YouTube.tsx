import { useState } from 'react'

/**
 * Lightweight YouTube embed: shows the thumbnail and only loads the (heavy)
 * player when clicked. Uses youtube-nocookie.com so no cookies are set
 * until the video plays.
 */
interface Props { id: string; title: string; className?: string }

export default function YouTube({ id, title, className = '' }: Props) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`relative aspect-video overflow-hidden rounded-card border-[3px] border-line bg-ink shadow-card ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full" aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100" />
          <span className="absolute inset-0 m-auto grid size-20 place-items-center rounded-full border-[3px] border-line bg-accent text-accent-ink shadow-card transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 size-8" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  )
}
