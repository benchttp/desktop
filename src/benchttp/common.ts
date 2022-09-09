import { FixedArray } from '@/typing'

export type GoDuration = `${number}${'ns' | 'µs' | 'ms' | 's' | 'm' | 'h'}`

export interface Statistics {
  min: number
  max: number
  mean: number
  stdDev: number
  median: number
  deciles: FixedArray<number, 10> | null
  quartiles: FixedArray<number, 4> | null
}

export type RequestEvent =
  | 'DNSDone'
  | 'ConnectDone'
  | 'TLSHandshakeDone'
  | 'WroteHeaders'
  | 'WroteRequest'
  | 'GotFirstResponseByte'
  | 'PutIdleConn'

export type Distribution<K extends string> = Record<K, number>
