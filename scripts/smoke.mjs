// Smoke test del sitio (spec: roadmap paso 11). Sirve dist/ con un mini
// server que imita la resolución de GitHub Pages (archivo → .html →
// /index.html → 404.html) — vite preview redirige mal bajo base path.
// Requiere Chrome (puppeteer-core: sin descarga; preinstalado en los
// runners ubuntu de GitHub Actions). Respeta BASE_PATH igual que el build.
//   npm run build && npm run smoke
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import puppeteer from 'puppeteer-core'

const PORT = 4321
const BASE = process.env.BASE_PATH || '/'
const ORIGIN = `http://localhost:${PORT}`
const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome')

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
}

// Server solo para tests — sin hardening de paths
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, ORIGIN).pathname)
  if (BASE !== '/') {
    if (!(p + '/').startsWith(BASE)) {
      res.writeHead(404)
      return res.end()
    }
    p = p.slice(BASE.length - 1)
  }
  if (p.endsWith('/')) p += 'index.html'
  for (const c of [p, `${p}.html`, `${p}/index.html`, '/404.html']) {
    try {
      const data = await readFile(join('dist', c))
      res.writeHead(c === '/404.html' && p !== '/404.html' ? 404 : 200, {
        'content-type': MIME[extname(c)] ?? 'application/octet-stream',
      })
      return res.end(data)
    } catch {
      /* siguiente candidato */
    }
  }
  res.writeHead(404)
  res.end()
})
await new Promise((r) => server.listen(PORT, r))

const titles = {
  '': 'Camilo Franco',
  'resonance-extra': 'Resonance Extra — Camilo Franco',
  'creativa-radio': 'Creativa Radio — Camilo Franco',
  discografia: 'Discografía — Camilo Franco',
  videos: 'Videos — Camilo Franco',
  books: 'Books — Camilo Franco',
  'books/paisajes': 'Atenuado por las nubes — Camilo Franco',
  contacto: 'Contacto — Camilo Franco',
}

let failures = 0
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'ok ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
  if (!ok) failures++
}

// --- HTML prerenderizado: título por ruta ---
for (const [route, title] of Object.entries(titles)) {
  const res = await fetch(`${ORIGIN}${BASE}${route}`)
  const html = await res.text()
  const found = html.match(/<title>([^<]*)<\/title>/)?.[1]
  check(`prerender ${BASE}${route}`, res.ok && found === title, `title="${found}"`)
}

// --- browser ---
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 812 })

const goto = (route) => page.goto(`${ORIGIN}${BASE}${route}`, { waitUntil: 'networkidle0' })
const count = (sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel)
const waitFor = async (sel, ms = 10000) => {
  try {
    await page.waitForSelector(sel, { timeout: ms })
    return true
  } catch {
    return false
  }
}

// Sin overflow horizontal ni iframes eager en ninguna ruta (patrón facade)
for (const route of Object.keys(titles)) {
  await goto(route)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  check(`overflow 375px ${BASE}${route}`, overflow === 0, `${overflow}px`)
  const eager = await count('iframe')
  check(`0 iframes eager ${BASE}${route}`, eager === 0, `${eager}`)
}

// Redirects legacy: /audios.html (sin stub en dist) → 404.html → JS → ruta nueva
await goto('audios.html')
await new Promise((r) => setTimeout(r, 800))
const redirected = await page.evaluate(() => location.pathname)
check('redirect legacy audios.html', redirected === `${BASE}resonance-extra`, redirected)

// Resonance Extra: 7 filas, expandir monta SoundCloud
await goto('resonance-extra')
check('resonance: 7 filas', (await count('main ul li')) === 7)
await page.click('main ul li:first-child button')
check('resonance: player SoundCloud al expandir', await waitFor('iframe[src*="soundcloud"]'))

// Creativa Radio: 14 filas, expandir monta Mixcloud
await goto('creativa-radio')
check('creativa: 14 filas', (await count('main ul li')) === 14)
await page.click('main ul li:first-child button')
check('creativa: player Mixcloud al expandir', await waitFor('iframe[src*="mixcloud"]'))

// Discografía: 6 discos, click monta Bandcamp
await goto('discografia')
check('discografia: 6 discos', (await count('main .grid > *')) === 6)
await page.click('main .grid > button')
check('discografia: player Bandcamp al click', await waitFor('iframe[src*="bandcamp"]'))

// Videos: 4 facades, click monta Vimeo
await goto('videos')
check('videos: 8 facades', (await count('main .grid > *')) === 8)
await page.click('main .grid button')
check('videos: player Vimeo al click', await waitFor('iframe[src*="vimeo"]'))

// Books: biblioteca con 1 libro, visor preserva espaciado y navega páginas
await goto('books')
check('books: 1 libro', (await count('main ul li')) === 1)
await page.click('main ul li a')
check('books: visor abre', await waitFor('main pre', 5000))
const poem = await page.evaluate(() => document.querySelector('main pre').textContent)
check('books: espaciado preservado', poem.includes('se escucha   un  movimiento'))
await page.click('button[aria-label="Página siguiente"]')
await new Promise((r) => setTimeout(r, 300))
const indicator = await page.evaluate(
  () => document.querySelector('[aria-live]')?.textContent.trim(),
)
check('books: avanza a página 2', indicator === '02 / 24', indicator)

// Home: los 6 covers cargan
await goto('')
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 1500))
const broken = await page.evaluate(
  () => [...document.querySelectorAll('main img')].filter((i) => i.naturalWidth === 0).length,
)
check('home: 6 covers cargan', broken === 0, `${broken} rotos`)

// Nav mobile: abrir overlay, navegar, cierra solo
await page.click('button[aria-label="Abrir menú"]')
check('nav mobile: overlay abre', await waitFor('nav.fixed', 2000))
await page.click('nav.fixed a[href$="/contacto"]')
await new Promise((r) => setTimeout(r, 500))
check(
  'nav mobile: navega y cierra',
  await page.evaluate(
    () => !document.querySelector('nav.fixed') && !!document.querySelector('form'),
  ),
)

await browser.close()
server.close()
console.log(failures === 0 ? '\nSmoke OK' : `\n${failures} checks fallaron`)
process.exit(failures === 0 ? 0 : 1)
