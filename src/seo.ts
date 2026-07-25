// SEO — única fuente de verdad de metadata por ruta: títulos, descriptions,
// canonicals y datos estructurados (JSON-LD). Lo consume el prerender
// (head estático por página) y scripts/sitemap.mjs (vía dist/).
import { books } from './content/books'
import { releases } from './content/releases'
import { socials } from './content/socials'
import { videos } from './content/videos'

export const SITE_URL = 'https://noname.ar'
export const SITE_NAME = 'Camilo Franco'
export const OG_IMAGE = `${SITE_URL}/images/og.png`

export type RouteMeta = { title: string; description: string }

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Camilo Franco',
    description:
      'Camilo Franco — canciones ambient, combinadas con ritmo minimal y tecno. Discografía, radio shows y videos.',
  },
  '/resonance-extra': {
    title: 'Resonance Extra — Camilo Franco',
    description:
      'Radio Cascabel: programa de Camilo Franco en Resonance Extra (Londres), 2019.',
  },
  '/creativa-radio': {
    title: 'Creativa Radio — Camilo Franco',
    description: 'Ciclo de mixtapes para Creativa Radio (2017/2018).',
  },
  '/discografia': {
    title: 'Discografía — Camilo Franco',
    description:
      'Discos de Camilo Franco en Pakapi Records, Opalo Records, Solo Le Pido A Dior y Sulky Netlabel.',
  },
  '/videos': {
    title: 'Videos — Camilo Franco',
    description: 'Videos de Camilo Franco en Vimeo.',
  },
  '/books': {
    title: 'Books — Camilo Franco',
    description: 'Libros virtuales de Camilo Franco.',
  },
  '/contacto': {
    title: 'Contacto — Camilo Franco',
    description: 'Contacto y redes de Camilo Franco.',
  },
}

// Un route por libro — derivado del content file, sin hardcodear IDs
// (spec Books §Extensibilidad)
for (const book of books) {
  routeMeta[`/books/${book.id}`] = {
    title: `${book.title} — Camilo Franco`,
    description: book.description,
  }
}

// GitHub Pages redirige /ruta → /ruta/ (301) para directorios, así que la
// URL final —la que va en canonical, og:url y sitemap— lleva barra.
export function canonicalFor(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`
}

// --- JSON-LD -----------------------------------------------------------

const artist = {
  '@type': 'MusicGroup',
  '@id': `${SITE_URL}/#artist`,
  name: SITE_NAME,
  url: SITE_URL,
  genre: ['Ambient', 'Minimal', 'Techno'],
  sameAs: socials.map((s) => s.url),
}

const videoUrl = (v: (typeof videos)[number]) =>
  v.vimeoId
    ? `https://vimeo.com/${v.vimeoId}`
    : `https://www.youtube.com/watch?v=${v.youtubeId}`

/** Bloques JSON-LD para una ruta; vacío si la página no aporta entidades. */
export function jsonLdFor(path: string): object[] {
  if (path === '/') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'es',
      },
      { '@context': 'https://schema.org', ...artist },
    ]
  }
  if (path === '/discografia') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: routeMeta[path].title,
        itemListElement: releases.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'MusicAlbum',
            name: r.title,
            url: r.url,
            image: `${SITE_URL}/${r.cover}`,
            byArtist: artist,
            recordLabel: { '@type': 'Organization', name: r.label },
            ...(r.year && { datePublished: String(r.year) }),
          },
        })),
      },
    ]
  }
  if (path === '/videos') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: routeMeta[path].title,
        itemListElement: videos.map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: v.title,
          url: videoUrl(v),
        })),
      },
    ]
  }
  const book = books.find((b) => path === `/books/${b.id}`)
  if (book) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.title,
        url: canonicalFor(path),
        inLanguage: 'es',
        author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
        numberOfPages: book.pages.length,
      },
    ]
  }
  return []
}
