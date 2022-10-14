import { FC, ReactNode } from 'react'
import { Icon } from 'react-feather'

import { Typography } from '@/components'

import { createIcon, getClassName } from './internal/Tooltip.helpers'
import s from './internal/tooltip.module.scss'

export interface IProps {
  children: ReactNode
  icon: Icon
  className?: string
  width?: number
}

export const Tooltip: FC<IProps> = ({ children, icon, className, width }) => {
  return (
    <div className={getClassName(className)}>
      <div
        style={{ width: width || 100 }}
        className={`${s['tooltip__popup']} p-2`}
      >
        <Typography size="small" color="grey-dark">
          {children}
        </Typography>
      </div>
      {icon && createIcon(icon)}
    </div>
  )
}
