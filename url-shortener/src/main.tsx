import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// TODO add valibot error handling by Fabian
// TODO change graphs according to docs
// TODO try if moving login/logout redirect to RQ works too
// TODO deploy and add domain url through the app in links
// TODO add react hot toast?
// TODO add link edit function?
// TODO rebrand and change images
// TODO reformat all files
// TODO add demo data and show demo account info on HOmepage

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
