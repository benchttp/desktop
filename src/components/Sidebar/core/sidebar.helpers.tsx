import s from './sidebar.module.scss'
import { IProps } from './sidebar.typings'

export const getClassNames = ({
  className,
}: Pick<IProps, 'className'>): string[] => {
  const classNames = [
    s['sidebar'],
    'f',
    'f-direction-column',
    'pt-4',
    'pb-4',
    'pl-3',
    'pr-3',
  ]

  if (className) {
    classNames.push(className)
  }

  return classNames
}
