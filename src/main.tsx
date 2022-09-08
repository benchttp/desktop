import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { mustSpawnEngine } from './engine/spawn'
import { Router } from './router'
import { store } from './store'
import './style/index.scss'

mustSpawnEngine().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
})
