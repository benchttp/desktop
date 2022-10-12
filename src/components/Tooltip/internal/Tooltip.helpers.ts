import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './tooltip.module.scss'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = [s['tooltip'], 'f', 'f-center']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const createIcon = (icon: Icon): ReactNode => {
  return createElement(icon, {
    className: s['tooltip__icon'],
    size: 18,
  })
}
