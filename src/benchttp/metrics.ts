import { GoDuration } from './common'

type DurationField = { id: 'AVG' | 'MAX' | 'MIN'; value: GoDuration }

type IntegerField = {
  id: 'FAILURE_COUNT' | 'SUCCESS_COUNT' | 'TOTAL_COUNT'
  value: number
}

export type MetricField = DurationField | IntegerField
