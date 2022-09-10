import {
  HTTPCodeKey,
  IndexKey,
  QuantileKey,
  RequestEventKey,
  RootKey,
  StatisticsKey,
} from './key'

export type FieldRepr =
  | RequestCountField
  | HTTPCodeDistributionField
  | ResponseTimeStatisticsField
  | RequestEventStatisticsField

export type RequestCountField =
  | RootKey.RequestCount
  | RootKey.RequestFailureCount
  | RootKey.RequestSuccessCount

export type HTTPCodeDistributionField = Depth1<
  RootKey.StatusCodesDistribution,
  HTTPCodeKey
>

export type ResponseTimeStatisticsField = StatisticsOf<RootKey.ResponseTimes>

export type RequestEventStatisticsField = StatisticsOf<
  Depth1<RootKey.RequestEventTimes, RequestEventKey>
>

type StatisticsOf<T extends string> =
  | Depth1<T, StatisticsKey>
  | Depth2<T, QuantileKey, IndexKey>

type Depth1<K0 extends string, K1 extends string> = `${K0}.${K1}`

type Depth2<
  K0 extends string,
  K1 extends string,
  K2 extends string
> = `${Depth1<K0, K1>}.${K2}`
