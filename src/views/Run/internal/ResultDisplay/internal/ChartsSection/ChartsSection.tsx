import { FC } from 'react'

import { Typography } from '@/components'

import { BarChart } from './internal/BarChart'
import { IProps } from './internal/ChartsSection.types'
import { getBarChartData } from './internal/ChartsSection.helpers'

export const ChartsSection: FC<IProps> = ({ metrics }) => {
  return (
    <div>
      <div className="f f-ai-center mb-4">
        <Typography className="mr-1" element="h1">
          Charts:
        </Typography>
      </div>
      <Typography element="p" size="h4" className="mb-4">
        Bar chart
      </Typography>
      <div>
        <BarChart data={getBarChartData(metrics)} />
      </div>
    </div>
  )
}
