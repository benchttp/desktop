import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'
import { NavLinkProps } from 'react-router-dom'

import s from './tab.module.scss'
import { IProps } from './tab.typings'

export const getClassName = ({
  disabled,
  className,
}: Pick<IProps, 'className'> &
  Pick<Required<IProps>, 'disabled'>): NavLinkProps['className'] => {
  return ({ isActive }) => {
    const classNames: string[] = [s['tab'], 'f', 'f-ai-center']

    if (className) {
      classNames.push(className)
    }

    if (isActive) {
      classNames.push(s['tab--selected'])
    }

    if (disabled) {
      classNames.push(s['tab--disabled'], s['tab--no-hover'])
    }

    return classNames.join(' ')
  }
}

export const createIcon = ({ icon }: { icon: Icon }): ReactNode => {
  return createElement(icon, {
    className: 'mr-1',
    size: 24,
  })
}
