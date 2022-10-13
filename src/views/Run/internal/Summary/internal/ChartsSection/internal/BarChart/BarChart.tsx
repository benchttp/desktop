import { ResponsiveBarCanvas } from '@nivo/bar'
import { FC } from 'react'

import { IBarChartEntry } from './internal/BarChart.types'

export const BarChart: FC<IBarChartEntry> = ({ data, xLegend, yLegend }) => {
  const commonProps = {
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
    <div style={{ height: '350px' }}>
      <ResponsiveBarCanvas
        {...commonProps}
        colors="#f1b445"
        data={data}
        keys={['yAxis']}
        indexBy="xAxis"
        axisLeft={axisLeft}
        axisBottom={axisBottom}
        theme={{
          // Color of labels on the graph
          textColor: '#1e2025',
          axis: {
            ticks: {
              text: {
                // Color of text of axis graduation
                fill: '#FFFFFF',
              },
            },
            legend: {
              text: {
                // Color of text of axis titles
                fill: '#FFFFFF',
              },
            },
          },
        }}
      />
    </div>
  )
}
