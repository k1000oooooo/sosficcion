import { useHead } from '@unhead/react'

export default function Home() {
  useHead({ title: 'Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
        Ambient · Minimal · Techno
      </p>
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Camilo Franco</h1>
      <p className="mt-6 max-w-[42ch] text-base">
        Canciones ambient, combinadas con ritmo minimal y tecno, recuerdos,
        descubiertos, paisajes sonoros.
      </p>
      <p className="mt-2 max-w-[42ch] text-base text-text-dim">
        Ambient songs, combined with minimal and techno rhythm.
      </p>
    </main>
  )
}
