import { useAppSelector, useRunStream } from '@/hooks'

import { inputConfig } from '../inputConfig'
import { RunControlPanel, RunDisplay } from './components'

export const SimpleStream: React.FC = () => {
  const { start, stop, reset } = useRunStream()

  const progress = useAppSelector((state) => state.run.progress)
  const report = useAppSelector((state) => state.run.report)
  const error = useAppSelector((state) => state.run.error)

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
