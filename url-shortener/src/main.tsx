import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// TODO transform to TS
// TODO transform to React Query
// TODO change yup for Valibot
// TODO rebrand and change images
// TODO add demo data and show demo account info on HOmepage

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
