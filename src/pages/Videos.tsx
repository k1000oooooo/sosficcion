import { useHead } from '@unhead/react'

export default function Videos() {
  useHead({ title: 'Videos — Camilo Franco' })
  return (
    <main className="px-5 py-16">
      <h1 className="text-xl md:text-2xl">Videos</h1>
    </main>
  )
}
