import { GoDuration } from './common'
import { DurationField, MetricField, NumberField } from './metrics'
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
  tests?: ConfigurationTestCase[]
}

type ConfigurationTestCase =
  | BaseTestCase<DurationField>
  | BaseTestCase<NumberField>

interface BaseTestCase<T extends MetricField> {
  name: string
  field: T['id']
  predicate: TestPredicate
  target: T['value']
}
