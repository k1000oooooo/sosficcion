// Discografía — covers del home legacy + players de Bandcamp, unificados.
export type Release = {
  id: string
  title: string
  label: string
  year?: number
  /** Código de catálogo si existe (se muestra en mono, estilo editorial) */
  catalog?: string
  /** Ruta bajo public/ */
  cover: string
  /** Album ID para el EmbeddedPlayer de Bandcamp */
  bandcampAlbumId?: string
  /** Página del disco (Bandcamp / SoundCloud / YouTube) */
  url: string
}

export const releases: Release[] = [
  {
    id: 'se-escucha-un-movimiento',
    title: 'Se escucha un movimiento',
    label: 'Pakapi Records',
    cover: 'images/seescuchaunmovimiento.webp',
    bandcampAlbumId: '2856260868',
    url: 'https://pakapirecords.bandcamp.com/album/camilo-franco-se-escucha-un-movimiento',
  },
  {
    id: 'ahora-casi-nunca',
    title: 'Ahora casi nunca estoy en la selva',
    label: 'Opalo Records',
    cover: 'images/ahoracasinunca.webp',
    bandcampAlbumId: '2420565447',
    url: 'https://opalorecords.bandcamp.com/album/ahora-casi-nunca-estoy-en-la-selva',
  },
  {
    id: 'minutos-antes-de',
    title: 'Minutos Antes De — EP',
    label: 'Solo Le Pido A Dior',
    catalog: 'SPD-06',
    cover: 'images/minutosantesde.webp',
    bandcampAlbumId: '4092168665',
    url: 'https://sololepidoadior.bandcamp.com/album/spd-06-minutos-antes-de-ep',
  },
  {
    id: 'play',
    title: 'Play',
    label: 'Sulky Netlabel',
    year: 2013,
    catalog: 'SNL-001',
    cover: 'images/play.webp',
    bandcampAlbumId: '298613419',
    url: 'https://sulkynetlabel.bandcamp.com/album/snl-001-camilo-franco-play-sulky-netlabel-2013',
  },
  {
    id: 'tropical',
    title: 'Tropical — EP',
    label: 'Tropicales CJ',
    cover: 'images/tropical.webp',
    url: 'https://soundcloud.com/tropicalescj/sets/tropical-e-p',
  },
  {
    id: 'la-lluvia',
    title: 'La lluvia',
    label: 'YouTube',
    cover: 'images/lalluvia.webp',
    url: 'https://www.youtube.com/watch?v=32duyCSlQQk',
  },
]
