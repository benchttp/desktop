import { createElement, FC } from 'react'

import { getClassNames } from './core/button.helpers'
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
      <>
        {iconStart &&
          createElement(iconStart, {
            className: small ? 'mr-1' : 'mr-2',
            size: small ? 18 : 24,
          })}
        {text}
        {iconEnd &&
          createElement(iconEnd, {
            className: small ? 'ml-1' : 'ml-2',
            size: small ? 18 : 24,
          })}
      </>
    </button>
  )
}
