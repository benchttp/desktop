import { FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { TestingProps } from '@/testing'

import {
  getStringValue,
  handleChangeAsDuration,
} from './internal/Millisecond.helper'
import { Millisecond } from './internal/Millisecond.typing'

interface IProps extends TestingProps {
  className?: string
  id: string
  value: Millisecond
  onChange: (value: Millisecond) => void
  label?: string
  disabled?: boolean
  placeholder?: string
  invalid?: boolean
}

export const MillisecondInput: FC<IProps> = ({
  value,
  onChange,
  label,
  ...props
}) => (
  <TextInput
    value={getStringValue(value)}
    onChange={handleChangeAsDuration(onChange)}
    label={`${label} (ms)`}
    type="number"
    {...props}
  />
)
