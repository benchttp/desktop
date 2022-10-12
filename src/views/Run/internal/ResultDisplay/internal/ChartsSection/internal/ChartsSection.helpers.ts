import { RunReport } from '@/benchttp'
import { nanosecondsToMilliseconds } from '@/tools/converters'

export const getRequestTimeDistributionData = (
  metrics: RunReport['metrics']
): { xAxis: string; yAxis: number }[] => {
  const recordsData = metrics.records
  const maxTime = metrics.responseTimes.max
  const numberOfDivisions = 20
  const requestTimeDistributionData: {
    timeRangeMax: number
    numberOfOccurrences: number
  }[] = []

  for (let i = 0; i < numberOfDivisions; i++) {
    requestTimeDistributionData[i] = {
      timeRangeMax: (maxTime / numberOfDivisions) * (i + 1),
      numberOfOccurrences: 0,
    }
  }

  if (recordsData != null) {
    for (let i = 0; i < recordsData.length; i++) {
      for (let j = 0; j < numberOfDivisions; j++) {
        if (
          recordsData[i]['responseTime'] >
          requestTimeDistributionData[j]['timeRangeMax']
        ) {
          continue
        } else {
          if (j > 0) {
            requestTimeDistributionData[j]['numberOfOccurrences'] += 1
            break
          } else {
            requestTimeDistributionData[0]['numberOfOccurrences'] += 1
            break
          }
        }
      }
    }
  }

  const requestTimeDistributionDataFormatted: {
    xAxis: string
    yAxis: number
  }[] = []

  for (let i = 0; i < numberOfDivisions; i++) {
    requestTimeDistributionDataFormatted[i] = {
      xAxis: nanosecondsToMilliseconds(
        requestTimeDistributionData[i]['timeRangeMax']
      ).toFixed(2),
      yAxis: requestTimeDistributionData[i]['numberOfOccurrences'],
    }
  }

  return requestTimeDistributionDataFormatted
}
