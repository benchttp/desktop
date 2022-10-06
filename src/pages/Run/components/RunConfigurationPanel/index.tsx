import { FC } from 'react'
import { Mail, Package } from 'react-feather'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Tab, Typography } from '@/components'
import {
  MillisecondInput,
  NumberInput,
  TextAreaInput,
  Toggle,
  URLInput,
} from '@/components/Inputs'
import { IRunConfigurationInput } from '@/hooks/useConfigurationForm'
import { ExactlyOne } from '@/typing'

import { HeadersForm, TestsForm, MethodSelect } from './components'

interface IProps {
  form: IRunConfigurationInput
  set: (v: ExactlyOne<IRunConfigurationInput>) => void
}

export const RunConfigurationPanel: FC<IProps> = ({ form, set }) => {
  return (
    <div>
      <Typography element="h1" className="mb-4">
        Configuration
      </Typography>
      <div className="mb-5">
        <div className="f f-direction-row f-align-center mb-4">
          <URLInput
            className="mr-3"
            id="url"
            value={form.url}
            onChange={(v) => set({ url: v })}
            label="URL"
          />
          <MethodSelect
            id="method"
            value={form.method}
            onChange={(v) => set({ method: v })}
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
              <HeadersForm
                headers={form.headers}
                setHeaders={(v) => set({ headers: v })}
              />
            }
          />
          <Route
            path="body"
            element={
              <TextAreaInput
                id="body"
                value={form.body}
                onChange={(e) => set({ body: e.target.value })}
              />
            }
          />
        </Routes>
        <div className="f f-direction-row f-ai-center mb-4">
          <NumberInput
            className="mr-3"
            id="requests"
            value={form.requests}
            onChange={(v) => set({ requests: v })}
            label="Number of requests"
          />
          <NumberInput
            className="mr-3"
            id="concurrency"
            value={form.concurrency}
            onChange={(v) => set({ concurrency: v })}
            label="Concurrent requests"
          />
          <MillisecondInput
            id="interval"
            value={form.interval}
            onChange={(v) => set({ interval: v })}
            label="Interval"
          />
        </div>
        <div className="f f-direction-row f-ai-center">
          <MillisecondInput
            className="mr-3"
            id="global-timeout"
            value={form.globalTimeout}
            onChange={(v) => set({ globalTimeout: v })}
            label="Global timeout"
          />
          <MillisecondInput
            className="mr-3"
            id="request-timeout"
            value={form.requestTimeout}
            onChange={(v) => set({ requestTimeout: v })}
            label="Request timeout"
          />
        </div>
      </div>
      <div className="f f-ai-center mb-4">
        <Typography element="h1">Tests</Typography>
        <Toggle
          className="ml-3"
          id="test-section-enabled"
          checked={form.areTestsEnabled}
          onChange={(e) => set({ areTestsEnabled: e.target.checked })}
        />
      </div>
      <TestsForm
        tests={form.tests}
        setTests={(v) => set({ tests: v })}
        areTestsEnabled={form.areTestsEnabled}
      />
    </div>
  )
}
