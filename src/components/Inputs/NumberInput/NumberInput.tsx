import { FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { TestingProps } from '@/testing'

import {
  getStringValue,
  handleChangeAsNumber,
} from './internal/NumberInput.helpers'

interface IProps extends TestingProps {
  className?: string
  id: string
  value: number
  onChange: (value: number) => void
  label?: string
  disabled?: boolean
  placeholder?: string
  invalid?: boolean
}

export const NumberInput: FC<IProps> = ({ value, onChange, ...props }) => (
  <TextInput
    value={getStringValue(value)}
    onChange={handleChangeAsNumber(onChange)}
    type="number"
    {...props}
  />
)
