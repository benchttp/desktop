export type GoDuration = `${number}${'ns' | 'µs' | 'ms' | 's' | 'm' | 'h'}`

export type MetricField = DurationField | IntegerField

type DurationField = { id: 'AVG' | 'MAX' | 'MIN'; value: GoDuration }

type IntegerField = {
  id: 'FAILURE_COUNT' | 'SUCCESS_COUNT' | 'TOTAL_COUNT'
  value: number
}

export type MetricType = number | GoDuration

export type TestPredicate = 'EQ' | 'NEQ' | 'GT' | 'GTE' | 'LT' | 'LTE'

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
    SuccessCount: number
    FailureCount: number
    TotalCount: number
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
  tests?: TestCase<MetricField>[]
}

interface TestCase<T extends MetricField> {
  name: string
  field: T['id']
  predicate: TestPredicate
  target: T['value']
}
