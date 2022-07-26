import { FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { TestingProps } from '@/testing'

import { isValidURL } from './internal/URLInput.helpers'

interface IProps extends TestingProps {
  className?: string
  id: string
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

export const URLInput: FC<IProps> = ({ value, onChange, ...props }) => (
  <TextInput
    value={value}
    onChange={(e) => onChange(e.target.value)}
    type="url"
    invalid={!isValidURL(value)}
    {...props}
  />
)
