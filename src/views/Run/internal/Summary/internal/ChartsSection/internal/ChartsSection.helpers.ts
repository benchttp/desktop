import { nanosecondsToMilliseconds } from '@/tools/converters'

import { IBarChartData } from './BarChart/internal/BarChart.types'

const partitions = 10

export const getResponseTimeDistribution = (
  responseTimes: { responseTime: number }[],
  max: number
): IBarChartData[] => {
  return computeDistribution(responseTimes, partitions, max).map(formatEntry)
}

interface Bar {
  timeRangeMax: number
  count: number
}

const computeDistribution = (
  responseTimes: { responseTime: number }[],
  partitions: number,
  max: number
): Bar[] => {
  const distribution: Bar[] = [...Array(partitions)].map((_, i) => ({
    timeRangeMax: (max / partitions) * (i + 1),
    count: 0,
  }))

  responseTimes.forEach(({ responseTime }) => {
    const index = findRank(responseTime, distribution)
    if (index !== -1) {
      distribution[index].count++
    }
    // Silently ignore values that are out of range
  })

  return distribution
}

/**
 * Finds the index of the bar that the given value belongs to.
 * Expects the bars to be sorted by their limits ascending.
 * Returns null if the value is out of range.
 */
const findRank = (value: number, distribution: Bar[]): number => {
  return distribution.findIndex((bar) => value <= bar.timeRangeMax)
}

const formatEntry = ({ timeRangeMax, count }: Bar): IBarChartData => ({
  xAxis: nanosecondsToMilliseconds(timeRangeMax).toFixed(0),
  yAxis: count,
})
