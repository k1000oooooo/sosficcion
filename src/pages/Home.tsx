import { useHead } from '@unhead/react'
import ReleaseCard from '../components/ReleaseCard'
import { releases } from '../content/releases'

export default function Home() {
  useHead({ title: 'Camilo Franco' })
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
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
      </section>

      {/* Releases */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
            Releases
          </p>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {releases.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
