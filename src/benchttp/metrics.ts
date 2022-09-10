import { GoDuration } from './common'
import {
  RequestEventStatisticsField,
  ResponseTimeStatisticsField,
  HTTPCodeDistributionField,
  RequestCountField,
} from './field'

export type Metric =
  | ResponseTimeMetric
  | RequestEventMetric
  | RequestCountMetric
  | HTTPCodeDistributionMetric

export type NumberMetric = Extract<Metric, { value: number }>

export type DurationMetric = Extract<Metric, { value: GoDuration }>

type RequestCountMetric = NumberMetricOf<RequestCountField>

export type RequestEventMetric = DurationMetricOf<RequestEventStatisticsField>

type ResponseTimeMetric = DurationMetricOf<ResponseTimeStatisticsField>

type HTTPCodeDistributionMetric = NumberMetricOf<HTTPCodeDistributionField>

interface SingleMetric<T, F extends string> {
  field: F
  value: T
}

type DurationMetricOf<F extends string> = SingleMetric<GoDuration, F>

type NumberMetricOf<F extends string> = SingleMetric<number, F>
