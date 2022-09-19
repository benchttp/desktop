import { Icon } from 'react-feather'

export interface IProps {
  className?: string
  text: string
  color: 'primary' | 'white' | 'grey-light'
  iconStart?: Icon
  link: string
}
