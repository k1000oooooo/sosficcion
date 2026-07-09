// Ciclo de mixtapes para Creativa Radio (2017/2018).
// Slugs y títulos verificados vía oEmbed (baseline/urls.md).
export type Mix = {
  /** Slug bajo mixcloud.com/CamiloDFranco/ */
  slug: string
  title: string
  genre?: string
}

export const mixes: Mix[] = [
  { slug: 'set-radio-creativa-17-2018', title: 'Set Radio Creativa #17' },
  { slug: 'set-radio-creativa-16-2018', title: 'Set Radio Creativa #16' },
  { slug: 'set-radio-creativa-15-2018-phonk', title: 'Set Radio Creativa #15', genre: 'Phonk' },
  { slug: 'set-radio-creativa-14-2018', title: 'Set Radio Creativa #14', genre: 'Vaporwave' },
  { slug: 'set-radio-creativa-13-2018', title: 'Set Radio Creativa #13', genre: 'Sonido Atmosférico' },
  { slug: 'set-radio-creativa-12-2018', title: 'Set Radio Creativa #12' },
  { slug: 'set-radio-creativa-11-2018', title: 'Set Radio Creativa #11' },
  { slug: 'set-radio-creativa-10-pakapi-rec', title: 'Set Radio Creativa #10', genre: 'Pakapi Rec' },
  { slug: 'set-radio-creativa-9-2018', title: 'Set Radio Creativa #9' },
  { slug: 'set-radio-creativa-8-2018', title: 'Set Radio Creativa #8' },
  { slug: 'set-radio-creativa-7-2018', title: 'Set Radio Creativa #7' },
  { slug: 'set-radio-creativa-6-2018', title: 'Set Radio Creativa #6' },
  { slug: 'set-radio-creativa-5-2018', title: 'Set Radio Creativa #5' },
  { slug: 'set-radio-creativa-4-2018', title: 'Set Radio Creativa #4' },
]
