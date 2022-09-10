import { FixedArray } from '@/typing'

export type GoDuration = `${number}${'ns' | 'µs' | 'ms' | 's' | 'm' | 'h'}`

export interface Statistics {
  min: number
  max: number
  mean: number
  median: number
  standardDeviation: number
  deciles: FixedArray<number, 10> | null
  quartiles: FixedArray<number, 4> | null
}

export type Distribution<K extends string> = Record<K, number>
