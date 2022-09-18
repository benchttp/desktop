import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

import { MetricField } from '@/benchttp/metrics'
import { TestPredicate } from '@/benchttp/tests'
import { Typography } from '@/components'
import { TextInput, SelectInput } from '@/components/Inputs'

import {
  RunConfigurationPanelHeaders,
  RunConfigurationPanelBody,
} from './components'
import { RunConfigurationPanelTests } from './components/RunConfigurationPanelTests'

export const RunConfigurationPanel: FC = () => {
  const [url, setUrl] = useState<string>('')
  const [method, setMethod] = useState<string>('')
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
      field: MetricField['id']
      predicate: TestPredicate
      target: string
    }[]
  >([{ name: '', field: 'MEAN', predicate: 'LT', target: '' }])

  const handleInputChange = (
    setter: Dispatch<SetStateAction<string>>
  ): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> => {
    return (e) => {
      setter(e.target.value)
    }
  }

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
          <NavLink className="mr-2" to="headers">
            Headers
          </NavLink>
          <NavLink to="body">Body</NavLink>
        </div>
        <Routes>
          <Route
            path="/headers"
            element={
              <RunConfigurationPanelHeaders
                headers={headers}
                setHeaders={setHeaders}
              />
            }
          />
          <Route
            path="/body"
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
          />
          <TextInput
            className="mr-3"
            id="concurrency"
            value={concurrency}
            onChange={handleInputChange(setConcurrency)}
            label="Concurrent requests"
          />
          <TextInput
            id="interval"
            value={interval}
            onChange={handleInputChange(setInterval)}
            label="Interval (ms)"
          />
        </div>
        <div className="f f-direction-row f-ai-center">
          <TextInput
            className="mr-3"
            id="global-timeout"
            value={globalTimeout}
            onChange={handleInputChange(setGlobalTimeout)}
            label="Global timeout (s)"
          />
          <TextInput
            className="mr-3"
            id="request-timeout"
            value={requestTimeout}
            onChange={handleInputChange(setRequestTimeout)}
            label="Request timeout (s)"
          />
        </div>
      </div>
      <Typography element="h1" className="mb-4">
        Tests
      </Typography>
      <RunConfigurationPanelTests tests={tests} setTests={setTests} />
    </div>
  )
}
