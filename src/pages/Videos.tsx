import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'
import EmbedFacade from '../components/EmbedFacade'
import { VimeoEmbed, YoutubeEmbed } from '../components/embeds'
import { videos } from '../content/videos'

export default function Videos() {
  useHead({ title: 'Videos — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Vimeo · YouTube" title="Videos" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {videos.map((video) => (
          <EmbedFacade
            key={video.vimeoId ?? video.youtubeId}
            title={video.title}
            meta={video.author}
            aspect="16 / 9"
          >
            {video.vimeoId ? (
              <VimeoEmbed vimeoId={video.vimeoId} title={video.title} />
            ) : (
              <YoutubeEmbed youtubeId={video.youtubeId!} title={video.title} />
            )}
          </EmbedFacade>
        ))}
      </div>
    </main>
  )
}
