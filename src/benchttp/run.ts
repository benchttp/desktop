import { HTTPCode } from '@/typing'

import { Distribution, Statistics } from './common'
import { RequestEventKey } from './field'
import { Metric } from './metrics'
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
    requestEventTimes: Record<RequestEventKey, Statistics>
    statusCodesDistribution: Distribution<HTTPCode>
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
    startedAt: number
    finishedAt: number
  }
}

interface RunTestCase {
  name: string
  field: Metric['field']
  predicate: TestPredicate
  target: number
}
