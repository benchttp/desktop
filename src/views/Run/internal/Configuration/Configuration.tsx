import { FC, FormEvent } from 'react'
import { Mail, Package, Play } from 'react-feather'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Button, Tab, Typography } from '@/components'
import {
  HTTPMethodSelect,
  MillisecondInput,
  NumberInput,
  TextAreaInput,
  Toggle,
  URLInput,
} from '@/components/Inputs'

import { HeadersConfiguration, TestsConfiguration } from './internal/components'
import {
  ConfigurationState,
  ConfigurationField,
} from './internal/Configuration.helpers'

interface IProps {
  state: ConfigurationState
  setState: (v: ConfigurationField) => void
  onSubmit: () => void
}

export const Configuration: FC<IProps> = ({ state, setState, onSubmit }) => {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Typography element="h1" className="mb-4">
        Configuration
      </Typography>
      <div className="mb-5">
        <div className="f f-direction-row f-align-center mb-4">
          <URLInput
            className="mr-3"
            id="url"
            value={state.url}
            onChange={(v) => setState({ url: v })}
            label="URL"
            required
          />
          <HTTPMethodSelect
            id="method"
            value={state.method}
            onChange={(v) => setState({ method: v })}
            label="Method"
          />
        </div>
        <div className="f f-direction-row f-ai-center">
          <Tab
            className="mr-3"
            text="Headers"
            link="headers"
            iconStart={Mail}
          />
          <Tab link="body" text="Body" iconStart={Package} />
        </div>
        <Routes>
          <Route path="*" element={<Navigate to="headers" replace />} />
          <Route
            path="headers"
            element={
              <HeadersConfiguration
                headers={state.headers}
                onChange={(v) => setState({ headers: v })}
              />
            }
          />
          <Route
            path="body"
            element={
              <TextAreaInput
                id="body"
                className="mt-3 mb-3"
                value={state.body}
                rows={5}
                onChange={(e) => setState({ body: e.target.value })}
              />
            }
          />
        </Routes>
        <div className="f f-direction-row f-ai-center mb-4">
          <NumberInput
            className="mr-3"
            id="requests"
            value={state.requests}
            onChange={(v) => setState({ requests: v })}
            label="Number of requests"
          />
          <NumberInput
            className="mr-3"
            id="concurrency"
            value={state.concurrency}
            onChange={(v) => setState({ concurrency: v })}
            label="Concurrent requests"
          />
          <MillisecondInput
            id="interval"
            value={state.interval}
            onChange={(v) => setState({ interval: v })}
            label="Interval"
          />
        </div>
        <div className="f f-direction-row f-ai-center">
          <MillisecondInput
            className="mr-3"
            id="global-timeout"
            value={state.globalTimeout}
            onChange={(v) => setState({ globalTimeout: v })}
            label="Global timeout"
          />
          <MillisecondInput
            className="mr-3"
            id="request-timeout"
            value={state.requestTimeout}
            onChange={(v) => setState({ requestTimeout: v })}
            label="Request timeout"
          />
        </div>
      </div>
      <div className="f f-ai-center mb-4">
        <Typography element="h1">Tests</Typography>
        <Toggle
          className="ml-3"
          id="test-section-enabled"
          checked={state.testsEnabled}
          onChange={(e) => setState({ testsEnabled: e.target.checked })}
        />
      </div>
      <TestsConfiguration
        tests={state.tests}
        onChange={(v) => setState({ tests: v })}
        enabled={state.testsEnabled}
      />

      <div className="f f-ai-center f-jc-end">
        <Button text="Run test" type="submit" iconEnd={Play} />
      </div>
    </form>
  )
}
