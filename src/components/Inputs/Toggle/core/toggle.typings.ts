import { ChangeEventHandler } from 'react'

export interface IProps {
  className?: string
  id: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
}
