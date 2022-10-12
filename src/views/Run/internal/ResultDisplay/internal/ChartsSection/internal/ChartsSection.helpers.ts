import { RunReport } from '@/benchttp'
import { nanosecondsToMilliseconds } from '@/tools/converters'

export const getBarChartData = (
  metrics: RunReport['metrics']
): { responseTimeMaxOfFourchette: string; numberOfOccurrences: number }[] => {
  const recordsData = metrics['records']
  const maxTime = metrics['responseTimes']['max']
  const numberOfDivisions = 20
  const barChartData: {
    responseTimeMaxOfFourchette: number
    numberOfOccurrences: number
  }[] = []

  for (let i = 0; i < numberOfDivisions; i++) {
    barChartData[i] = {
      responseTimeMaxOfFourchette: nanosecondsToMilliseconds(
        (maxTime / numberOfDivisions) * i
      ),
      numberOfOccurrences: 0,
    }
  }

  if (recordsData != null) {
    for (let i = 0; i < recordsData.length; i++) {
      for (let j = 0; j < numberOfDivisions; j++) {
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

  const barChartDataFormatted: {
    responseTimeMaxOfFourchette: string
    numberOfOccurrences: number
  }[] = []

  for (let i = 0; i < numberOfDivisions; i++) {
    barChartDataFormatted[i] = {
      responseTimeMaxOfFourchette:
        barChartData[i]['responseTimeMaxOfFourchette'].toFixed(2),
      numberOfOccurrences: barChartData[i]['numberOfOccurrences'],
    }
  }

  return barChartDataFormatted
}
