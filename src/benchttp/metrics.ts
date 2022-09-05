import { GoDuration } from './common'

export type MetricField = DurationField | NumberField

export type DurationField = SingleMetricField<DurationMetricId, GoDuration>

export type NumberField = SingleMetricField<NumberMetricId, number>

interface SingleMetricField<M extends MetricId, T> {
  id: M
  value: T
}

type MetricId = MetricField['id']

type DurationMetricId = 'MEAN' | 'MAX' | 'MIN'

type NumberMetricId = 'FAILURE_COUNT' | 'SUCCESS_COUNT' | 'TOTAL_COUNT'
