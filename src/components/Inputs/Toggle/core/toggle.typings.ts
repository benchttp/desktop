import { ChangeEventHandler } from 'react'

export interface IProps {
  className?: string
  id: string
  value: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
}
