import { FC } from 'react'

import { TestingProps } from '@/testing'

import { createIcon, getClassNames } from './internal/Button.helpers'
import { IProps } from './internal/Button.types'

export const Button: FC<IProps & TestingProps> = ({
  text,
  onClick,
  color = 'primary',
  style = 'full',
  small = false,
  iconStart,
  iconEnd,
  className,
  'data-testid': dataTestid,
  type = 'button',
}) => {
  const classNames = getClassNames({ color, style, small, className })

  return (
    <button
      onClick={onClick}
      className={classNames.join(' ')}
      data-testid={dataTestid}
      type={type}
    >
      {iconStart && createIcon({ icon: iconStart, small, position: 'start' })}
      {text}
      {iconEnd && createIcon({ icon: iconEnd, small, position: 'end' })}
    </button>
  )
}
