import s from './tag.module.scss'
import { ITagColor } from './Tag.types'

export const getClassName = ({
  color,
  className,
}: {
  color: ITagColor
  className: string | undefined
}): string => {
  const classNames: string[] = [
    s['tag'],
    s[`tag--${color}`],
    'f',
    'f-jc-center',
    'f-direction-row',
    'f-ai-center',
  ]

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}
