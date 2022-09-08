export type GoDuration = `${number}${'ns' | 'µs' | 'ms' | 's' | 'm' | 'h'}`

export interface Statistics {
  min: number
  max: number
  mean: number
  stdDev: number
  median: number
  deciles: number[] | null
  quartiles: number[] | null
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
