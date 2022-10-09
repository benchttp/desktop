import { HTTPCode } from '@/typing'

import { Distribution, RequestEvent, Statistics } from './common'
import { Metric } from './metrics'
import { TestPredicate } from './tests'

export interface RunError {
  type: 'client' | 'server'
  errors: string[]
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
    requestEventTimes: Record<RequestEvent, Statistics>
    statusCodesDistribution: Distribution<HTTPCode>
    records: { responseTime: number }[]
    requestFailures: { reason: string }[]
  }
  tests: {
    pass: boolean
    results: {
      pass: boolean
      got: number
      input: RunTestCase
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
