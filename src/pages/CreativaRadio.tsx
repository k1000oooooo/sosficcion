import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'

export default function CreativaRadio() {
  useHead({ title: 'Creativa Radio — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Mixtapes · 2017/2018" title="Creativa Radio" />
      <p className="max-w-[42ch] text-base text-text-dim">
        Ciclo de mixtapes con música emergente y tendencias musicales.
      </p>
    </main>
  )
}
