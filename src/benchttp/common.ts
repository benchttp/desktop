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
