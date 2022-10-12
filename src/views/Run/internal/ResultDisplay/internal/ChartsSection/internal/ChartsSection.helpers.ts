import { RunReport } from '@/benchttp'
import { nanosecondsToMilliseconds } from '@/tools/converters'

export const getResponseTimeDistribution = (
  responseTimes: { responseTime: number }[],
  maxTime: RunReport['metrics']['responseTimes']['max']
): { xAxis: string; yAxis: number }[] => {
  const partitions = 10
  const responseTimeDistribution = [...Array(partitions)].map((_, i) => ({
    timeRangeMax: (maxTime / partitions) * (i + 1),
    count: 0,
  }))

  for (let i = 0; i < responseTimes.length; i++) {
    for (let j = 0; j < partitions; j++) {
      if (
        responseTimes[i]['responseTime'] >
        responseTimeDistribution[j]['timeRangeMax']
      ) {
        continue
      } else {
        responseTimeDistribution[j]['count'] += 1
        break
      }
    }
  }

  const responseTimeDistributionFormatted: {
    xAxis: string
    yAxis: number
  }[] = []

  for (let i = 0; i < partitions; i++) {
    responseTimeDistributionFormatted[i] = {
      xAxis: nanosecondsToMilliseconds(
        responseTimeDistribution[i]['timeRangeMax']
      ).toFixed(2),
      yAxis: responseTimeDistribution[i]['count'],
    }
  }

  return responseTimeDistributionFormatted
}
