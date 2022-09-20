import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { createIcon, getClassNames } from './core/tab.helpers'
import { IProps } from './core/tab.typings'

export const Tab: FC<IProps> = ({
  text,
  selected = false,
  disabled = false,
  iconStart,
  link,
  className,
}) => {
  const classNames = getClassNames({ selected, disabled, className })

  return (
    <NavLink to={link} className={classNames.join(' ')}>
      {iconStart && createIcon({ icon: iconStart })}
      {text}
    </NavLink>
  )
}
