// Ciclo de mixtapes para Creativa Radio (2016–2018).
// Fuente: uploads de Mixcloud (mixcloud.com/CamiloDFranco/uploads/), fechas
// del created_time de cada cloudcast (o del título cuando la incluye).
// Quedan fuera los uploads ajenos al ciclo (Radio Cascabel, Festival
// Microsets, Mixtape Ficción 2015, Tape #1, live Factory Radio).
export type Mix = {
  /** Slug bajo mixcloud.com/CamiloDFranco/ */
  slug: string
  title: string
  /** ISO yyyy-mm-dd */
  date: string
  genre?: string
}

export const mixes: Mix[] = [
  { slug: 'set-radio-creativa-17-2018', title: 'Set Radio Creativa #17', date: '2018-07-02' },
  { slug: 'set-radio-creativa-16-2018', title: 'Set Radio Creativa #16', date: '2018-06-18' },
  { slug: 'set-radio-creativa-15-2018-phonk', title: 'Set Radio Creativa #15', date: '2018-06-04', genre: 'Phonk' },
  { slug: 'set-radio-creativa-14-2018', title: 'Set Radio Creativa #14', date: '2018-05-28', genre: 'Vaporwave' },
  { slug: 'set-radio-creativa-13-2018', title: 'Set Radio Creativa #13', date: '2018-05-20', genre: 'Sonido Atmosférico' },
  { slug: 'set-radio-creativa-12-2018', title: 'Set Radio Creativa #12', date: '2018-05-12' },
  { slug: 'set-radio-creativa-11-2018', title: 'Set Radio Creativa #11', date: '2018-04-29' },
  { slug: 'set-radio-creativa-10-pakapi-rec', title: 'Set Radio Creativa #10', date: '2018-04-22', genre: 'Pakapi Rec' },
  { slug: 'set-radio-creativa-9-2018', title: 'Set Radio Creativa #9', date: '2018-04-15' },
  { slug: 'set-radio-creativa-8-2018', title: 'Set Radio Creativa #8', date: '2018-04-09' },
  { slug: 'set-radio-creativa-7-2018', title: 'Set Radio Creativa #7', date: '2018-04-02' },
  { slug: 'set-radio-creativa-6-2018', title: 'Set Radio Creativa #6', date: '2018-03-25' },
  { slug: 'set-radio-creativa-5-2018', title: 'Set Radio Creativa #5', date: '2018-03-11' },
  { slug: 'set-radio-creativa-4-2018', title: 'Set Radio Creativa #4', date: '2018-02-26' },
  { slug: 'set-radio-creativa-3-2018', title: 'Set Radio Creativa #3', date: '2018-02-18' },
  { slug: 'set-creativa-radio-2-10022018', title: 'Set Creativa Radio #2', date: '2018-02-10' },
  { slug: 'radio-creativa-1-2018', title: 'Radio Creativa #1', date: '2018-01-07' },
  { slug: 'radio-set-32', title: 'Radio set #32', date: '2017-10-30' },
  { slug: 'radio-set-31', title: 'Radio set #31', date: '2017-10-12' },
  { slug: 'radio-set-30', title: 'Radio set #30', date: '2017-10-05' },
  { slug: 'radio-set-28', title: 'Radio set #28', date: '2017-09-25' },
  { slug: 'radio-set-27', title: 'Radio set #27', date: '2017-09-20' },
  { slug: 'radio-set-25', title: 'Radio set #25', date: '2017-09-11' },
  { slug: 'radio-set-24', title: 'Radio set #24', date: '2017-09-04' },
  { slug: 'radio-set-22', title: 'Radio set #22', date: '2017-08-31' },
  { slug: 'radio-set-21', title: 'Radio set #21', date: '2017-07-17' },
  { slug: 'radio-set-20', title: 'Radio set #20', date: '2017-06-20' },
  { slug: 'radio-set-17', title: 'Radio set #17', date: '2017-04-25' },
  { slug: 'radio-set-16', title: 'Radio set #16', date: '2017-04-10' },
  { slug: 'radio-set-15', title: 'Radio set #15', date: '2017-04-03' },
  { slug: 'radio-set-14', title: 'Radio set #14', date: '2017-03-27' },
  { slug: 'radio-set-13', title: 'Radio set #13', date: '2017-03-20' },
  { slug: 'radio-set-12', title: 'Radio set #12', date: '2017-03-16' },
  { slug: 'radio-set-11', title: 'Radio set #11', date: '2017-03-13' },
  { slug: 'radio-set-10', title: 'Radio set #10', date: '2017-03-06' },
  { slug: 'radio-set-9', title: 'Radio set #9', date: '2017-02-20' },
  { slug: 'radio-set-8', title: 'Radio set #8', date: '2017-02-16' },
  { slug: 'radio-set-7', title: 'Radio set #7', date: '2017-02-12' },
  { slug: 'radio-set-6', title: 'Radio set #6', date: '2017-02-02' },
  { slug: 'radio-set-5', title: 'Radio set #5', date: '2017-01-22' },
  { slug: 'radio-set-4', title: 'Radio set #4', date: '2017-01-15' },
  { slug: 'radio-set-3', title: 'Radio set #3', date: '2017-01-14' },
  { slug: 'mixtape-2-creativaradiocomar', title: 'Mixtape #2', date: '2016-12-19' },
  { slug: 'mixtape-1-creativaradiocomar', title: 'Mixtape #1', date: '2016-12-13' },
]
