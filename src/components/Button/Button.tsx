import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

import { TestingProps } from '@/testing'

import { createIcon, getClassNames } from './internal/Button.helpers'
import { IButtonColor, IButtonStyle } from './internal/Button.types'

interface IPropsBase {
  className?: string
  text: string
  onClick?: MouseEventHandler | never
  color?: IButtonColor
  style?: IButtonStyle
  small?: boolean
  iconStart?: Icon
  iconEnd?: Icon
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
}

interface IPropsSubmit extends IPropsBase {
  type: 'submit'
  onClick?: never
}

interface IPropsButton extends IPropsBase {
  type?: 'button' | 'reset'
  onClick: MouseEventHandler
}

type IProps = IPropsButton | IPropsSubmit

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
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={getClassNames({ color, style, small, className })}
      data-testid={dataTestid}
      type={type}
      disabled={disabled}
    >
      {iconStart && createIcon({ icon: iconStart, small, position: 'start' })}
      {text}
      {iconEnd && createIcon({ icon: iconEnd, small, position: 'end' })}
    </button>
  )
}
