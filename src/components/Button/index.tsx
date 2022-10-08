import { FC } from 'react'

import { TestingProps } from '@/testing'

import { createIcon, getClassNames } from './core/button.helpers'
import { IProps } from './core/button.typings'

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
}) => {
  const classNames = getClassNames({ color, style, small, className })

  return (
    <button
      onClick={onClick}
      className={classNames.join(' ')}
      data-testid={dataTestid}
    >
      {iconStart && createIcon({ icon: iconStart, small, position: 'start' })}
      {text}
      {iconEnd && createIcon({ icon: iconEnd, small, position: 'end' })}
    </button>
  )
}
