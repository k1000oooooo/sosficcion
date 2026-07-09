import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'

export default function Videos() {
  useHead({ title: 'Videos — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Vimeo" title="Videos" />
    </main>
  )
}
