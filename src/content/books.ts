// Books — libros virtuales. El espaciado interno de cada poema es
// estructural: se preserva tal cual con white-space: pre-wrap en el visor.
export interface BookPage {
  id: string
  content: string
}

export interface Book {
  id: string
  title: string
  description: string
  pages: BookPage[]
}

export const books: Book[] = [
  {
    id: 'paisajes',
    title: 'Atenuado por las nubes',
    description: 'Autor: Camilo Franco',
    pages: [
      {
        id: 'p1',
        content: `un ruido

cortante  y frío

se escapa.


en el aire,

se escucha   un  movimiento

suave.`,
      },
      {
        id: 'p2',
        content: `Corre  con  los dedos

una  moneda   en  la mesa

ya se  ve el sol
y el agua  sigue cayendo.`,
      },
      {
        id: 'p3',
        content: `miro cuando   mirás

la piel sobre tu cuerpo,

el charco  lleno de barro
ensucia  tus pies de  negro`,
      },
      {
        id: 'p4',
        content: `las cenizas

con  sus manos

forman  anillos de  barro,




              su cuerpo

húmedo,`,
      },
      {
        id: 'p5',
        content: `Solo  de blanco

se distingue  de las sombras

del contorno,
gotas,

como   algo de  un sueño,

como   algo,

como   estar parado  en  ellas.`,
      },
      {
        id: 'p6',
        content: `Sábanas   de  humo

sobre  un chorro  de agua

suspendidas
desaparecen

despacio.`,
      },
      {
        id: 'p7',
        content: `Un  paisaje

     cualquier  cosa  irrelevante




                         Aorden



me  devuelve



                              al

lugar donde   estoy`,
      },
      {
        id: 'p8',
        content: `El sol



atenuado   por las nubes


de una  mañana    húmeda.`,
      },
      {
        id: 'p9',
        content: `desorden

                    recurrente


cada  cosa

               va

dejando

     su   camino

          marcas

     como           recuerdos

          recurrentes

               como   recuerdos

     marcas

          su        camino

     va        dejando
                    cada  cosa

          recurrente

               desorden`,
      },
      {
        id: 'p10',
        content: `cómodos    y aburridos

con  la voz muy  baja

le mostraba   una ilusión.`,
      },
      {
        id: 'p11',
        content: `Un  diálogo

que  nunca  pasó

con  respuestas
que  nunca  nos  dan,




              todo  el día

mientras  busco

alguna  excusa

para  levantarme.`,
      },
      {
        id: 'p12',
        content: `Está  sentado

disperso

aspirando   silencio`,
      },
      {
        id: 'p13',
        content: `Un  fondo  agotado

una  lluvia de contenido

hacen  todo  muy  parecido


una  melodía

que  casi estaba  perdida

mordiéndose    arrepentida.`,
      },
      {
        id: 'p14',
        content: `mira de  reojo

ofendida

no entiendo   cómo
con  pasión

se puede   no hacer  nada`,
      },
      {
        id: 'p15',
        content: `el frío

el viento helado  que  silva,

el piso que  cruje
y se quiebra



la mañana

todo oscuro,

          aún.`,
      },
      {
        id: 'p16',
        content: `el día

   más   cálido de otoño

el sol anaranjado
  cae  sobre

los edificios dormidos`,
      },
      {
        id: 'p17',
        content: `sentado

respirando

esperando
arrugado   por las nubes

alejado

el cielo intenso`,
      },
      {
        id: 'p18',
        content: `imagina

un viaje largo en  el mar

describe  las formas
y los sonidos

despejados`,
      },
      {
        id: 'p19',
        content: `muchos   ruidos

variados

entonados
o desentonados`,
      },
      {
        id: 'p20',
        content: `luces oscuras

opacas

el brillo del frío
del invierno`,
      },
      {
        id: 'p21',
        content: `Como   cuando

se cierra sola

la canilla
del agua  caliente`,
      },
      {
        id: 'p22',
        content: `me  enredo

entre las cosas


todavía  sigue siendo  lunes

y el cielo

no deja  de ser fresco`,
      },
      {
        id: 'p23',
        content: `ruido en  la calle

y un día muy   húmedo

y sin luz


el cielo gris

y pesado

mezclado

con  el calor`,
      },
      {
        id: 'p24',
        content: `el silencio

de cuando   se  corta la luz


el sonido

que  se produce

cuando   vuelve`,
      },
    ],
  },
]
