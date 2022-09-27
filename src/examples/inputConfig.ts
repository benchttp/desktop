import { RunConfiguration } from '@/benchttp'

export const inputConfig: RunConfiguration = {
  request: {
    method: 'GET',
    url: 'https://example.com',
  },
  runner: {
    requests: 50,
    concurrency: 10,
    interval: '50ms',
    requestTimeout: '2s',
    globalTimeout: '20s',
  },
  tests: [
    {
      name: 'My endpoint has no latency',
      field: 'RequestEventTimes.ConnectDone.Max',
      predicate: 'LT',
      target: '250ms',
    },
    {
      name: 'My endpoint has enough teapots',
      field: 'StatusCodesDistribution.418',
      predicate: 'GT',
      target: 10,
    },
  ],
}
