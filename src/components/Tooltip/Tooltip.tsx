import { FC } from 'react'

import { Typography } from '@/components'

import { createIcon, getClassNames } from './internal/Tooltip.helpers'
import { IProps } from './internal/Tooltip.types'

export const Tooltip: FC<IProps> = ({ icon, text, className }) => {
  const classNames = getClassNames({ className })
  return (
    <div className={classNames.join(' ')}>
      <span>
        <Typography font="poppins">{text}</Typography>
      </span>
      {icon && createIcon({ icon: icon })}
    </div>
  )
}
