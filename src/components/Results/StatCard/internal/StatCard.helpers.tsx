import { createElement, ReactNode } from 'react'
import { Icon } from 'react-feather'

import s from './statCard.module.scss'
import { IProps } from './StatCard.types'

export const getClassNames = ({
  className,
  iconColor,
  isError,
}: Pick<IProps, 'className'> &
  Pick<Required<IProps>, 'iconColor'> &
  Pick<Required<IProps>, 'isError'>) => {
  const classNames: string[] = [
    s['statCard'],
    'f',
    'f-direction-row',
    'f-ai-center',
    'p-3',
  ]

  if (className) {
    classNames.push(className)
  }

  return classNames
}

export const createIcon = ({ icon }: { icon: Icon }): ReactNode => {
  return createElement(icon, {
    className: 'mr-1',
    size: 24,
    style: {},
  })
}
