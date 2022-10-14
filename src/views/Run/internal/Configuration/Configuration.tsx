import { FC, useEffect, useRef, useState } from 'react'
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
  handleSubmit,
  getActionClassName,
  handleScroll,
} from './internal/Configuration.helpers'
import s from './internal/configuration.module.scss'

interface IProps {
  state: ConfigurationState
  setState: (v: ConfigurationField) => void
  onSubmit: () => void
}

export const Configuration: FC<IProps> = ({ state, setState, onSubmit }) => {
  const [formValid, setFormValid] = useState(false)
  const [isScrolledBottom, setIsScrolledBottom] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!formRef.current) {
      return
    }

    setFormValid(formRef.current.checkValidity())
  }, [state])

  useEffect(() => {
    const scrollListener = handleScroll({
      isScrolledBottom,
      setIsScrolledBottom,
    })
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [isScrolledBottom])

  return (
    <form
      className={s['configuration__form']}
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography element="h1" className="mb-4">
        Configuration
      </Typography>
      <div className="mb-5">
        <div className="f f-align-center mb-5">
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
        <div className="f f-ai-center">
          <Tab
            className="mr-3"
            text="Headers"
            link="headers"
            iconStart={Mail}
          />
          <Tab link="body" text="Body" iconStart={Package} />
        </div>
        <div className="mb-5">
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
                  className="mt-3"
                  value={state.body}
                  rows={5}
                  onChange={(e) => setState({ body: e.target.value })}
                  placeholder="{ name: John Doe }"
                  resize="vertical"
                />
              }
            />
          </Routes>
        </div>
        <div className="f f-ai-center mb-4">
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
        <div className="f f-ai-center">
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
          onChange={(e) => setState({ testsEnabled: e })}
        />
      </div>
      <TestsConfiguration
        tests={state.tests}
        onChange={(v) => setState({ tests: v })}
        enabled={state.testsEnabled}
      />

      <div className={getActionClassName(isScrolledBottom)}>
        <Button
          disabled={!formValid}
          text="Run test"
          type="submit"
          iconEnd={Play}
        />
      </div>
    </form>
  )
}
