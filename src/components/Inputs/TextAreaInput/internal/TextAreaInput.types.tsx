import { ChangeEventHandler } from 'react'

export interface IProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  label?: string
  disabled?: boolean
  placeholder?: string
  rows?: number
}
