import { nanosecondsToMilliseconds } from '@/tools/converters'

export const formatDuration = (ns: number): string => {
  return `${nanosecondsToMilliseconds(ns).toFixed(2)}ms`
}

export const formatSuccesfulRequestsPercentage = ({
  recordsNb,
  failuresNb,
}: {
  recordsNb: number
  failuresNb: number
}): string => {
  return `${(((recordsNb - failuresNb) * 100) / recordsNb).toFixed(2)}%`
}
