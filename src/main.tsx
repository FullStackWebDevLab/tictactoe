import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { Analytics } from "@vercel/analytics/react" // for vercel analytics

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)
