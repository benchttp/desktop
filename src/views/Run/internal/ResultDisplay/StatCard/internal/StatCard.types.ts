import { Icon } from 'react-feather'

export interface IProps {
  className?: string
  icon: Icon
  iconColor: 'blue' | 'primary' | 'get' | 'base-white' | 'purple' | 'orange'
  stat: string
  label: string
}
