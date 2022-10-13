import {
  BarChart2,
  CheckCircle,
  ChevronsDown,
  ChevronsUp,
  Clock,
  StopCircle,
  Target,
} from 'react-feather'

import { RunError, RunProgress, RunReport } from '@/benchttp'
import { AppError, Button, ProgressBar, Typography } from '@/components'

import {
  RunErrorDisplay,
  StatCard,
  ReportSection,
  ChartsSection,
} from './internal/components'

interface IProps {
  progress: RunProgress | null
  report: RunReport | null
  error: RunError | null
  appError: Error | null
  stop: () => false | void
}

export const ResultDisplay: React.FC<IProps> = ({
  progress,
  report,
  error,
  appError,
  stop,
}) => (
  <div>
    {progress && !progress.done && (
      <ProgressSection {...progress} stop={stop} />
    )}
    {report && (
      <>
        <ReportSection report={report} />
        <ResultsSection {...report} />
      </>
    )}
    {appError && <AppError error={appError.message} />}
    {error && <RunErrorDisplay errors={error.errors} />}
  </div>
)

const ProgressSection: React.FC<RunProgress & { stop: () => false | void }> = ({
  doneCount,
  maxCount,
  elapsed,
  timeout,
}) => (
  <section>
    <Typography element="h2" className="mt-3 mb-2">
      Recording Progress
    </Typography>
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

const ResultsSection: React.FC<RunReport> = ({ metrics }) => (
  <div>
    <section>
      <Typography element="h2" className="mt-3 mb-2">
        Results
      </Typography>
      <div className="f mb-3">
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
      <div className="f f-direction-row mb-3">
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
          stat={formatSuccesfulRequestsPercentage(
            metrics.records.length,
            metrics.requestFailures.length
          )}
          label="of requests were successful"
        />
      </div>
    </section>
    <section>
      <Typography element="h2" className="mt-3 mb-2">
        Charts
      </Typography>
      <ChartsSection metrics={metrics}></ChartsSection>
    </section>
  </div>
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

function formatSuccesfulRequestsPercentage(
  recordsNb: number,
  failuresNb: number
): string {
  const percentage = calculateSuccesfulRequestsPercentage(recordsNb, failuresNb)
  return `${percentage.toFixed(2)}%`
}
