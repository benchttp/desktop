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
      field: 'MAX',
      predicate: 'LT',
      target: '100ms',
    },
  ],
}
