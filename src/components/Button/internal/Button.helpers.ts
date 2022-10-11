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

const getIconClassName = ({
  small,
  position,
}: {
  small: boolean
  position: 'start' | 'end'
}): string => {
  const classNames: string[] = [s['button__icon']]

  if (position === 'start') {
    if (small) {
      classNames.push('mr-1')
    } else {
      classNames.push('mr-2')
    }
  } else {
    if (small) {
      classNames.push('ml-1')
    } else {
      classNames.push('ml-2')
    }
  }

  return classNames.join(' ')
}

export const createIcon = ({
  icon,
  small,
  position,
}: {
  icon: Icon
  small: boolean
  position: 'start' | 'end'
}): ReactNode => {
  return createElement(icon, {
    className: getIconClassName({ small, position }),
    size: small ? 18 : 24,
  })
}
