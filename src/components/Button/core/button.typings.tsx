import { MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

export interface IProps {
  className?: string
  text: string
  onClick: MouseEventHandler
  color?: 'primary' | 'white'
  style?: 'full' | 'outlined'
  small?: boolean
  iconStart?: Icon
  iconEnd?: Icon
}
