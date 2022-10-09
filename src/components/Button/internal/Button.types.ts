import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

interface IPropsBase {
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

export interface IPropsSubmit extends IPropsBase {
  type: 'submit'
  onClick?: never
}

export interface IPropsButton extends IPropsBase {
  type?: 'button' | 'reset'
  onClick: MouseEventHandler
}

export type IProps = IPropsButton | IPropsSubmit
