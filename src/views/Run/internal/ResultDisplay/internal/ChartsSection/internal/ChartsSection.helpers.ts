import { RunReport } from '@/benchttp'
import { nanosecondsToMilliseconds } from '@/tools/converters'

export const getResponseTimeDistribution = (
  metrics: RunReport['metrics']
): { xAxis: string; yAxis: number }[] => {
  const records = metrics.records
  const maxTime = metrics.responseTimes.max
  const partitions = 20
  const responseTimeDistribution = [...Array(partitions)].map((_, i) => ({
    timeRangeMax: (maxTime / partitions) * (i + 1),
    count: 0,
  }))

  for (let i = 0; i < records.length; i++) {
    for (let j = 0; j < partitions; j++) {
      if (
        records[i]['responseTime'] > responseTimeDistribution[j]['timeRangeMax']
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
