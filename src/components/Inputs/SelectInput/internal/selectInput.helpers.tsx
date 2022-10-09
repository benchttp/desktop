import s from './selectInput.module.scss'
import { IProps } from './selectInput.typings'

export const getClassName = ({
  className,
}: Pick<IProps, 'className'>): string[] => {
  const classNames: string[] = [
    'f',
    'f-direction-column',
    s['select-container'],
  ]

  if (className) {
    classNames.push(className)
  }

  return classNames
}
