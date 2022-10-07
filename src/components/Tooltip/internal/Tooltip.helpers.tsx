import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './Tooltip.module.scss'
import { IProps } from './Tooltip.typings'

export const getClassNames = ({ className }: Pick<IProps, 'className'>) => {
  const classNames: string[] = [
    s['tooltip'],
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

export const createIcon = ({ icon }: { icon: Icon }): ReactNode => {
  return createElement(icon, {
    className: 'mr-1',
    size: 24,
    style: { transform: 'rotate(180deg)' },
  })
}
