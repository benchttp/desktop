import { useRunStream } from '@/hooks'
import { useRunState } from '@/store/run'

import { inputConfig } from '../inputConfig'
import { RunControlPanel, RunDisplay } from './components'

export const SimpleStream: React.FC = () => {
  const { start, stop, reset } = useRunStream()

  const { progress, report, error } = useRunState()

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
