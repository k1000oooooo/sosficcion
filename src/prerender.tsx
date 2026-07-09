// Entrada de prerender (vite-prerender-plugin): en build genera HTML
// estático por ruta — título y meta por página sin servidor.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createHead, UnheadProvider } from '@unhead/react/server'
import App from './App'

const routes: Record<string, { title: string; description: string }> = {
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
  '/contacto': {
    title: 'Contacto — Camilo Franco',
    description: 'Contacto y redes de Camilo Franco.',
  },
}

// El scheduler de React (react-dom/server, build browser) crea un
// MessageChannel a nivel de módulo; su MessagePort ref'd deja el proceso
// del build vivo para siempre. unref() lo libera una vez renderizado.
function unrefSchedulerPorts() {
  const proc = process as unknown as {
    _getActiveHandles?: () => Array<{ constructor?: { name?: string }; unref?: () => void }>
  }
  for (const h of proc._getActiveHandles?.() ?? []) {
    if (h?.constructor?.name === 'MessagePort') h.unref?.()
  }
}

export async function prerender(data: { url: string }) {
  const head = createHead()
  const html = renderToString(
    <UnheadProvider value={head}>
      <StaticRouter location={data.url}>
        <App />
      </StaticRouter>
    </UnheadProvider>,
  )
  unrefSchedulerPorts()

  const path = data.url.replace(/\/$/, '') || '/'
  const meta = routes[path] ?? routes['/']

  return {
    html,
    links: new Set(Object.keys(routes)),
    head: {
      lang: 'es',
      title: meta.title,
      elements: new Set([
        { type: 'meta', props: { name: 'description', content: meta.description } },
        { type: 'meta', props: { property: 'og:title', content: meta.title } },
        { type: 'meta', props: { property: 'og:description', content: meta.description } },
        { type: 'meta', props: { property: 'og:type', content: 'website' } },
      ]),
    },
  }
}
