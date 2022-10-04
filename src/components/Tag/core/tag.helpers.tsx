import s from './tag.module.scss'
import { IProps } from './tag.typings'

export const getClassNames = ({
  color,
  className,
}: Pick<IProps, 'className'> & Pick<Required<IProps>, 'color'>) => {
  const classNames: string[] = [
    s['tag'],
    s[`tag-${color}`],
    'f',
    'f-jc-center',
    'f-direction-row',
    'f-ai-center',
  ]

  if (className) {
    classNames.push(className)
  }

  return classNames
}
