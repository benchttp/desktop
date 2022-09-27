import { GoDuration } from './common'
import { DurationMetric, Metric, NumberMetric } from './metrics'
import { TestPredicate } from './tests'

export interface RunConfiguration {
  request: {
    method: string
    url: string
    queryParams?: Record<string, string>
    header?: Record<string, string[]>
    body?: {
      type: 'raw' // other values are not implemented
      content: string
    }
  }
  runner: {
    requests: number
    concurrency: number
    interval: GoDuration
    requestTimeout: GoDuration
    globalTimeout: GoDuration
  }
  tests?: ConfigurationTestCase[]
}

type ConfigurationTestCase =
  | SingleTestCase<NumberMetric>
  | SingleTestCase<DurationMetric>

interface SingleTestCase<T extends Metric> {
  name: string
  field: T['field']
  predicate: TestPredicate
  target: T['value']
}
