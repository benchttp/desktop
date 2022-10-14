import { FC } from 'react'
import { CheckCircle, PieChart, Settings, Zap } from 'react-feather'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { Tab, Typography } from '@/components'

import { Configuration, ResultDisplay, Summary } from './internal/components'
import {
  useRunStream,
  useConfiguration,
  isTestResultsDisabled,
  isSummaryDisabled,
} from './internal/Run.helpers'

export const Run: FC = () => {
  const { start, stop, progress, report, error, appError } = useRunStream()
  const { configuration, setConfiguration, getRunConfiguration } =
    useConfiguration()

  const navigate = useNavigate()

  return (
    <>
      <div className="f f-ai-center f-jc-space-b mb-4">
        <div className="f f-ai-center">
          <Tab
            className="mr-3"
            text="Configure"
            link="configure"
            iconStart={Settings}
          />
          <Tab
            className="mr-3"
            text="Tests results"
            link="tests-results"
            iconStart={CheckCircle}
            disabled={isTestResultsDisabled({
              report,
              progress,
              error,
              appError,
            })}
          />
          <Tab
            text="Summary"
            link="summary"
            iconStart={PieChart}
            disabled={isSummaryDisabled({ report, progress, error, appError })}
          />
        </div>
        <div className="f f-ai-center">
          <Zap color="#f1b445" className="mr-1" />
          <Typography font="poppins" size="h4" weight="bold" color="primary">
            Benchttp
          </Typography>
        </div>
      </div>

      <Routes>
        <Route path="*" element={<Navigate replace to="configure" />} />
        <Route
          path="configure/*"
          element={
            <Configuration
              state={configuration}
              setState={setConfiguration}
              onSubmit={() => {
                start(getRunConfiguration())
                navigate('tests-results', { replace: true })
              }}
            />
          }
        />
        <Route
          path="tests-results"
          element={
            <ResultDisplay
              progress={progress}
              report={report}
              error={error}
              appError={appError}
              stop={stop}
            />
          }
        />
        <Route
          path="summary"
          element={
            <Summary report={report} error={error} appError={appError} />
          }
        />
      </Routes>
    </>
  )
}
