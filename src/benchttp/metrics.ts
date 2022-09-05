import { GoDuration } from './common'

export type MetricField = DurationField | NumberField

type DurationField = SingleMetricField<DurationMetricId, GoDuration>

type NumberField = SingleMetricField<NumberMetricId, number>

interface SingleMetricField<M extends MetricId, T> {
  id: M
  value: T
}

type MetricId = MetricField['id']

type DurationMetricId = 'MEAN' | 'MAX' | 'MIN'

type NumberMetricId = 'FAILURE_COUNT' | 'SUCCESS_COUNT' | 'TOTAL_COUNT'
