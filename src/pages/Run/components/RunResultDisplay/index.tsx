import { StopCircle } from 'react-feather'

import { RunProgress, RunReport } from '@/benchttp'
import { Button, ProgressBar, Typography } from '@/components'

interface IProps {
  progress: RunProgress | null
  report: RunReport | null
  error: string
  stop: () => false | void
}

export const RunResultDisplay: React.FC<IProps> = ({
  progress,
  report,
  error,
  stop,
}) => (
  <div>
    <Typography element="h3">Run results</Typography>
    {progress && !progress.done && (
      <ProgressSection {...progress} stop={stop} />
    )}
    {report && <ReportSection {...report} />}
    {error && <ErrorSection error={error} />}
  </div>
)

const ProgressSection: React.FC<RunProgress & { stop: () => false | void }> = ({
  doneCount,
  maxCount,
  elapsed,
  timeout,
}) => (
  <section>
    <Typography element="h3">Recording Progress</Typography>
    <Button
      text="Stop run"
      onClick={() => stop()}
      style="outlined"
      iconEnd={StopCircle}
    />
    <p>
      <ProgressBar max={maxCount} value={doneCount} />
      <br />
      {((timeout - elapsed) / 1_000_000_000).toFixed(0)}s
    </p>
  </section>
)

const ReportSection: React.FC<RunReport> = ({ metrics }) => (
  <section>
    <Typography element="h3">Report</Typography>
    <div>Min: {formatDuration(metrics.responseTimes.min)}</div>
    <div>Max: {formatDuration(metrics.responseTimes.max)}</div>
    <div>Avg: {formatDuration(metrics.responseTimes.mean)}</div>
  </section>
)

const ErrorSection: React.FC<{ error: string }> = ({ error }) => (
  <section>
    <Typography element="h3">Error</Typography>
    <p>{error}</p>
  </section>
)

function formatDuration(ns: number): string {
  const ms = ns / 1_000_000
  return `${ms.toFixed(2)}ms`
}
