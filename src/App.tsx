import { useEffect } from 'react'

import { spawn } from '@/engine/spawn'

import './App.css'
import { SimpleStream } from './examples'

function App() {
  useEffect(() => {
    const callSpawn = async () => await spawn()
    callSpawn()
  }, [])

  return (
    <div className="App">
      <h1>Benchttp</h1>
      <SimpleStream />
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
