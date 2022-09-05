import { GoDuration } from './common'
import { MetricField } from './metrics'
import { TestPredicate } from './tests'

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
  tests?: ConfigurationTestCase<MetricField>[]
}

interface ConfigurationTestCase<T extends MetricField> {
  name: string
  field: T['id']
  predicate: TestPredicate
  target: T['value']
}
