import { ResponsiveBarCanvas } from '@nivo/bar'
import { FC } from 'react'

import { getClassNames } from './internal/BarChart.helpers'
import { IProps } from './internal/BarChart.types'

export const BarChart: FC<IProps> = ({ className, data, xLegend, yLegend }) => {
  const classNames = getClassNames({ className })

  const commonProps = {
    // Comment if you want to hide the axis legends
    // Necessary if you want them to be shown
    margin: { left: 60, bottom: 60 },
  }

  const axisLeft = {
    legend: yLegend,
    legendOffset: -40,
  }

  const axisBottom = {
    legend: xLegend,
    legendOffset: 40,
  }

  return (
    <div className={classNames.join(' ')} style={{ height: '350px' }}>
      <ResponsiveBarCanvas
        {...commonProps}
        colors={{ scheme: 'dark2' }}
        data={data}
        keys={['yAxis']}
        indexBy="xAxis"
        axisLeft={axisLeft}
        axisBottom={axisBottom}
        theme={{
          textColor: '#FFFFFF',
        }}
      />
    </div>
  )
}
