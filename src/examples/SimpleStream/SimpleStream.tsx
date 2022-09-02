import { useRunStream } from '@/hooks'

import { inputConfig } from '../inputConfig'
import { RunControlPanel, RunDisplay } from './components'

interface Props {
  address: string
}

export const SimpleStream: React.FC<Props> = ({ address }) => {
  const { start, stop, reset, progress, report, error } = useRunStream(address)

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
