import s from './toggle.module.scss'
import { IProps } from './toggle.typings'

export const getClassName = ({ className }: Pick<IProps, 'className'>) => {
  const classNames: string[] = [s['toggle'], 'f']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}
