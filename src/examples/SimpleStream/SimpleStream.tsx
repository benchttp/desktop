import { useRunStream } from 'hooks'

import { inputConfig } from '../inputConfig'
import { RunControlPanel, RunDisplay } from './components'

export const SimpleStream = () => {
  const { start, stop, reset, progress, report, error } = useRunStream()

  return (
    <main style={{ textAlign: 'center' }}>
      <h2>Simple communication using Streamable Response</h2>
      <RunControlPanel
        progress={progress}
        onStart={() => start(inputConfig)}
        onStop={stop}
        onReset={reset}
      />
      <RunDisplay progress={progress} report={report} error={error} />
    </main>
  )
}
