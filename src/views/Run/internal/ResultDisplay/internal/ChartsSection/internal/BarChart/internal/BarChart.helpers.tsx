import s from './bar-chart.module.scss'
import { IProps } from './BarChart.types'

export const getClassNames = ({ className }: Pick<IProps, 'className'>) => {
  const classNames: string[] = [s['barChart']]

  if (className) {
    classNames.push(className)
  }

  return classNames
}
