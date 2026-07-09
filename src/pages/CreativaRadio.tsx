import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'
import TrackRow from '../components/TrackRow'
import { MixcloudEmbed } from '../components/embeds'
import { mixes } from '../content/mixes'

export default function CreativaRadio() {
  useHead({ title: 'Creativa Radio — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Mixtapes · 2017/2018" title="Creativa Radio" />
      <p className="mb-10 max-w-[42ch] text-base text-text-dim">
        Ciclo de mixtapes con música emergente y tendencias musicales.
      </p>
      <ul className="border-t border-line">
        {mixes.map((mix, i) => (
          <TrackRow key={mix.slug} index={i + 1} title={mix.title} meta={mix.genre}>
            <MixcloudEmbed slug={mix.slug} title={mix.title} />
          </TrackRow>
        ))}
      </ul>
    </main>
  )
}
