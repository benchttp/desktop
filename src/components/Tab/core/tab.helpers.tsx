import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './tab.module.scss'
import { IProps } from './tab.typings'

export const getClassNames = ({
  color,
  className,
}: Pick<IProps, 'className'> & Pick<Required<IProps>, 'color'>) => {
  const classNames: string[] = [
    s['tab'],
    s[`button--${color}`],
    'f',
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
    className: 'ml-2',
    size: 24,
  })
}
