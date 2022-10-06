import { FC } from 'react'

import { Typography } from '@/components'

import { createIcon, getClassNames } from './core/tooltip.helpers'
import { IProps } from './core/tooltip.typings'

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
