import { RunProgress, RunReport } from '@/benchttp'

interface Props {
  progress: RunProgress | null
  report: RunReport | null
  error: string
}

export const RunDisplay: React.FC<Props> = ({ progress, report, error }) => (
  <div>
    {progress && !progress.done && <ProgressSection {...progress} />}
    {report && <ReportSection {...report} />}
    {error && <ErrorSection error={error} />}
  </div>
)

const ProgressSection: React.FC<RunProgress> = ({
  doneCount,
  maxCount,
  elapsed,
  timeout,
}) => (
  <section>
    <h3>Recording Progress</h3>
    <p>
      {doneCount} / {maxCount} requests ({(100 * doneCount) / maxCount}%)
      <br />
      <progress max={maxCount} value={doneCount} />
      <br />
      {((timeout - elapsed) / 1_000_000_000).toFixed(0)}s
    </p>
  </section>
)

const ReportSection: React.FC<RunReport> = ({ metrics }) => (
  <section>
    <h3>Report</h3>
    <div>Min: {formatDuration(metrics.responseTimes.min)}</div>
    <div>Max: {formatDuration(metrics.responseTimes.max)}</div>
    <div>Avg: {formatDuration(metrics.responseTimes.mean)}</div>
  </section>
)

const ErrorSection: React.FC<{ error: string }> = ({ error }) => (
  <section>
    <h3>Error</h3>
    <p>{error}</p>
  </section>
)

function formatDuration(ns: number): string {
  const ms = ns / 1_000_000
  return `${ms.toFixed(2)}ms`
}
