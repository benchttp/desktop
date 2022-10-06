import { FC } from 'react'

import { TextInput } from '@/components/Inputs/TextInput'
import { TestingProps } from '@/testing'

interface IProps extends TestingProps {
  className?: string
  id: string
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}

export const URLInput: FC<IProps> = ({ value, onChange, ...props }) => (
  <TextInput
    value={value}
    onChange={(e) => onChange(e.target.value)}
    type="text"
    invalid={!isValidURL(value)}
    {...props}
  />
)

const isValidURL = (value: string): boolean => {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return false
  }
  return (
    url.protocol === 'http:' ||
    url.protocol === 'https:' ||
    url.protocol === 'localhost:'
  )
}
