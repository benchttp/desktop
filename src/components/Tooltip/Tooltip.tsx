import { FC } from 'react'
import { Icon } from 'react-feather'

import { Typography } from '@/components'

import { createIcon, getClassName } from './internal/Tooltip.helpers'

export interface IProps {
  icon: Icon
  className?: string
  text: string
}

export const Tooltip: FC<IProps> = ({ icon, text, className }) => {
  return (
    <div className={getClassName(className)}>
      <span>
        <Typography font="poppins">{text}</Typography>
      </span>
      {icon && createIcon({ icon: icon })}
    </div>
  )
}
