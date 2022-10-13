import { FC } from 'react'
import {
  BarChart2,
  CheckCircle,
  ChevronsDown,
  ChevronsUp,
  Clock,
  Target,
} from 'react-feather'

import { RunError, RunReport } from '@/benchttp'
import { AppError, Typography } from '@/components'

import { RunErrorDisplay } from '../components'
import { ChartsSection, StatCard } from './internal/components'
import {
  formatDuration,
  formatSuccesfulRequestsPercentage,
} from './internal/summary.helpers'
import s from './internal/summary.module.scss'

interface IProps {
  report: RunReport | null
  appError: Error | null
  error: RunError | null
}

export const Summary: FC<IProps> = ({ report, appError, error }) => {
  return (
    <div>
      {report && (
        <>
          <div className="mb-5">
            <Typography className="mb-4" element="h1">
              Metrics
            </Typography>
            <div className={s['summary__metrics']}>
              <StatCard
                icon={ChevronsUp}
                color="base-blue"
                stat={formatDuration(report.metrics.responseTimes.min)}
                label="fastest response"
              />
              <StatCard
                icon={ChevronsDown}
                color="base-orange"
                stat={formatDuration(report.metrics.responseTimes.max)}
                label="slowest response"
              />
              <StatCard
                icon={BarChart2}
                color="base-white"
                stat={formatDuration(report.metrics.responseTimes.mean)}
                label="average response time"
              />
              {report.metrics.responseTimes.deciles &&
              report.metrics.responseTimes.deciles[8] ? (
                <StatCard
                  icon={Clock}
                  color="primary"
                  stat={formatDuration(report.metrics.responseTimes.deciles[8])}
                  label="90% of requests are faster"
                />
              ) : (
                <StatCard
                  icon={Clock}
                  color="primary"
                  stat="Deciles"
                  label="Not enough data"
                />
              )}
              <StatCard
                icon={Target}
                color="base-purple"
                stat={formatDuration(
                  report.metrics.responseTimes.standardDeviation
                )}
                label="standard deviation"
              />
              <StatCard
                icon={CheckCircle}
                color="base-green"
                stat={formatSuccesfulRequestsPercentage({
                  recordsNb: report.metrics.records.length,
                  failuresNb: report.metrics.requestFailures.length,
                })}
                label="of requests were successful"
              />
            </div>
          </div>
          <div>
            <Typography element="h1" className="mb-4">
              Charts
            </Typography>
            <ChartsSection metrics={report.metrics}></ChartsSection>
          </div>
        </>
      )}
      {appError && <AppError error={appError.message} />}
      {error && <RunErrorDisplay errors={error.errors} />}
    </div>
  )
}
