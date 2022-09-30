import { FC } from 'react'
import { CheckCircle, Settings } from 'react-feather'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { RunConfiguration } from '@/benchttp'
import { Tab } from '@/components'
import { useRunStream } from '@/hooks'

import { RunConfigurationPanel, RunResultDisplay } from './components'

export const Run: FC = () => {
  const { start, stop, progress, report, error } = useRunStream()

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
            <RunConfigurationPanel
              onStart={(config: RunConfiguration) => {
                start(config)
                navigate('tests-results', { replace: true })
              }}
            />
          }
        />

        <Route
          path="tests-results"
          element={
            <RunResultDisplay
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
