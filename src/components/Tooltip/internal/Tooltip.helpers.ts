import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './tooltip.module.scss'

export const getClassName = (className: string | undefined): string => {
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

  return classNames.join(' ')
}

export const createIcon = (icon: Icon): ReactNode => {
  return createElement(icon, {
    className: 'mr-1',
    size: 20,
    style: { transform: 'rotate(180deg)' },
  })
}
