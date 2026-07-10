# Prompt / Spec Request: Sección "Books" — Virtual Book Viewer

---

## Contexto del proyecto

Estás trabajando en un sitio web personal de un artista llamado Camilo Franco, construido con **React + TypeScript + Vite + Tailwind CSS v4 + React Router**. El diseño es minimalista, fondo oscuro (`#0b0b0a`), tipografía `Roboto Flex Variable`, color de acento `#c7401f`. El layout global usa un `<SiteHeader>` sticky con navegación horizontal en desktop y overlay en mobile, y un `<SiteFooter>`.

El router está en `src/App.tsx`. El nav se define como un array de `{ to, label }` en `src/components/SiteHeader.tsx`. Las páginas viven en `src/pages/`. El contenido estático se define en `src/content/`.

---

## Objetivo

Agregar una **nueva ruta `/books`** con su entrada en el menú de navegación principal, que funcione como una biblioteca de **libros virtuales**. El primer libro se llama **"Paisajes"** y contiene una colección de poemas con espaciado tipográfico intencional (ver sección de contenido más abajo).

---

## Arquitectura de la feature

### 1. Menú principal
- Agregar `{ to: '/books', label: 'Books' }` al array `links` en `SiteHeader.tsx`.
- Agregar la ruta `<Route path="/books" element={<Books />} />` en `App.tsx`.
- Agregar sub-rutas para cada libro: `<Route path="/books/paisajes" element={<BookViewer bookId="paisajes" />} />` (y futuros libros seguirán el mismo patrón).

### 2. Página `/books` — Biblioteca
- Es la página principal de la sección.
- Muestra un **menú/índice de libros disponibles en el cuerpo de la página** (NO en el header global). Este menú interno debe ser visualmente coherente con el diseño del sitio.
- Cada libro se representa como una **card o entrada clickeable** con: título del libro, cantidad de páginas (o poemas), y un breve descriptor.
- Al hacer clic en un libro, navega a su ruta específica (e.g., `/books/paisajes`).
- Layout: centrado, `max-w-3xl`, padding consistente con el resto del sitio (`px-5 py-16 lg:py-24`).

### 3. Componente `BookViewer` — Visor de libro
Este es el componente central de la feature. Funciona como un **slideshow de páginas** donde cada página es un poema.

**Comportamiento de navegación:**
- El usuario puede avanzar a la siguiente página (→ o botón "siguiente").
- El usuario puede retroceder a la página anterior (← o botón "anterior").
- El usuario puede saltar a una página específica (selector de página: input numérico o dots/pagination).
- Indicador de progreso: `Página X de N`.
- Teclas de teclado: `ArrowRight` / `ArrowLeft` para navegar.
- Swipe táctil (mobile): deslizar izquierda/derecha para cambiar página.

**Layout del visor:**
- Fondo: `bg-bg` (igual que el sitio).
- Área de la página: centrada, `max-w-2xl`, mínimo `min-h-[60vh]` para dar espacio al poema.
- Los controles de navegación (prev / next / indicador) van debajo del área de contenido o fijos en los bordes laterales del viewport.
- Botón de regreso a `/books` en la parte superior (breadcrumb estilo: `← Books / Paisajes`).
- Animación de transición entre páginas: fade o slide horizontal suave, respetando `prefers-reduced-motion`.

**Accesibilidad:**
- `aria-label` en botones de navegación.
- `aria-live="polite"` en el indicador de página.
- El área de contenido del poema debe tener `role="region"` con `aria-label` dinámico (título del poema si lo tiene, o "Página X").

---

## Contenido del libro "Paisajes"

El contenido se define en `src/content/books.ts` como un array de objetos con esta estructura:

```ts
export interface BookPage {
  id: string
  content: string // texto del poema, con espaciado exacto preservado
}

export interface Book {
  id: string
  title: string
  description: string
  pages: BookPage[]
}

export const books: Book[] = [
  {
    id: 'paisajes',
    title: 'Paisajes',
    description: 'Una colección de poemas visuales.',
    pages: [ /* ver abajo */ ]
  }
]
```

### Páginas del libro "Paisajes"

El espaciado tipográfico es parte del poema. Debe respetarse exactamente usando una fuente monoespaciada o preservando espacios con `white-space: pre` / `white-space: pre-wrap`. Cada indentación con espacios en el original representa un desplazamiento visual intencional.

**Página 1:**
```
las cenizas
con sus manos
forman anillos de barro,

                  su cuerpo
húmedo,
```

**Página 2:**
```
Un paisaje
        cualquier cosa irrelevante


                                    Aorden


me devuelve

                                            al
lugar donde estoy
```

**Página 3:**
```
El sol

atenuado por las nubes

de una mañana húmeda.
```

**Página 4:**
```
desorden
                   recurrente

cada cosa
                   va
dejando
       su    camino
            marcas
      como         recuerdos
            recurrentes
                  como recuerdos
      marcas
            su         camino
      va          dejando
                         cada cosa
            recurrente
                  desorden
```

**Página 5:**
```
Un diálogo
que nunca pasó
con respuestas
que nunca nos dan,


                  todo el día
mientras busco
alguna excusa
para levantarme.
```

**Página 6:**
```
el frío
el viento helado que silva,
el piso que cruje
y se quiebra

la mañana
todo oscuro,
               aún.
```

**Página 7:**
```
el día
      más cálido de otoño
el sol anaranjado
   cae sobre
los edificios dormidos
```

> ⚠️ **Nota crítica de rendering:** El espaciado horizontal de los poemas (indentaciones, palabras dispersas en la página) es **intencional y estructural**. Debe renderizarse con `white-space: pre` o `white-space: pre-wrap` en un elemento `<pre>` o `<div>` con la fuente del cuerpo (NO monoespaciada necesariamente, pero que preserve espacios). El tamaño de fuente debe ser legible en mobile: `text-base` o `text-lg`. En desktop puede escalarse levemente. El texto debe estar alineado a la izquierda del área del poema (no centrado), para que el espaciado relativo entre palabras tenga sentido.

---

## Archivos a crear/modificar

| Acción | Archivo |
|--------|---------|
| Crear | `src/content/books.ts` |
| Crear | `src/pages/Books.tsx` |
| Crear | `src/pages/BookViewer.tsx` |
| Modificar | `src/App.tsx` (rutas) |
| Modificar | `src/components/SiteHeader.tsx` (nav link) |

---

## Consideraciones de diseño

- **Tipografía del poema:** Usar la fuente del sitio (`Roboto Flex Variable`) pero con `white-space: pre-wrap` para preservar espaciado. Tamaño: `text-base` (mobile) → `text-lg` (md+). Line-height generoso: `leading-relaxed`.
- **Color:** texto `text-text` sobre fondo `bg-bg`. Sin decoración extra: los poemas son el contenido, sin tarjetas ni bordes.
- **Controles de navegación:** discretos, `text-text-dim`, con hover `text-text`. Iconos de flecha (Lucide: `ChevronLeft`, `ChevronRight`). Botón prev deshabilitado en página 1, next deshabilitado en la última.
- **Indicador de página:** `font-mono text-xs text-text-dim`, e.g., `01 / 07`.
- **Transición:** opacity fade de 200ms entre páginas. Si `prefers-reduced-motion`, sin animación.
- **Mobile:** los controles prev/next deben ser touch-friendly (mínimo 44×44px). El swipe táctil es opcional pero deseable.
- **URL:** la URL no necesita reflejar la página actual del libro (es estado interno), a menos que quieras deep-linking futuro — en ese caso, usar query param `?page=3`.

---

## Comportamiento esperado (flujo de usuario)

1. Usuario hace clic en "Books" en el nav.
2. Ve la página `/books` con una lista de libros disponibles (solo "Paisajes" por ahora).
3. Hace clic en "Paisajes".
4. Navega a `/books/paisajes` y ve el visor con la primera página del libro (primer poema).
5. Puede avanzar/retroceder con botones o flechas del teclado.
6. Ve en todo momento en qué página está y cuántas hay en total.
7. Puede volver a la lista de libros con el breadcrumb o botón "← Books".

---

## Extensibilidad

El sistema debe estar preparado para agregar más libros en el futuro simplemente agregando entradas al array `books` en `src/content/books.ts`. No hardcodear el ID "paisajes" fuera del content file.
