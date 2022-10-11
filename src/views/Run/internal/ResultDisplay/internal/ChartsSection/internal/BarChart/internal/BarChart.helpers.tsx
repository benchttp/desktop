import s from './bar-chart.module.scss'
import { IProps } from './BarChart.types'

export const getClassNames = ({ className }: Pick<IProps, 'className'>) => {
  const classNames: string[] = [
    s['barChart'],
    // 'f',
    // 'f-direction-row',
    // 'f-ai-center',
    // 'p-3',
  ]

  if (className) {
    classNames.push(className)
  }

  return classNames
}
