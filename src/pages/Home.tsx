import { useHead } from '@unhead/react'

export default function Home() {
  useHead({ title: 'Camilo Franco' })
  return (
    <main className="px-5 py-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Camilo Franco</h1>
      <p className="mt-4 max-w-[42ch] text-base">
        Canciones ambient, combinadas con ritmo minimal y tecno, recuerdos,
        descubiertos, paisajes sonoros.
      </p>
      <p className="mt-2 max-w-[42ch] text-base text-text-dim">
        Ambient songs, combined with minimal and techno rhythm.
      </p>
    </main>
  )
}
