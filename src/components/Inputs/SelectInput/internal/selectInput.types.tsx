import { ChangeEventHandler } from 'react'

import { TestingProps } from '@/testing'

export interface IProps extends TestingProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: { value: string; display: string; disabled?: boolean }[]
  label?: string
  disabled?: boolean
}
