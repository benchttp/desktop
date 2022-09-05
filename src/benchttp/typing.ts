export type GoDuration = `${number}${'ns' | 'µs' | 'ms' | 's' | 'm' | 'h'}`

export type MetricField = DurationField | IntegerField

type DurationField = { id: 'AVG' | 'MAX' | 'MIN'; value: GoDuration }

type IntegerField = {
  id: 'FAILURE_COUNT' | 'SUCCESS_COUNT' | 'TOTAL_COUNT'
  value: number
}

type TimeStats = {
  min: number
  max: number
  mean: number
  stdDev: number
  median: number
  deciles: number[] | null
  quartiles: number[] | null
}

export type MetricType = number | GoDuration

export type TestPredicate = 'EQ' | 'NEQ' | 'GT' | 'GTE' | 'LT' | 'LTE'

export interface RunProgress {
  done: boolean
  doneCount: number
  maxCount: number
  timeout: number
  elapsed: number
}

export interface RunReport {
  metrics: {
    responseTimes: TimeStats
    requestEventTimes: TimeStats
    statusCodesDistribution: Record<string, number>
    records: { responseTime: number }[]
    requestFailures: { reason: string }[]
  }
  tests: {
    pass: boolean
    results: {
      input: TestCaseResponse
      pass: boolean
      summary: string
    }[]
  }
  metadata: {
    config: RunConfiguration
    startedAt: number
    finishedAt: number
  }
}

export interface RunError {
  error: string
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

interface TestCaseResponse extends TestCase<MetricField> {
  target: number
}
