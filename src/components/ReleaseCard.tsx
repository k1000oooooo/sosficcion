import { useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import type { Release } from '../content/releases'
import { BandcampEmbed } from './embeds'

type Props = {
  release: Release
  /** Si true y hay player de Bandcamp, el click carga el player en lugar de salir */
  playable?: boolean
}

// Los covers viven en public/ con ruta relativa al base del deploy
const coverUrl = (cover: string) => import.meta.env.BASE_URL + cover

function CardText({ release }: { release: Release }) {
  const meta = [release.label, release.year, release.catalog].filter(Boolean).join(' · ')
  return (
    <span className="mt-3 block">
      <span className="block text-lg leading-snug">{release.title}</span>
      <span className="mt-1 block font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
        {meta}
      </span>
    </span>
  )
}

export default function ReleaseCard({ release, playable = false }: Props) {
  const [loaded, setLoaded] = useState(false)
  const canPlay = playable && !!release.bandcampAlbumId

  if (loaded && release.bandcampAlbumId) {
    return (
      <div className="animate-fade-up">
        <BandcampEmbed albumId={release.bandcampAlbumId} title={release.title} />
        <a
          href={release.url}
          target="_blank"
          rel="noopener"
          className="mt-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.08em] text-text-dim transition-colors duration-(--duration-hover) hover:text-accent"
        >
          Ver en Bandcamp <ArrowUpRight size={12} strokeWidth={1.5} />
        </a>
      </div>
    )
  }

  if (canPlay) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        aria-label={`Reproducir ${release.title}`}
        className="group block w-full text-left"
      >
        <span className="relative block overflow-hidden border border-line">
          <img
            src={coverUrl(release.cover)}
            alt={release.title}
            loading="lazy"
            className="block w-full transition-opacity duration-(--duration-hover) group-hover:opacity-85"
          />
          <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-bg/70 text-accent transition-colors duration-(--duration-hover) group-hover:bg-accent group-hover:text-bg">
            <Play size={16} strokeWidth={1.5} />
          </span>
        </span>
        <CardText release={release} />
      </button>
    )
  }

  return (
    <a href={release.url} target="_blank" rel="noopener" className="group block">
      <span className="relative block overflow-hidden border border-line transition-colors duration-(--duration-hover) group-hover:border-text-dim">
        <img
          src={coverUrl(release.cover)}
          alt={release.title}
          loading="lazy"
          className="block w-full transition-opacity duration-(--duration-hover) group-hover:opacity-85"
        />
        <span className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg/70 text-text opacity-0 transition-opacity duration-(--duration-hover) group-hover:opacity-100">
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </span>
      </span>
      <CardText release={release} />
    </a>
  )
}
