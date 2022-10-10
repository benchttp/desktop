import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'
import { NavLinkProps } from 'react-router-dom'

import s from './tab.module.scss'

export const getClassName = (
  disabled: boolean,
  className: string | undefined
): NavLinkProps['className'] => {
  return ({ isActive }) => {
    const classNames: string[] = [s['tab'], 'f', 'f-ai-center', 'pb-2']

    if (className) {
      classNames.push(className)
    }

    if (isActive) {
      classNames.push(s['tab--selected'])
    }

    if (disabled) {
      classNames.push(s['tab--disabled'])
    }

    return classNames.join(' ')
  }
}

export const createIcon = (icon: Icon): ReactNode => {
  return createElement(icon, {
    className: 'mr-1',
    size: 24,
  })
}
