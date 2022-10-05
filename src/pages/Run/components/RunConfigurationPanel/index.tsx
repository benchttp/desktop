import { FC, useState } from 'react'
import { Mail, Package, Play } from 'react-feather'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'
import { Button, Tab, Typography } from '@/components'
import {
  TextInput,
  SelectInput,
  MillisecondInput,
  NumberInput,
  Toggle,
} from '@/components/Inputs'

import {
  RunConfigurationPanelHeaders,
  RunConfigurationPanelBody,
  RunConfigurationPanelTests,
} from './components'
import {
  handleTextInputChange,
  handleRunTestClick,
  handleSelectInputChange,
  handleNumberInputChange,
  handleMillisecondInputChange,
  handleEnableTestsSectionChange,
} from './core/RunConfigurationPanel.helpers'
import { IProps } from './core/RunConfigurationPanel.typings'

export const RunConfigurationPanel: FC<IProps> = ({ onStart }) => {
  const [isTestsSectionEnabled, setIsTestsSectionEnabled] = useState(false)
  const [url, setUrl] = useState<string>('')
  const [method, setMethod] = useState<string>('GET')
  const [body, setBody] = useState<string>('')
  const [requests, setRequests] = useState<number>()
  const [concurrency, setConcurrency] = useState<number>()
  const [interval, setInterval] = useState<`${number}ms`>()
  const [requestTimeout, setRequestTimeout] = useState<`${number}ms`>()
  const [globalTimeout, setGlobalTimeout] = useState<`${number}ms`>()
  const [headers, setHeaders] = useState<{ key: string; values: string[] }[]>([
    { key: '', values: [''] },
  ])
  const [tests, setTests] = useState<
    {
      name: string
      field: ConfigurationTestCase['field']
      predicate: TestPredicate
      target: string
    }[]
  >([{ name: '', field: 'ResponseTimes.Mean', predicate: 'LT', target: '' }])

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
            value={url}
            onChange={handleTextInputChange(setUrl)}
            label="Url"
          />
          <SelectInput
            id="method"
            value={method}
            onChange={handleSelectInputChange(setMethod)}
            options={[
              { value: 'GET', display: 'GET' },
              { value: 'POST', display: 'POST' },
              { value: 'PUT', display: 'PUT' },
              { value: 'PATCH', display: 'PATCH' },
              { value: 'DELETE', display: 'DELETE' },
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
                headers={headers}
                setHeaders={setHeaders}
              />
            }
          />
          <Route
            path="body"
            element={
              <RunConfigurationPanelBody body={body} setBody={setBody} />
            }
          />
        </Routes>
        <div className="f f-direction-row f-ai-center mb-4">
          <NumberInput
            className="mr-3"
            id="requests"
            value={requests}
            onChange={handleNumberInputChange(setRequests)}
            label="Number of requests"
          />
          <NumberInput
            className="mr-3"
            id="concurrency"
            value={concurrency}
            onChange={handleNumberInputChange(setConcurrency)}
            label="Concurrent requests"
          />
          <MillisecondInput
            id="interval"
            value={interval}
            onChange={handleMillisecondInputChange(setInterval)}
            label="Interval"
          />
        </div>
        <div className="f f-direction-row f-ai-center">
          <MillisecondInput
            className="mr-3"
            id="global-timeout"
            value={globalTimeout}
            onChange={handleMillisecondInputChange(setGlobalTimeout)}
            label="Global timeout"
          />
          <MillisecondInput
            className="mr-3"
            id="request-timeout"
            value={requestTimeout}
            onChange={handleMillisecondInputChange(setRequestTimeout)}
            label="Request timeout"
          />
        </div>
      </div>
      <div className="f f-ai-center mb-4">
        <Typography element="h1">Tests</Typography>
        <Toggle
          className="ml-3"
          id="test-section-enabled"
          checked={isTestsSectionEnabled}
          onChange={handleEnableTestsSectionChange({
            setIsTestsSectionEnabled,
          })}
        />
      </div>
      <RunConfigurationPanelTests
        tests={tests}
        setTests={setTests}
        isTestsSectionEnabled={isTestsSectionEnabled}
      />
      <div className="f f-ai-center f-jc-end">
        <Button
          text="Run test"
          onClick={handleRunTestClick({
            onStart,
            configInput: {
              method,
              url,
              headers,
              body,
              requests,
              concurrency,
              interval,
              requestTimeout,
              globalTimeout,
              tests,
            },
          })}
          iconEnd={Play}
        />
      </div>
    </div>
  )
}
