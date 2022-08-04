export const inputConfig = {
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
} as const
