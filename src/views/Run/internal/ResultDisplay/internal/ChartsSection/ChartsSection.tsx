import { FC } from 'react'

import { Typography } from '@/components'

import { BarChart } from './internal/BarChart'
import { getResponseTimeDistribution } from './internal/ChartsSection.helpers'
import { IProps } from './internal/ChartsSection.types'

export const ChartsSection: FC<IProps> = ({ metrics }) => {
  return (
    <div>
      <Typography element="p" size="h4" className="mb-4">
        Response time distribution
      </Typography>
      <div>
        <BarChart
          data={getResponseTimeDistribution(metrics)}
          xLegend="Time per request (ms)"
          yLegend="Number of requests"
        />
      </div>
    </div>
  )
}
