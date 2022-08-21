export interface RunProgress {
  Done: boolean
  DoneCount: number
  MaxCount: number
  Timeout: number
  Elapsed: number
}

export interface RunReport {
  Metrics: {
    Min: number
    Max: number
    Avg: number
  }
}

export interface RunError {
  Error: string
}

export interface RunConfiguration {
  request: {
    method: string
    url: string
  }
  runner: {
    requests: number
    concurrency: number
    interval: GoDuration
    requestTimeout: GoDuration
    globalTimeout: GoDuration
  }
}

type GoDuration = `${number}${'ns' | 'µs' | 'ms' | 's' | 'm' | 'h'}`
