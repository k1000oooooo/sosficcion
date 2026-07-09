import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'
import TrackRow from '../components/TrackRow'
import { SoundcloudEmbed } from '../components/embeds'
import { shows } from '../content/shows'

function formatDate(iso: string) {
  return iso.split('-').reverse().join('·')
}

export default function ResonanceExtra() {
  useHead({ title: 'Resonance Extra — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Radio Cascabel · Resonance Extra · 2019" title="Resonance Extra" />
      <p className="mb-10 max-w-[42ch] text-base text-text-dim">
        Radio Cascabel: programa semanal en Resonance Extra (Londres) con
        mixtapes de artistas y música experimental.
      </p>
      <ul className="border-t border-line">
        {shows.map((show, i) => (
          <TrackRow key={show.trackId} index={i + 1} title={show.title} meta={formatDate(show.date)}>
            <SoundcloudEmbed trackId={show.trackId} title={show.title} />
          </TrackRow>
        ))}
      </ul>
    </main>
  )
}
