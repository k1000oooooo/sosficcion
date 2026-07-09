import { useHead } from '@unhead/react'

export default function Discografia() {
  useHead({ title: 'Discografía — Camilo Franco' })
  return (
    <main className="px-5 py-16">
      <h1 className="text-xl md:text-2xl">Discografía</h1>
    </main>
  )
}
