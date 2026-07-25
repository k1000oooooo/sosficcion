# Camilo Franco — sitio

Sitio de artista (ambient / minimal / techno): discografía, radio shows y videos. Migrado en 2026 del sitio estático original (Bootstrap 4 + jQuery, preservado en `legacy/`) a **Vite + React + Tailwind CSS v4**, con diseño dark editorial mobile-first. El spec completo de la migración y el design system está en [`MIGRATION_REDESIGN_SPEC.md`](MIGRATION_REDESIGN_SPEC.md).

## Stack

- **Vite 8** + **React 19** + **TypeScript** — SPA con prerender estático de las 6 rutas (título y meta OG por página, sin servidor)
- **react-router 8** (declarativo) · **Tailwind CSS 4** (tokens en `src/styles/theme.css`) · **@unhead/react** (meta por ruta) · **lucide-react** (iconos)
- Tipografía: Roboto Flex + Roboto Mono variables, auto-hosteadas (`@fontsource-variable`)
- Los embeds (SoundCloud, Mixcloud, Bandcamp, Vimeo) cargan **recién al click** (patrón facade) — cero iframes al entrar a cualquier página

## Desarrollo

Requiere Node 22+ (instalado vía nvm).

```bash
npm install
npm run dev        # http://localhost:5173 con hot reload
npm run build      # typecheck + build + prerender a dist/
npm run smoke      # 30 checks contra dist/ (requiere Chrome instalado)
```

## Editar contenido

Todo el contenido vive como datos en `src/content/` — no hay que tocar componentes:

| Archivo | Qué es | Ejemplo de alta |
|---|---|---|
| `shows.ts` | Episodios de Radio Cascabel (SoundCloud) | agregar `{ trackId, title, date }` |
| `mixes.ts` | Sets de Creativa Radio (Mixcloud) | agregar `{ slug, title, genre? }` |
| `releases.ts` | Discos (covers en `public/images/`, WebP) | agregar objeto con `bandcampAlbumId` si tiene player |
| `videos.ts` | Videos de Vimeo | agregar `{ vimeoId, title, author }` |
| `socials.ts` | Links del footer | |

## SEO

Todo el SEO técnico es invisible en la UI y sale del build:

- **`src/seo.ts`** — única fuente de metadata por ruta: títulos, descriptions, canonicals (`https://noname.ar/...`), Open Graph/Twitter Cards y JSON-LD (MusicGroup en home, MusicAlbum en `/discografia`, Book en `/books/:id`). El prerender lo inyecta en el `<head>` de cada página.
- **`scripts/sitemap.mjs`** — genera `dist/sitemap.xml` escaneando las páginas prerenderizadas (último paso de `npm run build`), así nunca queda desincronizado de las rutas.
- **`public/robots.txt`** — apunta al sitemap.
- **`public/images/og.png`** — imagen 1200×630 para compartir en redes; se regenera con `node scripts/og-image.mjs "$PWD"` si cambia el branding.
- El smoke test verifica canonical, og:image, description única, JSON-LD parseable, sitemap y robots en cada build.

Pendiente manual: registrar `noname.ar` en [Google Search Console](https://search.google.com/search-console) y enviar el sitemap.

## Deploy

Cada push a `master` corre `.github/workflows/deploy.yml`: build → smoke test → publicación en GitHub Pages. **Si el smoke falla, no se publica.**

### Configuración inicial (una sola vez)

En GitHub: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**. Sin esto, el job de deploy falla.

### Base path y dominio propio

El sitio se sirve como project page en `k1000oooooo.github.io/sosficcion`, por eso el workflow define:

```yaml
env:
  BASE_PATH: /sosficcion/
```

**Si se agrega un dominio propio** (CNAME en Settings → Pages), hay que **borrar esa variable del workflow** para que el sitio se sirva desde la raíz. Todo lo demás (router, covers, redirects) se adapta solo — el `404.html` matchea por sufijo y funciona en ambos casos.

### URLs del sitio viejo

`/audios.html`, `/creativaRadio.html`, `/discografia.html` y `/videos.html` redirigen a las rutas nuevas vía `404.html`. No convertir esos redirects en archivos estáticos: GitHub Pages resuelve `/videos` a `videos.html` antes que a `videos/index.html` y generaría un loop.

## Formulario de contacto (Formspree)

El formulario de `/contacto` envía por [Formspree](https://formspree.io) (form `meebbwdb`, plan gratis: 50 envíos/mes). Los mensajes llegan al email de la cuenta de Formspree. El ID se configura por `VITE_FORMSPREE_ID`:

- **Producción**: definido en el paso de build de `.github/workflows/deploy.yml`. No es un secreto — viaja en el bundle del cliente de todos modos.
- **Local**: `.env` en la raíz con `VITE_FORMSPREE_ID=meebbwdb` (gitignoreado).

Si algún día se cambia de form o de cuenta, basta actualizar el ID en esos dos lugares. Sin el ID configurado, el sitio funciona igual y el botón Enviar avisa "formulario no conectado".
