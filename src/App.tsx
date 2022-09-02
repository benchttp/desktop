import { useSpawnEngine } from '@/hooks'

import './App.css'
import { SimpleStream } from './examples'

function App() {
  const { isLoading, address } = useSpawnEngine()

  return (
    <div className="App">
      <h1>Benchttp</h1>
      {isLoading ? <div>Loading</div> : <SimpleStream address={address} />}
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
