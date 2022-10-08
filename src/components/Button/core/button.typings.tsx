import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

export interface IProps {
  className?: string
  text: string
  onClick?: MouseEventHandler | never
  color?: 'primary' | 'white'
  style?: 'full' | 'outlined'
  small?: boolean
  iconStart?: Icon
  iconEnd?: Icon
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export interface IPropsSubmit extends IProps {
  type: 'submit'
  onClick?: never
}

export interface IPropsButton extends IProps {
  type?: 'button' | 'reset'
  onClick: MouseEventHandler
}
