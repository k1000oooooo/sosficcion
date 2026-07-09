import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { createHead, UnheadProvider } from '@unhead/react/client'
import '@fontsource-variable/roboto-flex'
import '@fontsource-variable/roboto-mono'
import './styles/theme.css'
import App from './App'

const head = createHead()
const root = document.getElementById('root')!

const app = (
  <StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>
)

// Con prerender, #root ya trae HTML estático: hidratar en vez de re-renderizar
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
