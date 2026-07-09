// Iframes responsivos por proveedor. Siempre width 100% — los anchos fijos
// del sitio legacy desbordaban a 375px. Colores alineados al theme.
const ACCENT = 'c7401f'
const SURFACE = '141412'

export function SoundcloudEmbed({ trackId, title }: { trackId: number; title: string }) {
  const src = `https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F${trackId}&color=%23${ACCENT}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_teaser=false`
  return <iframe src={src} title={title} className="h-[166px] w-full border-0" allow="autoplay" loading="lazy" />
}

export function MixcloudEmbed({ slug, title }: { slug: string; title: string }) {
  const src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=%2FCamiloDFranco%2F${slug}%2F`
  return <iframe src={src} title={title} className="h-[120px] w-full border-0" allow="autoplay" loading="lazy" />
}

export function VimeoEmbed({ vimeoId, title }: { vimeoId: string; title: string }) {
  const src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
  return (
    <iframe
      src={src}
      title={title}
      className="aspect-video w-full border-0"
      allow="autoplay; fullscreen"
      allowFullScreen
      loading="lazy"
    />
  )
}

export function BandcampEmbed({ albumId, title }: { albumId: string; title: string }) {
  const src = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=${SURFACE}/linkcol=${ACCENT}/tracklist=false/transparent=true/`
  return <iframe src={src} title={title} className="h-[470px] w-full border-0" loading="lazy" />
}
