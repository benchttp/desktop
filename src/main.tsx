import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { mustSpawnEngine } from './engine/spawn'
import { Router } from './router'
import './style/index.scss'

mustSpawnEngine().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StrictMode>
  )
})
