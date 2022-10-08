import { FC } from 'react'
import { CheckCircle, Play, Settings } from 'react-feather'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { Button, Tab } from '@/components'
import { useRunStream } from '@/hooks'

import { Configuration, ResultDisplay } from './internal/components'
import { useConfiguration } from './internal/Configuration'

export const Run: FC = () => {
  const { start, stop, progress, report, error } = useRunStream()
  const { state, setState, getRunConfiguration } = useConfiguration()

  const navigate = useNavigate()

  return (
    <>
      <div className="f f-ai-center mb-4">
        <Tab
          className="mr-3"
          text="Configure"
          link="configure"
          iconStart={Settings}
        />
        <Tab
          text="Tests results"
          link="tests-results"
          iconStart={CheckCircle}
        />
      </div>

      <Routes>
        <Route path="*" element={<Navigate replace to="configure" />} />
        <Route
          path="configure/*"
          element={
            <>
              <Configuration state={state} setState={setState} />
              <div className="f f-ai-center f-jc-end">
                <Button
                  text="Run test"
                  onClick={() => {
                    start(getRunConfiguration())
                    navigate('tests-results', { replace: true })
                  }}
                  iconEnd={Play}
                />
              </div>
            </>
          }
        />

        <Route
          path="tests-results"
          element={
            <ResultDisplay
              progress={progress}
              report={report}
              error={error}
              stop={stop}
            />
          }
        />
      </Routes>
    </>
  )
}
