import { Statistics } from './common'
import { RunConfiguration } from './configuration'
import { MetricField } from './metrics'
import { TestPredicate } from './tests'

export interface RunError {
  error: string
}

export interface RunProgress {
  done: boolean
  doneCount: number
  maxCount: number
  timeout: number
  elapsed: number
}

export interface RunReport {
  metrics: {
    responseTimes: Statistics
    requestEventTimes: Statistics
    statusCodesDistribution: Record<string, number>
    records: { responseTime: number }[]
    requestFailures: { reason: string }[]
  }
  tests: {
    pass: boolean
    results: {
      input: RunTestCase
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

interface RunTestCase {
  name: string
  field: MetricField['id']
  predicate: TestPredicate
  target: number
}
