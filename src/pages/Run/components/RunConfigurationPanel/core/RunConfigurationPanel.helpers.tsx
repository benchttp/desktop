import {
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react'

import { RunConfiguration } from '@/benchttp'
import { ConfigurationTestCase } from '@/benchttp/configuration'
import { isMetricField, isNumberMetricField } from '@/benchttp/metrics'
import { isTestPredicate } from '@/benchttp/tests'
import { parseInteger, parseMilliseconds } from '@/tools'

import { IRunConfigurationInput, IProps } from './RunConfigurationPanel.typings'

export const handleEnableTestsSectionChange = ({
  setareTestsEnabled,
}: {
  setareTestsEnabled: Dispatch<SetStateAction<boolean>>
}): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    setareTestsEnabled(e.target.checked)
  }
}

export const handleTextInputChange = (
  setter: Dispatch<SetStateAction<string>>
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    setter(e.target.value)
  }
}

export const handleSelectInputChange = (
  setter: Dispatch<SetStateAction<string>>
): ChangeEventHandler<HTMLSelectElement> => {
  return (e) => {
    setter(e.target.value)
  }
}

export const handleNumberInputChange = (
  setter: Dispatch<SetStateAction<number | undefined>>
): ((value: number | undefined) => void) => {
  return (value) => {
    setter(value)
  }
}

export const handleMillisecondInputChange = (
  setter: Dispatch<SetStateAction<`${number}ms` | undefined>>
): ((value: `${number}ms` | undefined) => void) => {
  return (value) => {
    setter(value)
  }
}

export const handleRunTestClick = ({
  onStart,
  configInput,
}: Pick<IProps, 'onStart'> & {
  configInput: IRunConfigurationInput
}): MouseEventHandler => {
  return () => {
    const config = getRunConfiguration(configInput)
    onStart(config)
  }
}

export const getRunConfiguration = ({
  method,
  url,
  headers,
  body,
  requests,
  concurrency,
  interval,
  requestTimeout,
  globalTimeout,
  areTestsEnabled,
  tests,
}: IRunConfigurationInput): RunConfiguration => {
  return {
    request: {
      method: parseMethod(method),
      url: parseUrl(url),
      header: parseHeaders(headers),
      body: parseBody(body),
    },
    runner: {
      requests: parseRequests(requests),
      concurrency: parseConcurrency(concurrency),
      interval: parseInterval(interval),
      requestTimeout: parseRequestTimeout(requestTimeout),
      globalTimeout: parseGlobalTimeout(globalTimeout),
    },
    tests: areTestsEnabled ? parseTests(tests) : undefined,
  }
}

const parseMethod = (
  method: IRunConfigurationInput['method']
): RunConfiguration['request']['method'] => {
  if (method !== 'GET') {
    throw new Error('unsupported method')
  }

  return method
}

const parseUrl = (
  url: IRunConfigurationInput['url']
): RunConfiguration['request']['url'] => {
  if (url === '') {
    throw new Error('url cannot be an empty string')
  }

  return url
}

const parseHeaders = (
  headers: IRunConfigurationInput['headers']
): RunConfiguration['request']['header'] => {
  const isNonEmptyString = (v: string) => v !== ''

  const isNonEmptyValues = (v: string[]) => v.length && v.some(isNonEmptyString)

  const isNonEmpty = headers.some(
    (h) => h.key !== '' && isNonEmptyValues(h.values)
  )

  if (!isNonEmpty) return undefined

  return headers.reduce<Record<string, string[]>>((acc, prev) => {
    acc[prev.key] = prev.values.filter(isNonEmptyString)
    return acc
  }, {})
}

const parseBody = (
  body: IRunConfigurationInput['body']
): RunConfiguration['request']['body'] => {
  if (body === '') {
    return
  }

  return { type: 'raw', content: body }
}

const parseRequests = (
  requests: IRunConfigurationInput['requests']
): RunConfiguration['runner']['requests'] => {
  if (requests === undefined) {
    throw new Error('requests cannot be undefined')
  }

  return requests
}
const parseConcurrency = (
  concurrency: IRunConfigurationInput['concurrency']
): RunConfiguration['runner']['concurrency'] => {
  if (concurrency === undefined) {
    throw new Error('concurrency cannot be undefined')
  }

  return concurrency
}

const parseInterval = (
  interval: IRunConfigurationInput['interval']
): RunConfiguration['runner']['interval'] => {
  if (interval === undefined) {
    throw new Error('interval cannot be undefined')
  }

  return interval
}

const parseRequestTimeout = (
  requestTimeout: IRunConfigurationInput['requestTimeout']
): RunConfiguration['runner']['requestTimeout'] => {
  if (requestTimeout === undefined) {
    throw new Error('requestTimeout cannot be undefined')
  }

  return requestTimeout
}

const parseGlobalTimeout = (
  globalTimeout: IRunConfigurationInput['globalTimeout']
): RunConfiguration['runner']['globalTimeout'] => {
  if (globalTimeout === undefined) {
    throw new Error('globalTimeout cannot be undefined')
  }

  return globalTimeout
}

const parseTests = (
  tests: IRunConfigurationInput['tests']
): ConfigurationTestCase[] | undefined => {
  if (tests.length === 0) {
    return
  }

  return tests.map<ConfigurationTestCase>((test) => {
    if (
      test.name === '' ||
      test.target === '' ||
      !isMetricField(test.field) ||
      !isTestPredicate(test.predicate)
    ) {
      throw new Error('empty string in tests are not supported')
    }

    return isNumberMetricField(test.field)
      ? {
          ...test,
          field: test.field,
          target: parseInteger(test.target),
        }
      : {
          ...test,
          field: test.field,
          target: parseMilliseconds(test.target),
        }
  })
}
