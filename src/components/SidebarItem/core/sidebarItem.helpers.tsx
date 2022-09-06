import s from './sidebarItem.module.scss'
import { IProps } from './sidebarItem.typings'

export const getClassNames = ({
  selected,
  className,
}: Pick<IProps, 'selected' | 'className'>): string[] => {
  const classNames = [
    s['sidebar-item'],
    'f',
    'f-direction-row',
    'f-ai-center',
    'f-jc-space-b',
    'p-2',
  ]

  if (selected) {
    classNames.push(s['sidebar-item--selected'])
  }

  if (className) {
    classNames.push(className)
  }

  return classNames
}
