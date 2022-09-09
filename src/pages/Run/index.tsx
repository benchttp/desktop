import { FC } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'

import { RunConfiguration } from '@/benchttp'
import { Typography } from '@/components'
import { useRunStream } from '@/hooks'

import { RunConfigurationPanel, RunResultDisplay } from './components'

export const Run: FC = () => {
  const { start, stop, progress, report, error } = useRunStream()

  const navigate = useNavigate()

  return (
    <>
      <Typography element="h1">Benchttp</Typography>

      <NavLink to="./config">
        <Typography element="span">Config</Typography>
      </NavLink>

      <NavLink to="./result">
        <Typography element="span">Result</Typography>
      </NavLink>

      <Routes>
        <Route
          path="/config"
          element={
            <RunConfigurationPanel
              onStart={(config: RunConfiguration) => {
                start(config)
                navigate('./result', { replace: true })
              }}
            />
          }
        />

        <Route
          path="/result"
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
