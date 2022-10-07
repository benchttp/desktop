import { RunConfiguration } from '@/benchttp'
import { IRunConfigurationInput } from '@/hooks/useConfigurationForm'

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
    tests: areTestsEnabled ? tests : undefined,
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
