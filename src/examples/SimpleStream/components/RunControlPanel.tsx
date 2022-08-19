import { RunProgress } from '@/benchttp'

interface Props {
  progress: RunProgress | null
  onStart: () => void
  onStop: () => void
  onReset: () => void
}

export const RunControlPanel: React.FC<Props> = ({
  progress,
  onStart,
  onStop,
  onReset,
}) => (
  <div>
    {!progress ? (
      <button onClick={() => onStart()}>Start</button>
    ) : (
      <button onClick={() => onStop()}>Stop</button>
    )}
    <button onClick={() => onReset()}>Clear</button>
  </div>
)
