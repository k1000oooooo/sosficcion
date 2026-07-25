// Genera dist/sitemap.xml a partir de las páginas prerenderizadas en dist/
// (todo directorio con index.html es una URL). Corre como último paso del
// build (package.json) — así nunca queda desincronizado de las rutas reales.
import { readdir, writeFile } from 'node:fs/promises'
import { join, relative, dirname } from 'node:path'

const SITE_URL = 'https://noname.ar'
const DIST = 'dist'

const files = await readdir(DIST, { recursive: true })
const urls = files
  .filter((f) => f.endsWith('index.html'))
  .map((f) => dirname(relative(DIST, join(DIST, f))))
  .map((dir) => (dir === '.' ? `${SITE_URL}/` : `${SITE_URL}/${dir.replaceAll('\\', '/')}/`))
  .sort()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`

await writeFile(join(DIST, 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} URLs`)
