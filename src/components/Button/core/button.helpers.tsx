import s from './button.module.scss'
import { IProps } from './button.typings'

export const getClassNames = ({
  color,
  style,
  small,
  className,
}: Pick<IProps, 'color' | 'style' | 'small' | 'className'>) => {
  const classNames: string[] = [s['button']]

  classNames.push(s[`button--${style}-${color}`])
  classNames.push('f f-direction-row f-ai-center')

  if (small) {
    classNames.push('p-1')
    classNames.push(s['button--small'])
  } else {
    classNames.push('p-2')
  }

  if (className) {
    classNames.push(className)
  }

  return classNames
}
