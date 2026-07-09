import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'
import ReleaseCard from '../components/ReleaseCard'
import { releases } from '../content/releases'

export default function Discografia() {
  useHead({ title: 'Discografía — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Releases" title="Discografía" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} playable />
        ))}
      </div>
    </main>
  )
}
