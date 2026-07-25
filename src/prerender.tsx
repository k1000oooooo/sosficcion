// Entrada de prerender (vite-prerender-plugin): en build genera HTML
// estático por ruta — título y meta por página sin servidor.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createHead, UnheadProvider } from '@unhead/react/server'
import App from './App'
import { canonicalFor, jsonLdFor, OG_IMAGE, routeMeta, SITE_NAME } from './seo'

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
  // Mismo basename que el cliente para que los href prerenderizados
  // coincidan en la hidratación (BASE_URL es '/' o '/sosficcion/')
  const base = import.meta.env.BASE_URL
  const html = renderToString(
    <UnheadProvider value={head}>
      <StaticRouter basename={base} location={base.replace(/\/$/, '') + data.url}>
        <App />
      </StaticRouter>
    </UnheadProvider>,
  )
  unrefSchedulerPorts()

  const path = data.url.replace(/\/$/, '') || '/'
  const meta = routeMeta[path] ?? routeMeta['/']
  const canonical = canonicalFor(path)

  // JSON-LD por página — < evita cerrar el <script> si algún texto
  // llegara a contener "</script>"
  const jsonLdScripts = jsonLdFor(path).map((data) => ({
    type: 'script',
    props: {
      type: 'application/ld+json',
      children: JSON.stringify(data).replace(/</g, '\\u003c'),
    },
  }))

  return {
    html,
    links: new Set(Object.keys(routeMeta)),
    head: {
      lang: 'es',
      title: meta.title,
      elements: new Set([
        { type: 'meta', props: { name: 'description', content: meta.description } },
        { type: 'link', props: { rel: 'canonical', href: canonical } },
        { type: 'meta', props: { property: 'og:title', content: meta.title } },
        { type: 'meta', props: { property: 'og:description', content: meta.description } },
        { type: 'meta', props: { property: 'og:type', content: 'website' } },
        { type: 'meta', props: { property: 'og:url', content: canonical } },
        { type: 'meta', props: { property: 'og:site_name', content: SITE_NAME } },
        { type: 'meta', props: { property: 'og:locale', content: 'es_AR' } },
        { type: 'meta', props: { property: 'og:image', content: OG_IMAGE } },
        { type: 'meta', props: { property: 'og:image:width', content: '1200' } },
        { type: 'meta', props: { property: 'og:image:height', content: '630' } },
        { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
        { type: 'meta', props: { name: 'twitter:title', content: meta.title } },
        { type: 'meta', props: { name: 'twitter:description', content: meta.description } },
        { type: 'meta', props: { name: 'twitter:image', content: OG_IMAGE } },
        ...jsonLdScripts,
      ]),
    },
  }
}
