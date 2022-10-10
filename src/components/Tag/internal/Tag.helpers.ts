import s from './tag.module.scss'
import { ITagColor } from './Tag.types'

export const getClassNames = (
  color: ITagColor,
  className: string | undefined
) => {
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

  return classNames
}
