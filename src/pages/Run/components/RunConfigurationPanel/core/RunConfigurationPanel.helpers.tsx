import {
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react'

import { RunConfiguration } from '@/benchttp'
import { ConfigurationTestCase } from '@/benchttp/configuration'
import { isNumberMetricField } from '@/benchttp/metrics'
import { TestPredicate } from '@/benchttp/tests'

import { IProps } from './RunConfigurationPanel.typings'

export const handleInputChange = (
  setter: Dispatch<SetStateAction<string>>
): ChangeEventHandler<HTMLInputElement | HTMLSelectElement> => {
  return (e) => {
    setter(e.target.value)
  }
}

export const handleRunTestClick = ({
  onStart,
  config,
}: Pick<IProps, 'onStart'> & {
  config: RunConfiguration
}): MouseEventHandler => {
  return () => {
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
  tests,
}: {
  method: string
  url: string
  headers: { key: string; values: string[] }[]
  body: string
  requests: string
  concurrency: string
  interval: string
  requestTimeout: string
  globalTimeout: string
  tests: {
    name: string
    field: ConfigurationTestCase['field']
    predicate: TestPredicate
    target: string
  }[]
}): RunConfiguration => {
  return {
    request: {
      method,
      url,
      header: headers.reduce<Record<string, string[]>>((acc, prev) => {
        acc[prev.key] = prev.values

        return acc
      }, {}),
      body: {
        type: 'raw',
        content: body,
      },
    },
    runner: {
      requests: Number(requests),
      concurrency: Number(concurrency),
      interval: `${Number(interval)}ms`,
      requestTimeout: `${Number(requestTimeout)}s`,
      globalTimeout: `${Number(globalTimeout)}s`,
    },
    tests: tests.map<ConfigurationTestCase>((test) => {
      return isNumberMetricField(test.field)
        ? {
            ...test,
            field: test.field,
            target: Number(test.target),
          }
        : {
            ...test,
            field: test.field,
            target: `${Number(test.target)}ms`,
          }
    }),
  }
}
