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
      method: method,
      url: url,
      header: headers,
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
