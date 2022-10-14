import { FC, ReactNode } from 'react'
import { Icon } from 'react-feather'

import { Typography } from '@/components'

import { createIcon, getClassName } from './internal/Tooltip.helpers'
import s from './internal/tooltip.module.scss'

export interface IProps {
  icon: Icon
  className?: string
  content: ReactNode
  width?: number
}

export const Tooltip: FC<IProps> = ({ icon, content, className, width }) => {
  return (
    <div className={getClassName(className)}>
      {icon && createIcon(icon)}
      <div
        style={{ width: width || 100 }}
        className={`${s['tooltip__popup']} p-2`}
      >
        <Typography size="small" color="grey-dark">
          {content}
        </Typography>
      </div>
    </div>
  )
}
