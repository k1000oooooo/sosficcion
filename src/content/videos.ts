// Videos — Vimeo y YouTube, títulos tomados de los captions del sitio legacy.
// Cada video tiene vimeoId o youtubeId según el proveedor.
export type Video = {
  title: string
  author: string
  vimeoId?: string
  youtubeId?: string
}

export const videos: Video[] = [
  { vimeoId: '141992451', title: 'Tropical — Chinches', author: 'Camilo Franco' },
  { vimeoId: '119048768', title: 'DE', author: 'Camilo Franco' },
  { vimeoId: '119042348', title: 'Minutos', author: 'Camilo Franco' },
  { vimeoId: '81347278', title: 'Estación Primavera #12', author: 'Sulky Netlabel' },
  { youtubeId: 'Ie4Utf-PSK4', title: 'Algún día en concreto', author: 'Camilo Franco' },
  {
    youtubeId: '93bHKj96BEM',
    title: 'El puente escondido',
    author: 'Corto: Diego Scagni · Música: Camilo Franco',
  },
  { youtubeId: 'WntsGLqpSiM', title: 'Live set @ Factory Radio', author: 'Camilo Franco' },
]
