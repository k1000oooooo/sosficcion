# sosficcion — Migration + Redesign Spec

Artist site for Camilo Franco (ambient / minimal / techno). Spec produced 2026-07-09 from an audit of the `master` branch (single commit `e2d315c`, 2019-12-03).

---

## Repo Audit

### Current tech stack

There is **no framework, no bundler, no router, no state management, and no package.json**. This is a hand-written static site:

| Concern | Current state |
|---|---|
| Framework | None — 5 static HTML files |
| Styling | Bootstrap 4.1.3 via CDN + one custom stylesheet (`css/estilos.css`, 156 lines) |
| JS | jQuery 3.3.1 **slim** + Popper 1.14.3 + Bootstrap 4 JS via CDN (only used for the navbar collapse toggle) |
| Routing | Plain `<a href="*.html">` links |
| Build | None — files are served as-is |
| Deployment | GitHub Pages-style static hosting (`github.com/k1000oooooo/sosficcion`) |
| Server-side | None. No API, no auth, no data fetching — all dynamic content arrives via third-party `<iframe>` embeds |

### Pages (5 total)

| File | Purpose | Content |
|---|---|---|
| `index.html` | Home | About text (ES + EN), 6 release covers linking out to Bandcamp/SoundCloud/YouTube, non-functional contact form, social footer |
| `audios.html` | Resonance Extra radio shows | 7 SoundCloud iframe players (`audios.html:63-72`) |
| `creativaRadio.html` | Creativa Radio mixtapes | 14 Mixcloud iframe players (`creativaRadio.html:61-86`) |
| `discografia.html` | Discography | 4 Bandcamp embedded album players (`discografia.html:61-71`) |
| `videos.html` | Videos | 4 Vimeo iframe players, each re-including `player.js` (`videos.html:61-75`) |

The header/nav (~28 lines) and footer (~30 lines) are **copy-pasted verbatim into all 5 files** — the strongest argument for componentization.

### Defects found (fix by migration, not by patching)

- **Invalid HTML**: `id:"cont1"` (colon instead of `=`) on every page, e.g. `index.html:39`; misspelled `<dic>` elements wrapping iframes (`audios.html:66-75`, `creativaRadio.html:63-78`); duplicate `id="videos"`, `id="discografia"`, `id="formGroupExampleInput"` attributes.
- **Empty `<title>`** on `index.html:6`; `lang="en"` while content is Spanish.
- **Dead contact form**: `index.html:102-114` — no `action`, no handler; the "Send" button is an `<a href="#">`.
- **Duplicate stylesheet**: `estilos.css` at repo root is a byte-identical copy of `css/estilos.css`; only the `css/` copy is referenced. The root copy is dead code.
- **Dead assets**: `images/error.mp4`, `images/mixcloud_Iphone01.png` are referenced nowhere. `images/` totals **5.9 MB of unoptimized PNGs**.
- **Layout by margin hacks**: positioning done with `margin-left: 75%`, `margin: 60%`, `offset-*` classes (`css/estilos.css:83-88,67-70`) — brittle at every breakpoint.
- **Deprecated deps**: Bootstrap 4.1.3 (EOL, Bootstrap is on v5.3), jQuery 3.3.1 (known XSS advisories in <3.5), Popper v1 (superseded by v2/floating-ui). All loaded from CDN with SRI, so no supply-chain urgency, but all obsolete.
- **Performance**: `creativaRadio.html` boots **14 Mixcloud iframes eagerly** — dozens of third-party requests before first interaction. Same pattern (7 iframes) on `audios.html`.

---

## Framework Recommendation

### → **Vite + React** (with `react-router` and a prerender pass)

Scoring against the stated criteria, with evidence:

| Criterion | Finding | Points to |
|---|---|---|
| SSR/SSG/ISR needed? | The only indexable content is ~2 sentences of About text; **everything else is third-party iframes, which SSR cannot render anyway** | Vite |
| API routes / server data fetching? | Zero. The one form is dead; replace with Formspree/Web3Forms (client-side POST) | Vite |
| Routing complexity? | 5 flat routes, no nesting, no dynamic segments | Vite |
| RSC benefit? | None — no server data, no heavy per-route payload beyond iframes | Vite |
| Hosting | Currently plain static files on GitHub Pages; a Vite `dist/` deploys identically | Vite |
| Team | Solo maintainer; minimal config is an explicit value here | Vite |

**The one honest counterargument** is SEO/social sharing: as a pure SPA, each route serves the same `index.html`, so per-page `<title>`/OpenGraph tags (link previews when sharing `/discografia` on socials) need extra work. **Tiebreaker**: this is solvable inside Vite with a build-time prerender step (`vite-prerender-plugin`) that snapshots each of the 5 known routes to static HTML — you get Next-style per-page HTML output without adopting Next's server mental model, App Router conventions, and heavier config for a site with zero server needs. If the site ever grows a blog, gig calendar, or CMS-driven releases, revisit Next.js (or Astro) then; nothing in this migration blocks that.

Not chosen but worth naming: **Astro would be the theoretically ideal fit** (content site, islands for embeds). It's excluded because the brief scopes the decision to Vite + React vs Next.js, and React skills transfer directly to either future path.

---

## Migration Plan

Target: **React 19 + Vite 7 + react-router 7 (declarative mode) + Tailwind CSS v4 + TypeScript**.

### 1. Dependency cleanup and upgrades

Drop entirely (nothing depends on them once Bootstrap markup is gone):
- Bootstrap 4.1.3 CSS + JS, jQuery, Popper — the only JS behavior (navbar collapse) becomes ~10 lines of React state.
- Vimeo `player.js` script tags (4× in `videos.html`) — plain iframes don't need it; keep only if programmatic control is added later.

Add:
```
react react-dom react-router
vite @vitejs/plugin-react typescript
tailwindcss @tailwindcss/vite
@unhead/react            # per-route <title>/OG meta
vite-prerender-plugin    # snapshot the 5 routes at build time
lucide-react             # icons (see Redesign)
```

### 2. Folder and file structure

```
sosficcion/
├── index.html                  # Vite entry (replaces current index.html)
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── images/                 # optimized covers (WebP/AVIF, see step 8)
├── src/
│   ├── main.tsx
│   ├── App.tsx                 # router + layout shell
│   ├── styles/theme.css        # Tailwind v4 @theme tokens
│   ├── content/                # content-as-data (see routing note)
│   │   ├── releases.ts         # 6 covers + 4 Bandcamp embeds, merged
│   │   ├── shows.ts            # 7 SoundCloud track IDs
│   │   ├── mixes.ts            # 14 Mixcloud feed slugs
│   │   ├── videos.ts           # 4 Vimeo IDs + titles
│   │   └── socials.ts          # 4 social links
│   ├── components/             # (inventory in Part 2)
│   └── pages/
│       ├── Home.tsx
│       ├── ResonanceExtra.tsx
│       ├── CreativaRadio.tsx
│       ├── Discografia.tsx
│       └── Videos.tsx
```

Key move: **extract every embed URL/ID into `src/content/*.ts`**. The current pages are 90% repeated iframe boilerplate differing only by ID — e.g. the 14 Mixcloud iframes in `creativaRadio.html:61-86` become a 14-element array mapped over one `<MixcloudEmbed>` component. Adding a mix becomes a one-line data edit.

### 3. Routing migration

| Old URL | New route | Notes |
|---|---|---|
| `/index.html` | `/` | |
| `/audios.html` | `/resonance-extra` | rename to match nav label |
| `/creativaRadio.html` | `/creativa-radio` | |
| `/discografia.html` | `/discografia` | |
| `/videos.html` | `/videos` | |

- Declarative `<Routes>` in `App.tsx`; shared `<Layout>` route wrapping header/footer (kills the 5× copy-paste).
- Ship redirect stubs at the old `.html` paths (tiny static files in `public/` with `<meta http-equiv="refresh">` + canonical link) so old inbound links don't 404 on GitHub Pages.
- GitHub Pages SPA caveat: the prerender step sidesteps the usual `404.html` hack, since each route exists as a real HTML file after build.

### 4. State management

**None needed.** Full inventory of interactive state: (a) mobile nav open/closed — one `useState` in the header; (b) contact form fields + submit status — local `useState` posting to Formspree; (c) embed facades' loaded/unloaded state — local per component. Do not add Redux/Zustand/Context beyond React's built-ins; there is nothing to share.

### 5. Styling system

**Tailwind CSS v4** (per brief) with design tokens as CSS custom properties in `@theme` — see Part 2. Migration is a rewrite, not a translation: the existing CSS is 156 lines of margin hacks against Bootstrap defaults; nothing in `css/estilos.css` is worth porting except two decisions to preserve on purpose — the black background and the SoundCloud player accent color already embedded in the URLs (`color=%23241440`, update it to the new accent). Delete both `estilos.css` copies at the end.

### 6. Build config and environment variables

- `vite.config.ts`: `@vitejs/plugin-react`, `@tailwindcss/vite`, prerender plugin listing the 5 routes. Set `base` to `/sosficcion/` **only if** staying on project-pages hosting (`k1000oooooo.github.io/sosficcion`); omit for a custom domain.
- Env vars: just one — `VITE_FORMSPREE_ID` (or equivalent) for the contact form endpoint. No secrets anywhere; nothing else is configurable.
- Deploy: GitHub Actions workflow — `npm ci && npm run build`, publish `dist/` to Pages. Replaces the current "push raw files" flow.

### 7. Testing strategy (validation at each step)

1. **Baseline capture (before touching anything)**: screenshot all 5 pages at 375/768/1440 px; save the list of all 30 outbound embed/social URLs (they are the site's actual content — `grep -o 'https://[^"]*' *.html | sort -u`).
2. **Per-page port**: after each page component lands, diff its rendered embed URLs against the baseline list. This is the single highest-value check — a typo'd Bandcamp album ID fails silently.
3. **Route/redirect check**: `npm run build && npx serve dist`, hit all 5 new routes **and** all 5 old `.html` paths.
4. **Smoke automation**: one Playwright spec — visit each route, assert expected iframe count per page (7 / 14 / 4 / 4) and that nav toggle opens on mobile viewport. Unit tests beyond this are not warranted for a content site.
5. **Lighthouse (mobile preset)**: run on `/creativa-radio` before/after — the facade pattern (Part 2) should move Performance from red to green. Also assert no horizontal overflow at 375px on any route (`document.documentElement.scrollWidth <= innerWidth` in the Playwright spec) — the current site fails this on Discografía due to fixed-width iframes.

### 8. Breaking changes & risks

| Risk | Handling |
|---|---|
| Old `.html` URLs 404 | Redirect stubs (step 3) |
| Embeds break when copied | Copy URLs from the baseline list, not by hand; Playwright asserts counts |
| Dead embeds (site is from 2019 — some SoundCloud/Mixcloud IDs may already 404) | Audit each of the 30 URLs during content extraction; drop or replace dead ones consciously |
| Contact form goes from dead → live | It never worked, so any working endpoint is a strict improvement; add honeypot field for spam |
| Image weight (5.9 MB PNGs) | Convert covers to WebP (~80% quality) at build prep; keep originals out of `public/`. Delete `error.mp4` and `mixcloud_Iphone01.png` (unreferenced) |
| `lang`/meta regressions | Set `lang="es"` in the Vite `index.html`; per-route titles via `@unhead/react` (fixes the empty title on today's home page) |

---

## Redesign Design System

Direction: dark editorial — the Resonance Extra lineage the site already gestures at (it names a page after the station). Near-black field, bone-white type, one warm accent, mono labels, visible grid. The embeds are the artwork; the UI is the frame.

### Color system (CSS custom properties, Tailwind v4 `@theme`)

```css
@theme {
  --color-bg:        #0B0B0A;  /* near-black, warm — page field */
  --color-surface:   #141412;  /* cards, embed frames */
  --color-surface-2: #1D1D1A;  /* hover lift, form fields */
  --color-line:      #2A2A26;  /* hairline borders, grid rules */
  --color-text:      #E8E4DC;  /* bone white — primary text */
  --color-text-dim:  #8F8B82;  /* metadata, captions, placeholders */
  --color-accent:    #C7401F;  /* muted signal red — links, active nav, focus */
  --color-accent-2:  #D9A441;  /* amber — sparingly: playing state, form success */
  --color-error:     #E05C4A;  /* form validation only */
}
```

Rules: `--color-accent` never appears as a fill larger than a button; amber appears at most once per viewport. No pure `#000`/`#FFF` anywhere — the warmth is the identity. Contrast: text on bg is ~13.9:1, dim text ~6.7:1, accent on bg ~5.0:1 (AA at all sizes).

### Typography

Family: **Roboto** (client requirement). Stay within the superfamily — one family, two cuts, zero pairing friction. Self-host via `@fontsource-variable` to keep the site dependency-free at runtime:

- **Roboto Flex** (variable) — display + headings + nav + body. Its variable axes are the design tool: display sizes set at width `85` (slightly condensed) and weight `500–600` with negative tracking for the editorial voice; body at width `100`, weight `400`. This axis contrast is what keeps plain Roboto from reading generic.
- **Roboto Mono** — metadata: labels, dates, catalog numbers ("SNL-001", "SPD-06" — the release names already carry catalog codes; surface them), footer, nav overline.
- No third face — the two About sentences and captions set in Roboto Flex 400.

Scale (1.333 ratio, `rem`):

| Token | Size / line-height / tracking | Use |
|---|---|---|
| `xs` | 0.75rem / 1.5 / +0.08em, uppercase, mono | labels, catalog numbers, nav overline |
| `sm` | 0.875rem / 1.5 / +0.02em | captions, footer |
| `base` | 1rem / 1.6 / 0 | body |
| `lg` | 1.333rem / 1.4 / 0 | card titles |
| `xl` | 1.777rem / 1.25 / −0.01em | section headings |
| `2xl` | 2.369rem / 1.15 / −0.015em | page titles |
| `3xl` | 3.157rem / 1.05 / −0.02em | home hero |
| `4xl` | 4.209rem / 1.0 / −0.025em, weight 500 | wordmark moment on home, desktop only |

### Layout & grid — mobile-first (hard requirement)

**The mobile layout is the design; desktop is the enhancement.** Every component is specced, built, and reviewed at 375px first — desktop treatments are additive `md:`/`lg:` variants on top. In Tailwind terms: unprefixed utilities describe the phone, prefixed utilities describe wider screens; a component with more prefixed classes than base classes is upside-down and should be flagged in review. This matters doubly here because the current site is effectively broken on mobile (`width: 5%` avatars, `margin-left: 75%` footers, fixed 350px Bandcamp iframes overflowing small screens).

- **Base (mobile) layout**: single column, `px-5` side padding, full-width hairline-separated stacks. The 12-column grid only materializes at `lg`, max-width `72rem` (1152px); content then sits in columns 2–11 — the empty outer columns are the negative space.
- **Hairline discipline**: sections divided by 1px `--color-line` rules, full-bleed. Lists (mixes, shows) are rows separated by hairlines, not floating cards — the Resonance Extra move. Rows read perfectly in one column, which is why they're the mobile-native primitive.
- Breakpoints (additive only): `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Grids grow upward: releases 1→2→3 col, videos 1→2.
- **Touch targets**: every interactive element ≥44×44px on mobile — nav links, TrackRows, facade play buttons, form fields (inputs at `min-h-12`).
- **Embeds are fluid**: all iframes `width: 100%` inside aspect-ratio boxes; the current fixed `width: 350px` Bandcamp embeds (`discografia.html:61-71`) must not survive the port.
- Vertical rhythm: section padding `py-16` base, expanding to `py-24` at `lg`; heading-to-content gap `mb-10`.
- Type scale ramps: `4xl` and `3xl` are desktop-only sizes; the home hero is `2xl` at base and steps up at `md`/`lg` (`text-2xl md:text-3xl lg:text-4xl`).

### Motion

- One easing (`cubic-bezier(0.25, 0.1, 0.25, 1)`), two durations: 150ms (hover/focus) and 350ms (reveals, nav drawer).
- Page-load reveal: content fades up 8px, staggered 40ms per row — CSS only, once, no scroll-triggered re-animation.
- `prefers-reduced-motion`: all transitions collapse to 0ms.
- Nothing moves that the user didn't cause, except the single load reveal.

### Iconography

**Lucide** (`lucide-react`) at 16–20px, `stroke-width: 1.5`, colored `--color-text-dim`, accent on hover. Replaces all four PNG social logos (`logoSoundcloud.png`, `mixcloud.png`, `youtube.png`, `facebook.png`). Mixcloud isn't in Lucide — use one inline custom SVG matching the 1.5px stroke grammar. Icons appear only in the footer, the mobile nav toggle, external-link arrows (`arrow-up-right`), and the embed-facade play button.

---

## Component Specs

### Inventory

| Component | Used on | Replaces |
|---|---|---|
| `Layout` | all | 5× copy-pasted header/footer |
| `SiteHeader` / `NavLink` | all | Bootstrap navbar (`index.html:12-38`) |
| `SiteFooter` / `SocialLinks` | all | footer block (`index.html:116-145`) |
| `SectionHeading` | all | ad-hoc `.h2`/`.h5` (incl. the literal `:...:` at `index.html:61`) |
| `Hero` | Home | commented-out title block |
| `ReleaseCard` | Home, Discografía | cover grid `article`s (`index.html:62-95`) |
| `EmbedFacade` | all embed pages | eager iframes everywhere |
| `SoundcloudEmbed` / `MixcloudEmbed` / `BandcampEmbed` / `VimeoEmbed` | respective pages | 30 hand-pasted iframes |
| `TrackRow` | Resonance Extra, Creativa Radio | `<dic>`-wrapped iframe stacks |
| `ContactForm` / `Field` / `Button` | Home | dead form (`index.html:100-114`) |

All are stateless-first: content in via props (from `src/content/*.ts`), the only internal state being nav-open, facade-loaded, and form status, as scoped in Migration §4.

### Key component notes

**`SiteHeader`** — Hairline-bottomed bar, `bg-bg/90` + `backdrop-blur`, sticky. Left: wordmark "CAMILO FRANCO" in mono `xs` uppercase +0.08em tracking (link to `/`). Right (desktop): four nav links, `sm` size, `--color-text-dim`, hover → `--color-text` (150ms), active route → `--color-accent` with a 1px underline offset 6px. Mobile (<768px): links collapse behind a Lucide `menu` toggle into a full-screen overlay (`bg-bg`, links at `2xl`, staggered 40ms reveal) — replacing the Bootstrap collapse, which was the only jQuery dependency. The `Perfil.png` avatar inside the current navbar is cut: it competes with the wordmark and earns nothing.

**`Hero` (Home)** — Full-width, ~70vh. Name at `4xl`/`3xl`, then the two About sentences (ES then EN, EN in `--color-text-dim` — the bilingual pair becomes a typographic device) at `base`, max-width `42ch`, left-aligned on the grid's column 2. No image, no button. The commented-out "Web Developer - Marketing" subtitle stays dead — this is the music site.

**`ReleaseCard`** — Square cover (WebP), `lg` title, mono `xs` line for label + year + catalog code ("Sulky Netlabel · 2013 · SNL-001" — data the current site buries in URLs). Whole card is the link, opens externally with `arrow-up-right` icon appearing on hover. Hover: cover dims to 85% + 1px `--color-line` border brightens to `--color-text-dim`; no scale transforms, no shadows. Grid: 3-col desktop / 2-col tablet / 1-col mobile, `gap-px` with `--color-line` showing through — the grid is drawn, not implied.

**`EmbedFacade`** — The performance keystone. Renders a `--color-surface` block at the embed's aspect ratio with title (`lg`), mono metadata, and a 40px Lucide `play` circle in `--color-accent`; the real iframe mounts only on click (`loading="lazy"` as a fallback for below-fold ones already loaded). Cuts Creativa Radio from 14 eager third-party iframes to 0. Loaded state swaps facade → iframe with a 350ms crossfade.

**`TrackRow`** — Hairline-separated full-width rows: mono index number ("01"), title, date right-aligned in `--color-text-dim`, chevron. Click expands to the `EmbedFacade`/player in-place (350ms height ease). Turns the two radio pages from iframe walls into scannable editorial indexes.

**`ContactForm`** — Fields as underline-only inputs: transparent bg, 1px bottom border `--color-line`, focus → `--color-accent` (150ms), label floats to mono `xs`. Submit `Button`: mono uppercase, 1px border, transparent → on hover fills `--color-text` with `--color-bg` text (inversion, 150ms). Success replaces form with one amber line. Errors in `--color-error` under the field, never as toasts.

**`SiteFooter`** — Full hairline rule, then one row: "REDES" as mono `xs` overline left, Lucide social icons right, © line in `--color-text-dim`. Kills the `margin-left: 75%` positioning (`css/estilos.css:87`).

### Interaction patterns

- **Navigation**: instant route swaps with a 150ms content fade; scroll restored to top. Active state always visible in the nav.
- **External links**: every off-site link (all releases, socials, embed titles) gets `rel="noopener"` + the hover arrow — the site is a hub pointing outward, make leaving legible.
- **Focus**: 1px `--color-accent` outline, offset 2px, on every interactive element; visible only on `:focus-visible`.
- **Feel target**: the site should feel like a printed program for a broadcast — quiet until touched, precise when touched.
- **Mobile interaction defaults**: hover states are enhancements, never carriers of information — everything a hover reveals (external-link arrows, cover borders) is either always-visible on touch devices or non-essential. The primary navigation experience is the full-screen mobile overlay; the desktop link row is its expansion.

---

## Implementation Roadmap

1. **Baseline capture** — screenshots of all 5 pages ×3 viewports; extract the 30 embed/outbound URLs to a checklist; verify each URL still resolves (site is from 2019).
2. **Scaffold** — `npm create vite@latest` (react-ts) in-place on a `migration` branch; add Tailwind v4, react-router, @unhead/react, lucide-react, fontsource variable fonts; commit the skeleton building.
3. **Design tokens** — `src/styles/theme.css` with the `@theme` block above (colors, type scale, easing); wire fonts.
4. **Content extraction** — write `src/content/{releases,shows,mixes,videos,socials}.ts` from the URL checklist (depends on 1).
5. **Shell** — `Layout`, `SiteHeader` (with mobile overlay), `SiteFooter`, `SocialLinks`, routes for all 5 pages rendering placeholder headings; per-route meta via unhead.
6. **Embed primitives** — `EmbedFacade` + the four provider wrappers; verify one of each provider loads on click.
7. **Pages** — in dependency order of primitives: Discografía (`BandcampEmbed` + `ReleaseCard`), Videos (`VimeoEmbed`), Resonance Extra (`TrackRow` + `SoundcloudEmbed`), Creativa Radio (`TrackRow` + `MixcloudEmbed`), Home last (`Hero`, `ReleaseCard` grid, `ContactForm`). **Each page is built and signed off at 375px before any `md:`/`lg:` styles are written** — desktop is a second pass per page, not a parallel track.
8. **Contact form backend** — Formspree (or Web3Forms) endpoint + `VITE_FORMSPREE_ID`; honeypot field; test a real submission.
9. **Assets** — convert 6 cover PNGs to WebP; delete `error.mp4`, `mixcloud_Iphone01.png`, both `estilos.css` files, and the 4 social-logo PNGs.
10. **Prerender + redirects** — configure `vite-prerender-plugin` for the 5 routes; add old-path `.html` redirect stubs in `public/`.
11. **Validation** — Playwright smoke spec (iframe counts, nav toggle); Lighthouse on `/creativa-radio`; diff rendered embed URLs against the step-1 checklist.
12. **Deploy** — GitHub Actions → Pages workflow; set `base` per hosting choice; verify old URLs redirect in production; delete the legacy `.html` sources.
