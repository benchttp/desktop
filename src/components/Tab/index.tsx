import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Typography } from '@/components'

import { createIcon, getClassName } from './core/tab.helpers'
import { IProps } from './core/tab.typings'

export const Tab: FC<IProps> = ({
  text,
  disabled = false,
  iconStart,
  link,
  className,
}) => {
  return (
    <NavLink to={link} className={getClassName({ disabled, className })}>
      {iconStart && createIcon({ icon: iconStart })}
      <Typography element="span" font="poppins" weight="medium">
        {text}
      </Typography>
    </NavLink>
  )
}
