import { FC } from 'react'
import { Icon } from 'react-feather'
import { NavLink } from 'react-router-dom'

import { Typography } from '@/components'

import { createIcon, getClassName } from './internal/Tab.helpers'

export interface IProps {
  className?: string
  text: string
  disabled?: boolean
  iconStart?: Icon
  link: string
}

export const Tab: FC<IProps> = ({
  text,
  disabled = false,
  iconStart,
  link,
  className,
}) => {
  return (
    <NavLink to={link} className={getClassName({ disabled, className })}>
      {iconStart && createIcon(iconStart)}
      <Typography element="span" font="poppins" weight="medium">
        {text}
      </Typography>
    </NavLink>
  )
}
