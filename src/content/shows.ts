// Radio Cascabel — programa de Camilo Franco en Resonance Extra (Londres).
// Títulos y fechas verificados vía oEmbed (baseline/urls.md).
export type Show = {
  /** SoundCloud track ID para el widget player */
  trackId: number
  title: string
  /** ISO yyyy-mm-dd */
  date: string
}

export const shows: Show[] = [
  { trackId: 715929433, title: 'Camilo Franco Mixtape', date: '2019-11-20' },
  { trackId: 712270849, title: 'Estupendo Mixtape', date: '2019-11-13' },
  { trackId: 708776188, title: 'Mario Davidovsky', date: '2019-11-06' },
  { trackId: 705411640, title: 'Mateo Amaral', date: '2019-10-30' },
  { trackId: 700605280, title: 'Reynols Mixtape', date: '2019-10-23' },
  { trackId: 697038692, title: 'Morita Vargas Mixtape', date: '2019-10-16' },
  { trackId: 690020782, title: 'Juan Roman Diosque Mixtape', date: '2019-10-02' },
]
