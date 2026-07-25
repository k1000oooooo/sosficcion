// Genera public/images/og.png (1200x630) renderizando una tarjeta con la
// estética del sitio en Chrome headless. Se corre una vez y se commitea.
//   node og-image.mjs /ruta/al/repo
import puppeteer from 'puppeteer-core'
import { join } from 'node:path'

const repo = process.argv[2]
const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome')

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #0b0b0a;
    color: #e8e4dc;
    font-family: system-ui, sans-serif;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 80px 88px;
    border-top: 10px solid #c7401f;
  }
  .kicker {
    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
    font-size: 26px; letter-spacing: 0.14em; text-transform: uppercase;
    color: #8f8b82;
  }
  h1 { font-size: 110px; font-weight: 650; letter-spacing: -0.01em; }
  .sub { font-size: 34px; color: #8f8b82; line-height: 1.4; }
  .footer {
    display: flex; justify-content: space-between; align-items: baseline;
    border-top: 1px solid #2a2a26; padding-top: 28px;
  }
  .url {
    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
    font-size: 28px; letter-spacing: 0.08em; color: #d9a441;
  }
</style></head>
<body>
  <div>
    <p class="kicker">Ambient · Minimal · Techno</p>
    <h1>Camilo Franco</h1>
    <p class="sub">Discografía · Radio shows · Videos</p>
  </div>
  <div class="footer">
    <span class="url">noname.ar</span>
    <span class="kicker">Buenos Aires</span>
  </div>
</body></html>`

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle0' })
const out = join(repo, 'public/images/og.png')
await page.screenshot({ path: out })
await browser.close()
console.log('OG image →', out)
