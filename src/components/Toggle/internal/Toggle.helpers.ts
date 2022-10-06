import s from './Toggle.module.scss'
import { IProps } from './Toggle.typings'

export const getClassName = ({ className }: Pick<IProps, 'className'>) => {
  const classNames: string[] = [s['toggle'], 'f']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}
