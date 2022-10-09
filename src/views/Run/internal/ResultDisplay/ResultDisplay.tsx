import {
  BarChart2,
  CheckCircle,
  ChevronsDown,
  ChevronsUp,
  Clock,
  StopCircle,
  Target,
} from 'react-feather'

import { RunProgress, RunReport } from '@/benchttp'
import { Button, ProgressBar, Typography } from '@/components'
import { StatCard } from './StatCard'

interface IProps {
  progress: RunProgress | null
  report: RunReport | null
  error: string
  stop: () => false | void
}

export const ResultDisplay: React.FC<IProps> = ({
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
    {report && <ResultsSection {...report} />}
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
    <Typography element="h4" className="mt-3">
      Report
    </Typography>
    <div></div>
    <div>Min: {formatDuration(metrics.responseTimes.min)}</div>
    <div>Max: {formatDuration(metrics.responseTimes.max)}</div>
    <div>Avg: {formatDuration(metrics.responseTimes.mean)}</div>
  </section>
)

const ResultsSection: React.FC<RunReport> = ({ metrics }) => (
  <section>
    <Typography element="h4" className="mt-3">
      Results
    </Typography>
    <div></div>
    <div className="f f-direction-row f-ai-end mb-3">
      <StatCard
        icon={ChevronsUp}
        iconColor="blue"
        className="mr-3"
        stat={formatDuration(metrics.responseTimes.min)}
        label="fastest response"
      />
      <StatCard
        icon={ChevronsDown}
        iconColor="orange"
        className="mr-3"
        stat={formatDuration(metrics.responseTimes.max)}
        label="slowest response"
      />
      <StatCard
        icon={BarChart2}
        iconColor="base-white"
        className="mr-3"
        stat={formatDuration(metrics.responseTimes.mean)}
        label="average response time"
      />
    </div>

    <div className="f f-direction-row f-ai-end mb-3">
      {metrics.responseTimes.deciles && metrics.responseTimes.deciles[8] ? (
        <StatCard
          icon={Clock}
          iconColor="primary"
          className="mr-3"
          stat={formatDuration(metrics.responseTimes.deciles[8])}
          label="90% of requests are faster"
        />
      ) : (
        <StatCard
          icon={Clock}
          iconColor="primary"
          className="mr-3"
          stat="Deciles"
          label="Not enough data"
        />
      )}
      <StatCard
        icon={Target}
        iconColor="purple"
        className="mr-3"
        stat={formatDuration(metrics.responseTimes.standardDeviation)}
        label="standard deviation"
      />
      <StatCard
        icon={CheckCircle}
        iconColor="get"
        className="mr-3"
        stat={formatSuccesfulRequestsNumber(
          metrics.records.length,
          metrics.requestFailures.length
        )}
        label="of requests were successful"
      />
    </div>
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

function calculateSuccesfulRequestsPercentage(
  recordsNb: number,
  failuresNb: number
): number {
  return ((recordsNb - failuresNb) * 100) / recordsNb
}

function formatSuccesfulRequestsNumber(
  recordsNb: number,
  failuresNb: number
): string {
  const percentage = calculateSuccesfulRequestsPercentage(recordsNb, failuresNb)
  return `${percentage.toFixed(2)}%`
}
