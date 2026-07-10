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
    title: 'Paisajes',
    description: 'Una colección de poemas visuales.',
    pages: [
      {
        id: 'paisajes-01',
        content: `las cenizas
con sus manos
forman anillos de barro,

                  su cuerpo
húmedo,`,
      },
      {
        id: 'paisajes-02',
        content: `Un paisaje
        cualquier cosa irrelevante


                                    Aorden


me devuelve

                                            al
lugar donde estoy`,
      },
      {
        id: 'paisajes-03',
        content: `El sol

atenuado por las nubes

de una mañana húmeda.`,
      },
      {
        id: 'paisajes-04',
        content: `desorden
                   recurrente

cada cosa
                   va
dejando
       su    camino
            marcas
      como         recuerdos
            recurrentes
                  como recuerdos
      marcas
            su         camino
      va          dejando
                         cada cosa
            recurrente
                  desorden`,
      },
      {
        id: 'paisajes-05',
        content: `Un diálogo
que nunca pasó
con respuestas
que nunca nos dan,


                  todo el día
mientras busco
alguna excusa
para levantarme.`,
      },
      {
        id: 'paisajes-06',
        content: `el frío
el viento helado que silva,
el piso que cruje
y se quiebra

la mañana
todo oscuro,
               aún.`,
      },
      {
        id: 'paisajes-07',
        content: `el día
      más cálido de otoño
el sol anaranjado
   cae sobre
los edificios dormidos`,
      },
    ],
  },
]
