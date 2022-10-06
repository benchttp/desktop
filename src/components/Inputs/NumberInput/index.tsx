import { FC } from 'react'

import { TextInput } from '@/components/Inputs'

import { handleChange } from './core/numberInput.helpers'
import { IProps } from './core/numberInput.typings'

export const NumberInput: FC<IProps> = ({
  className,
  id,
  value,
  onChange,
  label,
  disabled,
  placeholder,
}) => {
  return (
    <TextInput
      className={className}
      id={id}
      value={value === undefined ? '' : `${value}`}
      onChange={handleChange(onChange)}
      label={label}
      disabled={disabled}
      placeholder={placeholder}
      type="number"
    />
  )
}
