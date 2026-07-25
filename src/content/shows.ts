// Radio Cascabel / noName Music From LATAM — programas con participación de
// Camilo Franco en Resonance Extra (Londres).
// Fuente: reposts de Mixcloud (mixcloud.com/CamiloDFranco/reposts/), cuentas
// resonanceextra y RadioCascabel. Fechas tomadas del título del cloudcast
// cuando la incluye; si no, de su publishDate.
export type Show = {
  title: string
  /** ISO yyyy-mm-dd */
  date: string
  /** Cloudcast en Mixcloud (fuente primaria) */
  mixcloud?: { owner: string; slug: string }
  /** SoundCloud track ID — solo para sets sin subida en Mixcloud */
  trackId?: number
}

export const shows: Show[] = [
  { title: 'noName Music From LATAM #6', date: '2021-04-21', mixcloud: { owner: 'resonanceextra', slug: 'noname-music-from-latam-6-wednesday-21st-april-2021' } },
  { title: 'noName Music From LATAM #5', date: '2021-04-07', mixcloud: { owner: 'resonanceextra', slug: 'noname-music-from-latam-5-wednesday-7th-april-2021' } },
  { title: 'noName Music From LATAM #4', date: '2021-03-17', mixcloud: { owner: 'resonanceextra', slug: 'noname-music-from-latam-4-wednesday-17th-march-2021' } },
  { title: 'noName Music From LATAM #3', date: '2021-03-03', mixcloud: { owner: 'resonanceextra', slug: 'noname-music-from-latam-3-wednesday-3rd-march-2021' } },
  { title: 'noName Music From LATAM #2', date: '2021-02-17', mixcloud: { owner: 'resonanceextra', slug: 'noname-music-from-latam-2-wednesday-17th-february-2021' } },
  { title: 'noName Music From LATAM #1', date: '2021-02-03', mixcloud: { owner: 'resonanceextra', slug: 'noname-music-from-latam-1-wednesday-3rd-february-2021' } },
  { title: 'Diego Scagni Mix', date: '2020-11-16', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-diego-scagni-mix-wednesday-16th-november-2020' } },
  { title: 'Estúdio Escuta Mix', date: '2020-11-04', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-estúdio-escuta-mix-wednesday-4th-november-2020' } },
  { title: 'Antonio Sobral & Verónica Cerrotta Mix', date: '2020-09-09', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-antonio-sobral-verónica-cerrotta-mix-wednesday-9th-september-2020' } },
  { title: 'F.A.N.G.O. Mix', date: '2020-09-02', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-fango-mix-wednesday-2nd-september-2020' } },
  { title: 'Gustavo Obligado Mix', date: '2020-08-26', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-gustavo-obligado-mix-wednesday-26th-august-2020' } },
  { title: 'Andrés Asia Mix', date: '2020-08-19', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-andrés-asia-mix-wednesday-19th-august-2020' } },
  { title: 'Vic Bang Mix', date: '2020-08-12', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-vic-bang-mix-wednesday-12th-august-2020' } },
  { title: 'Yoto Mixtape', date: '2019-12-04', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-yoto-mixtape-wednesday-the-4th-of-december-2019' } },
  { title: 'Bungalovv Mixtape', date: '2019-11-27', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-bungalovv-mixtape-wednesday-the-27th-of-november-2019' } },
  { title: 'Camilo Franco Mixtape', date: '2019-11-20', trackId: 715929433 },
  { title: 'Estupendo Mixtape', date: '2019-11-13', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-estupendo-mixtape-wednesday-the-13th-of-november-2019' } },
  { title: 'Mario Davidovsky', date: '2019-11-06', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-mario-davidovsky-wednesday-the-6th-of-november-2019' } },
  { title: 'Mateo Amaral', date: '2019-10-30', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-mateo-amaral-wednesday-the-30th-of-october-2019' } },
  { title: 'Reynols Mixtape', date: '2019-10-23', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-reynols-mixtape-wednesday-the-23rd-of-october-2019' } },
  { title: 'Morita Vargas Mixtape', date: '2019-10-16', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-morita-vargas-mixtape-wednesday-the-16th-of-october-2019' } },
  { title: 'Juan Roman Diosque Mixtape', date: '2019-10-02', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-juan-roman-diosque-mixtape-wednesday-the-2nd-of-october-2019' } },
  { title: 'Camilo Franco', date: '2018-11-21', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-camilo-franco-wednesday-the-21st-of-november-2018' } },
  { title: 'Bolivia Mixtape', date: '2018-11-14', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-bolivia-mixtape-14th-november-2018' } },
  { title: 'Juan Bautista Dominguez', date: '2018-05-31', mixcloud: { owner: 'CamiloDFranco', slug: 'radio-cascabel-show-10xx-juan-bautsta-dominguez' } },
  { title: 'Daniel Melero', date: '2018-05-09', mixcloud: { owner: 'resonanceextra', slug: 'daniel-melero-radio-cascabel-show-10xx' } },
  { title: 'Minicomponente', date: '2018-05-02', mixcloud: { owner: 'resonanceextra', slug: 'minicomponente-radio-cascabel-show-10xx' } },
  { title: 'Verónica Cerrotta', date: '2018-04-25', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-veronica-cerrotta-wednesday-25th-april-2018' } },
  { title: 'Pablo Reche', date: '2018-04-18', mixcloud: { owner: 'resonanceextra', slug: 'pablo-reche-radio-cascabel-show-10xx' } },
  { title: 'Fungi', date: '2018-04-11', mixcloud: { owner: 'resonanceextra', slug: 'fungi-radio-cascabel-show-10xx' } },
  { title: 'New Weird South America', date: '2018-03-28', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-10xx-new-weird-south-america-28th-of-march-2018' } },
  { title: 'Catriel Nievas', date: '2018-03-07', mixcloud: { owner: 'resonanceextra', slug: 'catriel-nievas-radio-cascabel-show-10xx' } },
  { title: 'Gustavo Obligado', date: '2018-02-28', mixcloud: { owner: 'resonanceextra', slug: 'gustavo-obligado-radio-cascabel-show-10xx' } },
  { title: 'Ruido Argentino', date: '2018-02-21', mixcloud: { owner: 'resonanceextra', slug: 'ruido-argentino-radio-cascabel-show-10xx' } },
  { title: 'Ariel Flores', date: '2018-02-14', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-10xx-ariel-flores-14th-of-february-2018' } },
  { title: 'El Asesino del Romance', date: '2018-02-07', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-1040-el-asesino-del-romance-wednesday-7th-february-2018' } },
  { title: 'Juan Cruz Iglesias', date: '2018-01-31', mixcloud: { owner: 'resonanceextra', slug: 'cascabel-resonance-2017-juan-c' } },
  { title: 'Diego Scagni', date: '2018-01-10', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-show' } },
  { title: 'Sulky', date: '2017-12-13', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-show-1034-sulky-13th-dicember-2017-20171213' } },
  { title: 'Bloque del Sur & Zigo', date: '2017-12-06', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-show-10xx-pakapi-6th-dicember-2017-20170612' } },
  { title: 'Joa Joys', date: '2017-11-08', mixcloud: { owner: 'resonanceextra', slug: 'radio-cascabel-show-1031-joa-joys-8th-november-2017-20171108' } },
  { title: 'Astrosuka & Bungalovv', date: '2017-10-26', mixcloud: { owner: 'RadioCascabel', slug: 'cascabel-radio-handpicks-astrosuka-bungalovv-from-trrueno-for-resonance-extra-london' } },
  { title: 'Nicolás Cordone', date: '2017-10-15', mixcloud: { owner: 'RadioCascabel', slug: 'cascabel-radio-handpicks-nicolas-cordone-for-resonance-extra-london' } },
  { title: 'Alan Courtis', date: '2017-10-11', mixcloud: { owner: 'RadioCascabel', slug: 'cascabel-radio-handpicks-alan-courtis-at-resonance-extra-london' } },
  { title: 'Whisky', date: '2017-09-29', mixcloud: { owner: 'RadioCascabel', slug: 'cascabel-radio-handpicks-whisky-at-resonance-extra-london' } },
  { title: 'NWNLSS', date: '2017-09-29', mixcloud: { owner: 'RadioCascabel', slug: 'cascabel-radio-handpicks-nwnlss-at-resonance-extra-london' } },
  { title: 'Pakapi', date: '2017-09-07', mixcloud: { owner: 'RadioCascabel', slug: 'cascabel-handpicks-pakapi-by-camilo-franco-at-resonance-extra-london' } },
  { title: 'Aldo Benitez', date: '2017-07-05', mixcloud: { owner: 'RadioCascabel', slug: 'radio-cascabel-handpicked-aldo-benitez-at-resonance-extra-london' } },
]
