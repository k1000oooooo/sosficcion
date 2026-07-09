import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'

export default function ResonanceExtra() {
  useHead({ title: 'Resonance Extra — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Radio Cascabel · Resonance Extra · 2019" title="Resonance Extra" />
    </main>
  )
}
