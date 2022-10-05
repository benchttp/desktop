import { FC } from 'react'
import { Mail, Package, Play } from 'react-feather'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Button, Tab, Typography } from '@/components'
import {
  TextInput,
  SelectInput,
  MillisecondInput,
  NumberInput,
  Toggle,
  TextAreaInput,
} from '@/components/Inputs'
import { useConfigurationForm } from '@/hooks'

import {
  RunConfigurationPanelHeaders,
  RunConfigurationPanelTests,
} from './components'
import { handleRunTestClick } from './core/RunConfigurationPanel.helpers'
import { IProps } from './core/RunConfigurationPanel.typings'

export const RunConfigurationPanel: FC<IProps> = ({ onStart }) => {
  const { form, set } = useConfigurationForm()
  console.log(form)
  return (
    <div>
      <Typography element="h1" className="mb-4">
        Configuration
      </Typography>
      <div className="mb-5">
        <div className="f f-direction-row f-align-center mb-4">
          <TextInput
            className="mr-3"
            id="url"
            value={form.url}
            onChange={(e) => set({ url: e.target.value })}
            label="URL"
          />
          <SelectInput
            id="method"
            value={form.method}
            onChange={(e) => set({ method: e.target.value })}
            options={[
              { value: 'GET', display: 'GET' },
              { value: 'POST', display: 'POST', disabled: true },
              { value: 'PUT', display: 'PUT', disabled: true },
              { value: 'PATCH', display: 'PATCH', disabled: true },
              { value: 'DELETE', display: 'DELETE', disabled: true },
            ]}
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
              <RunConfigurationPanelHeaders
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
      <RunConfigurationPanelTests
        tests={form.tests}
        setTests={(v) => set({ tests: v })}
        areTestsEnabled={form.areTestsEnabled}
      />
      <div className="f f-ai-center f-jc-end">
        <Button
          text="Run test"
          onClick={handleRunTestClick({
            onStart,
            configInput: form,
          })}
          iconEnd={Play}
        />
      </div>
    </div>
  )
}
