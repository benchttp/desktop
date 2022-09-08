import { HTTPCode } from '@/typings/http-code'
import { GoDuration, Statistics } from './common'

export type MetricField = DurationField | NumberField

export type DurationField = SingleMetricField<DurationMetricId, GoDuration>

export type NumberField = SingleMetricField<NumberMetricId, number>

interface SingleMetricField<M extends MetricId, T> {
  id: M
  value: T
}

type MetricId = MetricField['id']

type DurationMetricId = ResponseTimeId | RequestEventId

type NumberMetricId = RequestCountId | HTTPCodeDistributionId

type RequestCountId =
  | 'RequestCount'
  | 'RequestFailureCount'
  | 'RequestSuccessCount'

type RequestEvent =
  | 'DNSDone'
  | 'ConnectDone'
  | 'TLSHandshakeDone'
  | 'WroteHeaders'
  | 'WroteRequest'
  | 'GotFirstResponseByte'
  | 'PutIdleConn'

type ResponseTimeId = StatisticsOf<'ResponseTimes'>

type RequestEventId = StatisticsOf<`RequestEventTimes.${RequestEvent}`>

type HTTPCodeDistributionId = `StatusCodesDistribution.${HTTPCode}`

type StatisticsOf<T extends string> = `${T}.${Capitalize<keyof Statistics>}`
