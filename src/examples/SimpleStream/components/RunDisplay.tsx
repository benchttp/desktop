import { RunProgress, RunReport } from 'benchttp'

interface Props {
  progress: RunProgress | null
  report: RunReport | null
  error: string
}

export const RunDisplay: React.FC<Props> = ({ progress, report, error }) => (
  <div>
    {progress && !progress.Done && <ProgressSection {...progress} />}
    {report && <ReportSection {...report} />}
    {error && <ErrorSection error={error} />}
  </div>
)

const ProgressSection: React.FC<RunProgress> = ({
  DoneCount,
  MaxCount,
  Elapsed,
  Timeout,
}) => (
  <section>
    <h3>Recording Progress</h3>
    <p>
      {DoneCount} / {MaxCount} requests ({(100 * DoneCount) / MaxCount}%)
      <br />
      <progress max={MaxCount} value={DoneCount} />
      <br />
      {((Timeout - Elapsed) / 1_000_000_000).toFixed(0)}s
    </p>
  </section>
)

const ReportSection: React.FC<RunReport> = ({ Metrics }) => (
  <section>
    <h3>Report</h3>
    <div>Min: {formatDuration(Metrics.Min)}</div>
    <div>Max: {formatDuration(Metrics.Max)}</div>
    <div>Avg: {formatDuration(Metrics.Avg)}</div>
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
