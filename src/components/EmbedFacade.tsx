import { useState, type ReactNode, type CSSProperties } from 'react'
import { Play } from 'lucide-react'

type Props = {
  title: string
  /** Línea mono bajo el título (autor, sello, año…) */
  meta?: string
  /** aspect-ratio CSS del bloque, ej. '16 / 9' */
  aspect?: string
  /** Alto fijo en px si el player no es proporcional */
  height?: number
  /** Cover opcional detrás del facade */
  cover?: string
  /** El iframe real — se monta recién al click */
  children: ReactNode
}

export default function EmbedFacade({ title, meta, aspect, height, cover, children }: Props) {
  const [loaded, setLoaded] = useState(false)
  const style: CSSProperties = aspect ? { aspectRatio: aspect } : { height }

  if (loaded) {
    return <div className="animate-fade-up">{children}</div>
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Reproducir ${title}`}
      style={style}
      className="group relative flex w-full min-h-28 items-end justify-between gap-4 overflow-hidden border border-line bg-surface p-4 text-left transition-colors duration-(--duration-hover) hover:bg-surface-2"
    >
      {cover && (
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35 transition-opacity duration-(--duration-hover) group-hover:opacity-50"
        />
      )}
      <span className="relative min-w-0">
        <span className="block truncate text-lg">{title}</span>
        {meta && (
          <span className="mt-1 block font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
            {meta}
          </span>
        )}
      </span>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent text-accent transition-colors duration-(--duration-hover) group-hover:bg-accent group-hover:text-bg">
        <Play size={16} strokeWidth={1.5} />
      </span>
    </button>
  )
}
