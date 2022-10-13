import { RunReport } from '@/benchttp'
import { nanosecondsToMilliseconds } from '@/tools/converters'

import { IBarChartData } from './BarChart/internal/BarChart.types'

export const getResponseTimeDistribution = (
  responseTimes: { responseTime: number }[],
  max: RunReport['metrics']['responseTimes']['max']
): IBarChartData[] => {
  const partitions = 10

  return computeDistribution({ responseTimes, partitions, max }).map(
    formatEntry
  )
}

interface IComputeDistribution {
  responseTimes: { responseTime: number }[]
  partitions: number
  max: number
}

interface IDistribution {
  timeRangeMax: number
  count: number
}

const computeDistribution = ({
  responseTimes,
  partitions,
  max,
}: IComputeDistribution): IDistribution[] => {
  const distribution = [...Array(partitions)].map((_, i) => ({
    timeRangeMax: (max / partitions) * (i + 1),
    count: 0,
  }))

  responseTimes.forEach(({ responseTime }) => {
    for (let i = 0; i < partitions; i++) {
      if (responseTime == max) {
        if (responseTime <= distribution[i].timeRangeMax) {
          distribution[i].count += 1
          break
        }
      }
      if (responseTime < distribution[i].timeRangeMax) {
        distribution[i].count += 1
        break
      }
    }
  })

  return distribution
}

const formatEntry = ({
  timeRangeMax,
  count,
}: IDistribution): IBarChartData => ({
  xAxis: nanosecondsToMilliseconds(timeRangeMax).toFixed(2),
  yAxis: count,
})
