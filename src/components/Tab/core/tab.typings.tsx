import { Icon } from 'react-feather'

export interface IProps {
  className?: string
  text: string
  selected?: boolean
  disabled?: boolean
  iconStart?: Icon
  link: string
}
