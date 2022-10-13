import { FC } from 'react'
import { Icon } from 'react-feather'

import { Typography } from '@/components'

import s from './internal/stat-card.module.scss'
import { createIcon, getClassName } from './internal/StatCard.helpers'
import { IStatCardColor } from './internal/StatCard.types'

interface IProps {
  className?: string
  icon: Icon
  color: IStatCardColor
  stat: string
  label: string
}

export const StatCard: FC<IProps> = ({
  icon,
  color,
  stat,
  label,
  className,
}) => {
  return (
    <div className={getClassName({ className })}>
      <div
        className={`${s['stat-card__icon']} ${
          s[`stat-card__icon--${color}`]
        } f f-center mr-2`}
      >
        {icon && createIcon({ icon: icon })}
      </div>
      <div>
        <Typography font="poppins" size="h2" weight="bold">
          {stat}
        </Typography>
        <Typography>{label}</Typography>
      </div>
    </div>
  )
}
