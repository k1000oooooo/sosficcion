import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// base queda en '/' — ajustar a '/sosficcion/' si se publica como project page
// de GitHub Pages sin dominio propio (spec: Migration Plan §6)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: fileURLToPath(new URL('./src/prerender.tsx', import.meta.url)),
    }),
  ],
})
