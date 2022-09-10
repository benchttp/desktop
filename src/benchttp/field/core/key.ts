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
