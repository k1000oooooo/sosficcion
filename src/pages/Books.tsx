import { Link } from 'react-router'
import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'
import { books } from '../content/books'

export default function Books() {
  useHead({ title: 'Books — Camilo Franco' })
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Biblioteca" title="Books" />
      <ul className="flex flex-col gap-6">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              to={`/books/${book.id}`}
              className="group block border border-line px-6 py-5 transition-colors duration-(--duration-hover) hover:border-text-dim"
            >
              <h2 className="text-lg text-text transition-colors duration-(--duration-hover) group-hover:text-accent">
                {book.title}
              </h2>
              <p className="mt-1 text-sm text-text-dim">{book.description}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
                {book.pages.length} páginas
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
