import { RunConfiguration } from '@/benchttp'
import { ConfigurationTestCase } from '@/benchttp/configuration'
import { isMetricField, isNumberMetricField } from '@/benchttp/metrics'
import { isTestPredicate } from '@/benchttp/tests'
import { IRunConfigurationInput } from '@/hooks/useConfigurationForm'
import { parseInteger, parseMilliseconds } from '@/tools'

export const parseConfiguration = ({
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
      requests: requests,
      concurrency: concurrency,
      interval: interval,
      requestTimeout: requestTimeout,
      globalTimeout: globalTimeout,
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
