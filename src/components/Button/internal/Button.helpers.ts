import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './button.module.scss'
import { IButtonColor, IButtonStyle } from './Button.types'

export const getClassNames = (
  color: IButtonColor,
  style: IButtonStyle,
  small: boolean,
  className: string | undefined
): string => {
  const classNames: string[] = [
    s['button'],
    s[`button--${style}-${color}`],
    'f',
    'f-direction-row',
    'f-ai-center',
  ]

  if (small) {
    classNames.push('p-1')
    classNames.push(s['button--small'])
  } else {
    classNames.push('p-2')
  }

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const createIcon = (
  icon: Icon,
  small: boolean,
  position: 'start' | 'end'
): ReactNode => {
  return createElement(icon, {
    className:
      position === 'start'
        ? small
          ? 'mr-1'
          : 'mr-2'
        : small
        ? 'ml-1'
        : 'ml-2',
    size: small ? 18 : 24,
  })
}
