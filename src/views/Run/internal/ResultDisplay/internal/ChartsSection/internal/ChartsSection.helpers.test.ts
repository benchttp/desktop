import { expect, test } from 'vitest'

import { getResponseTimeDistribution } from './ChartsSection.helpers'

test('getResponseTimeDistribution()', () => {
  const responseTimes: { responseTime: number }[] = [
    { responseTime: 1000000 },
    { responseTime: 2000000 },
    { responseTime: 3000000 },
    { responseTime: 5000000 },
    { responseTime: 5000000 },
    { responseTime: 5000000 },
    { responseTime: 7000000 },
    { responseTime: 8000000 },
    { responseTime: 9000000 },
    { responseTime: 10000000 },
  ]
  const maxTime = 10000000

  expect(getResponseTimeDistribution(responseTimes, maxTime)).toEqual([
    { xAxis: '1.00', yAxis: 1 },
    { xAxis: '2.00', yAxis: 1 },
    { xAxis: '3.00', yAxis: 1 },
    { xAxis: '4.00', yAxis: 0 },
    { xAxis: '5.00', yAxis: 3 },
    { xAxis: '6.00', yAxis: 0 },
    { xAxis: '7.00', yAxis: 1 },
    { xAxis: '8.00', yAxis: 1 },
    { xAxis: '9.00', yAxis: 1 },
    { xAxis: '10.00', yAxis: 1 },
  ])
})
