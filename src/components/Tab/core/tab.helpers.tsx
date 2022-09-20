import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './tab.module.scss'
import { IProps } from './tab.typings'

export const getClassNames = ({
  selected,
  disabled,
  className,
}: Pick<IProps, 'className'> &
  Pick<Required<IProps>, 'selected' | 'disabled'>) => {
  const classNames: string[] = [s['tab']]

  if (className) {
    classNames.push(className)
  }

  if (selected) {
    classNames.push(s['tab--selected'])
  }

  if (disabled) {
    classNames.push(s['tab--disabled'])
  }

  return classNames
}

export const createIcon = ({ icon }: { icon: Icon }): ReactNode => {
  return createElement(icon, {
    className: 'mr-1',
    size: 24,
  })
}
