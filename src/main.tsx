import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { createHead, UnheadProvider } from '@unhead/react/client'
import '@fontsource-variable/roboto-flex'
import '@fontsource-variable/roboto-mono'
import './styles/theme.css'
import App from './App'

const head = createHead()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>,
)
