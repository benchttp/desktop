import { FC } from 'react'

import { Typography } from '@/components'

import { createIcon, getClassNames } from './internal/StatCard.helpers'
import { IProps } from './internal/StatCard.types'

export const StatCard: FC<IProps> = ({
  icon,
  iconColor,
  stat,
  label,
  className,
}) => {
  const classNames = getClassNames({ className, iconColor })
  return (
    <div className={classNames.join(' ')}>
      <div>
        <div>{icon && createIcon({ icon: icon })}</div>
        <div></div>
      </div>
      <div>
        <div>
          <Typography font="poppins" weight="bold" size="h2">
            {stat}
          </Typography>
        </div>
        <div>
          <Typography font="inter" size="base">
            {label}
          </Typography>
        </div>
      </div>
    </div>
  )
}
