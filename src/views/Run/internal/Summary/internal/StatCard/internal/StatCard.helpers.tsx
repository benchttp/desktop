import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './stat-card.module.scss'

export const getClassName = ({
  className,
}: {
  className: string | undefined
}): string => {
  const classNames: string[] = [s['stat-card'], 'f', 'f-ai-center', 'p-3']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const createIcon = ({ icon }: { icon: Icon }): ReactNode => {
  return createElement(icon, {
    size: 18,
  })
}
