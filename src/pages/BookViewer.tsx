import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useHead } from '@unhead/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { books } from '../content/books'

type Props = {
  bookId: string
}

export default function BookViewer({ bookId }: Props) {
  const book = books.find((b) => b.id === bookId)
  useHead({ title: `${book?.title ?? 'Books'} — Camilo Franco` })

  const [page, setPage] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const total = book?.pages.length ?? 0

  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), [])
  const next = useCallback(() => setPage((p) => Math.min(p + 1, total - 1)), [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (!book) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16 lg:py-24">
        <p className="text-text-dim">Libro no encontrado.</p>
        <Link
          to="/books"
          className="mt-4 inline-block text-sm text-text-dim transition-colors duration-(--duration-hover) hover:text-text"
        >
          ← Books
        </Link>
      </main>
    )
  }

  const current = book.pages[page]

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 lg:py-24">
      <nav
        aria-label="Miga de pan"
        className="mb-12 font-mono text-xs uppercase tracking-[0.08em]"
      >
        <Link
          to="/books"
          className="text-text-dim transition-colors duration-(--duration-hover) hover:text-text"
        >
          ← Books
        </Link>
        <span className="text-text-dim"> / </span>
        <span className="text-text">{book.title}</span>
      </nav>

      <div
        role="region"
        aria-label={`Página ${page + 1} de ${total}`}
        onTouchStart={(e) => {
          touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current
          touchStart.current = null
          if (!start) return
          const dx = e.changedTouches[0].clientX - start.x
          const dy = e.changedTouches[0].clientY - start.y
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) next()
            else prev()
          }
        }}
      >
        <pre
          key={current.id}
          className="min-h-[60vh] animate-page-fade font-sans text-base leading-relaxed whitespace-pre-wrap text-text md:text-lg"
        >
          {current.content}
        </pre>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={page === 0}
          aria-label="Página anterior"
          className="flex h-11 w-11 items-center justify-center text-text-dim transition-colors duration-(--duration-hover) hover:text-text disabled:opacity-30 disabled:hover:text-text-dim"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center gap-1">
          <div className="flex">
            {book.pages.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Ir a la página ${i + 1}`}
                aria-current={i === page ? 'true' : undefined}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-(--duration-hover) ${
                    i === page ? 'bg-accent' : 'bg-text-dim/40'
                  }`}
                />
              </button>
            ))}
          </div>
          <p aria-live="polite" className="font-mono text-xs text-text-dim">
            {String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={page === total - 1}
          aria-label="Página siguiente"
          className="flex h-11 w-11 items-center justify-center text-text-dim transition-colors duration-(--duration-hover) hover:text-text disabled:opacity-30 disabled:hover:text-text-dim"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </main>
  )
}
