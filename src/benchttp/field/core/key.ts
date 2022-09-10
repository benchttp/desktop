import { asInteger } from '@/lib/casting'
import { HTTPCode } from '@/typing'

export type Key =
  | RootKey
  | StatisticsKey
  | RequestEventKey
  | IndexKey
  | HTTPCodeKey

export enum RootKey {
  RequestCount = 'RequestCount',
  RequestFailureCount = 'RequestFailureCount',
  RequestSuccessCount = 'RequestSuccessCount',
  RequestFailures = 'RequestFailures',
  RequestEventTimes = 'RequestEventTimes',
  ResponseTimes = 'ResponseTimes',
  StatusCodesDistribution = 'StatusCodesDistribution',
}

export enum StatisticsKey {
  Min = 'Min',
  Max = 'Max',
  Mean = 'Mean',
  Median = 'Median',
  StandardDeviation = 'StandardDeviation',
  Deciles = 'Deciles',
  Quartiles = 'Quartiles',
}

export type QuantileKey = StatisticsKey.Quartiles | StatisticsKey.Deciles

export enum RequestEventKey {
  DNSDone = 'DNSDone',
  ConnectDone = 'ConnectDone',
  TLSHandshakeDone = 'TLSHandshakeDone',
  WroteHeaders = 'WroteHeaders',
  WroteRequest = 'WroteRequest',
  GotFirstResponseByte = 'GotFirstResponseByte',
  BodyRead = 'BodyRead',
  PutIdleConn = 'PutIdleConn',
}

export type IndexKey = `${number}`

export type HTTPCodeKey = HTTPCode

// Key validators

export const isOneOfKeys = <K extends Key[]>(
  key: string,
  keys: K
): key is K[number] => keys.includes(key as Key)

export const isRootKey = (key: string): key is RootKey =>
  isOneOfKeys(key, Object.values(RootKey))

export const isStatisticsKey = (key: string): key is StatisticsKey =>
  isOneOfKeys(key, Object.values(StatisticsKey))

export const isQuantileKey = (key: string): key is QuantileKey =>
  isOneOfKeys(key, [StatisticsKey.Quartiles, StatisticsKey.Deciles])

export const isRequestEventKey = (key: string): key is RequestEventKey =>
  isOneOfKeys(key, Object.values(RequestEventKey))

export const isIndexKey = (key: string): key is IndexKey =>
  asInteger(key, (n) => n >= 0)

export const isHTTPCodeKey = (key: string): key is HTTPCodeKey =>
  asInteger(key, (n) => 100 <= n && n <= 599)
