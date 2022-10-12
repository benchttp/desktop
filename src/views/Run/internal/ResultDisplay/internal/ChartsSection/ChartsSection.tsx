import { FC } from 'react'

import { Typography } from '@/components'

import { BarChart } from './internal/BarChart'
import { getBarChartData } from './internal/ChartsSection.helpers'
import { IProps } from './internal/ChartsSection.types'

export const ChartsSection: FC<IProps> = ({ metrics }) => {
  return (
    <div>
      <Typography element="p" size="h4" className="mb-4">
        Bar chart
      </Typography>
      <div>
        <BarChart data={getBarChartData(metrics)} />
      </div>
    </div>
  )
}
