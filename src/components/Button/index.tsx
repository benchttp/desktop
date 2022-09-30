import { FC } from 'react'

import { createIcon, getClassNames } from './core/button.helpers'
import { IProps } from './core/button.typings'

export const Button: FC<IProps> = ({
  text,
  onClick,
  color = 'primary',
  style = 'full',
  small = false,
  iconStart,
  iconEnd,
  className,
}) => {
  const classNames = getClassNames({ color, style, small, className })

  return (
    <button onClick={onClick} className={classNames.join(' ')}>
      {iconStart && createIcon({ icon: iconStart, small, position: 'start' })}
      {text}
      {iconEnd && createIcon({ icon: iconEnd, small, position: 'end' })}
    </button>
  )
}
