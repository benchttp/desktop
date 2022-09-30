import { FC, useState } from 'react'
import { Mail, Package, Play } from 'react-feather'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'
import { Button, Tab, Typography } from '@/components'
import { TextInput, SelectInput } from '@/components/Inputs'
import { inputConfig } from '@/examples/inputConfig'

import {
  RunConfigurationPanelHeaders,
  RunConfigurationPanelBody,
  RunConfigurationPanelTests,
} from './components'
import {
  handleInputChange,
  handleRunTestClick,
} from './core/RunConfigurationPanel.helpers'
import { IProps } from './core/RunConfigurationPanel.typings'

export const RunConfigurationPanel: FC<IProps> = ({ onStart }) => {
  const [url, setUrl] = useState<string>('')
  const [method, setMethod] = useState<string>('GET')
  const [body, setBody] = useState<string>('')
  const [requests, setRequests] = useState<string>('')
  const [concurrency, setConcurrency] = useState<string>('')
  const [interval, setInterval] = useState<string>('')
  const [requestTimeout, setRequestTimeout] = useState<string>('')
  const [globalTimeout, setGlobalTimeout] = useState<string>('')
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

  console.log({
    url,
    method,
    body,
    requests,
    concurrency,
    interval,
    requestTimeout,
    globalTimeout,
    headers,
    tests,
  })

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
            onChange={handleInputChange(setUrl)}
            label="Url"
          />
          <SelectInput
            id="method"
            value={method}
            onChange={handleInputChange(setMethod)}
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
          <TextInput
            className="mr-3"
            id="requests"
            value={requests}
            onChange={handleInputChange(setRequests)}
            label="Number of requests"
            type="number"
          />
          <TextInput
            className="mr-3"
            id="concurrency"
            value={concurrency}
            onChange={handleInputChange(setConcurrency)}
            label="Concurrent requests"
            type="number"
          />
          <TextInput
            id="interval"
            value={interval}
            onChange={handleInputChange(setInterval)}
            label="Interval (ms)"
            type="number"
          />
        </div>
        <div className="f f-direction-row f-ai-center">
          <TextInput
            className="mr-3"
            id="global-timeout"
            value={globalTimeout}
            onChange={handleInputChange(setGlobalTimeout)}
            label="Global timeout (s)"
            type="number"
          />
          <TextInput
            className="mr-3"
            id="request-timeout"
            value={requestTimeout}
            onChange={handleInputChange(setRequestTimeout)}
            label="Request timeout (s)"
            type="number"
          />
        </div>
      </div>
      <Typography element="h1" className="mb-4">
        Tests
      </Typography>
      <RunConfigurationPanelTests tests={tests} setTests={setTests} />
      <div className="f f-ai-center f-jc-end">
        <Button
          text="Run test"
          onClick={handleRunTestClick({ onStart, config: inputConfig })}
          iconEnd={Play}
        />
      </div>
    </div>
  )
}
