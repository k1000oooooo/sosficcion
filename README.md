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

## Pendiente: conectar el formulario de contacto

El formulario de `/contacto` está listo pero **sin backend**. Para activarlo:

1. Crear una cuenta gratis en [formspree.io](https://formspree.io) y un form nuevo → copiar el ID (ej. `xabc1234`).
2. **Local**: crear `.env` en la raíz con `VITE_FORMSPREE_ID=xabc1234` (el `.env` está gitignoreado).
3. **Producción**: en GitHub, **Settings → Secrets and variables → Actions → Variables → New repository variable** con nombre `VITE_FORMSPREE_ID`, y agregar al paso de build del workflow:

   ```yaml
   - run: npm run build
     env:
       VITE_FORMSPREE_ID: ${{ vars.VITE_FORMSPREE_ID }}
   ```

Mientras no esté configurado, el botón Enviar muestra un aviso de "formulario no conectado" — el sitio funciona igual.
