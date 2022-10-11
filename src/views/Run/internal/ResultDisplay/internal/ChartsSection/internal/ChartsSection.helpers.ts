import { RunReport } from '@/benchttp'
import { nanosecondsToMilliseconds } from '@/tools/converters'

export const getBarChartData = (
  metrics: RunReport['metrics']
): { responseTimeMaxOfFourchette: string; numberOfOccurrences: number }[] => {
  const recordsData = metrics['records']
  const maxTime = metrics['responseTimes']['max']
  const numberOfDivision = 20
  let barChartData: {
    responseTimeMaxOfFourchette: number
    numberOfOccurrences: number
  }[]
  barChartData = []

  for (let i = 0; i < numberOfDivision; i++) {
    barChartData[i] = {
      responseTimeMaxOfFourchette: nanosecondsToMilliseconds(
        (maxTime / numberOfDivision) * i
      ),
      numberOfOccurrences: 0,
    }
  }

  if (recordsData != null) {
    for (let i = 0; i < recordsData.length; i++) {
      for (let j = 0; j < numberOfDivision; j++) {
        if (
          nanosecondsToMilliseconds(recordsData[i]['responseTime']) >
          barChartData[j]['responseTimeMaxOfFourchette']
        ) {
          continue
        } else {
          if (j > 0) {
            barChartData[j - 1]['numberOfOccurrences'] += 1
            break
          } else {
            barChartData[0]['numberOfOccurrences'] += 1
            break
          }
        }
      }
    }
  }

  let barChartDataFormatted: {
    responseTimeMaxOfFourchette: string
    numberOfOccurrences: number
  }[]
  barChartDataFormatted = []

  for (let i = 0; i < numberOfDivision; i++) {
    barChartDataFormatted[i] = {
      responseTimeMaxOfFourchette:
        barChartData[i]['responseTimeMaxOfFourchette'].toFixed(2),
      numberOfOccurrences: barChartData[i]['numberOfOccurrences'],
    }
  }

  return barChartDataFormatted
}
