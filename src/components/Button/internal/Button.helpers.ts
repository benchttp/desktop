import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './button.module.scss'
import { IProps } from './Button.types'

export const getClassNames = ({
  color,
  style,
  small,
  className,
}: Pick<IProps, 'className'> &
  Pick<Required<IProps>, 'color' | 'style' | 'small'>) => {
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

  return classNames
}

export const createIcon = ({
  icon,
  small,
  position,
}: { icon: Icon; position: 'start' | 'end' } & Pick<
  Required<IProps>,
  'small'
>): ReactNode => {
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
