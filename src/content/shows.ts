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
  { trackId: 890413753, title: 'Antonio Sobral & Verónica Cerrotta Mix', date: '2020-09-09' },
  { trackId: 886321702, title: 'F.A.N.G.O. Mix', date: '2020-09-02' },
  { trackId: 882420343, title: 'Gustavo Obligado Mix', date: '2020-08-26' },
  { trackId: 878504020, title: 'Andrés Asia Mix', date: '2020-08-19' },
  { trackId: 874578325, title: 'Vic Bang Mix', date: '2020-08-12' },
  { trackId: 722696341, title: 'Yoto Mixtape', date: '2019-12-04' },
  { trackId: 719308867, title: 'Bungalovv Mixtape', date: '2019-11-27' },
  { trackId: 715929433, title: 'Camilo Franco Mixtape', date: '2019-11-20' },
  { trackId: 712270849, title: 'Estupendo Mixtape', date: '2019-11-13' },
  { trackId: 708776188, title: 'Mario Davidovsky', date: '2019-11-06' },
  { trackId: 705411640, title: 'Mateo Amaral', date: '2019-10-30' },
  { trackId: 700605280, title: 'Reynols Mixtape', date: '2019-10-23' },
  { trackId: 697038692, title: 'Morita Vargas Mixtape', date: '2019-10-16' },
  { trackId: 690020782, title: 'Juan Roman Diosque Mixtape', date: '2019-10-02' },
  { trackId: 533461701, title: 'Camilo Franco', date: '2018-11-21' },
  { trackId: 508975188, title: 'Diego Scagni', date: '2018-01-10' },
]
