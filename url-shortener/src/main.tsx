import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// TODO to transform TS
// TODO transform to React Query
// TODO changeyup for Valibot
// TODO rebrand and change images
// TODO

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
