import { ChangeEventHandler } from 'react'

export interface IProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: { value: string; display: string; disabled?: boolean }[]
  label?: string
  disabled?: boolean
}
