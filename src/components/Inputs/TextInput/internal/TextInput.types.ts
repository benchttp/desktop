import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

export interface IProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  label?: string
  tooltipContent?: string
  disabled?: boolean
  placeholder?: string
  type?: HTMLInputTypeAttribute
  invalid?: boolean
  required?: boolean
}
