import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
  /** Número de orden, se muestra como 01, 02… */
  index: number
  title: string
  /** Dato mono alineado a la derecha (fecha, género) */
  meta?: string
  /** El player — se monta recién al expandir (patrón facade) */
  children: ReactNode
}

export default function TrackRow({ index, title, meta, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <li className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex min-h-14 w-full items-center gap-4 py-3 text-left"
      >
        <span className="font-mono text-xs text-text-dim">
          {String(index).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1 truncate text-base transition-colors duration-(--duration-hover) group-hover:text-accent">
          {title}
        </span>
        {meta && (
          <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.08em] text-text-dim sm:block">
            {meta}
          </span>
        )}
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`shrink-0 text-text-dim transition-transform duration-(--duration-reveal) ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="animate-fade-up pb-4">{children}</div>}
    </li>
  )
}
