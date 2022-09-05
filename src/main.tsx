// eslint-disable-next-line import/default
import React from 'react'
// eslint-disable-next-line import/default
import ReactDOM from 'react-dom/client'

import App from './App'
import { mustSpawnEngine } from './engine/spawn'
import './index.css'

mustSpawnEngine().then(() => {
  // eslint-disable-next-line import/no-named-as-default-member
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
