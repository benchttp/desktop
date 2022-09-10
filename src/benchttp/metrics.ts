import { HTTPCode } from '@/typing'

import { GoDuration, RequestEvent, Statistics } from './common'

export type Metric =
  | ResponseTimeMetric
  | RequestEventMetric
  | RequestCountMetric
  | HTTPCodeDistributionMetric

export type NumberMetric = Extract<Metric, { value: number }>

export type DurationMetric = Extract<Metric, { value: GoDuration }>

type RequestCountMetric = NumberMetricOf<
  'RequestCount' | 'RequestFailureCount' | 'RequestSuccessCount'
>

type RequestEventMetric = DurationMetricOf<
  StatisticsOf<`RequestEventTimes.${RequestEvent}`>
>

type ResponseTimeMetric = DurationMetricOf<StatisticsOf<'ResponseTimes'>>

type HTTPCodeDistributionMetric =
  NumberMetricOf<`StatusCodesDistribution.${HTTPCode}`>

interface SingleMetric<Type, Field extends string> {
  field: Field
  value: Type
}

type DurationMetricOf<Field extends string> = SingleMetric<GoDuration, Field>

type NumberMetricOf<Field extends string> = SingleMetric<number, Field>

type StatisticsOf<T extends string> = `${T}.${Capitalize<keyof Statistics>}`
