import { FC, useEffect, useState } from 'react'

import { TextInput } from '@/components/Inputs'

import {
  getInternalValue,
  handleChange,
  handleInternalChange,
} from './core/millisecondInput.helpers'
import { IProps } from './core/millisecondInput.typings'

export const MillisecondInput: FC<IProps> = ({
  className,
  id,
  value,
  onChange,
  label,
  disabled,
  placeholder,
}) => {
  const [internalValue, setInternalValue] = useState(
    getInternalValue({ value })
  )

  useEffect(() => {
    handleChange({ internalValue, onChange })
  }, [internalValue, onChange])

  return (
    <TextInput
      className={className}
      id={id}
      value={internalValue === undefined ? '' : `${internalValue}`}
      onChange={handleInternalChange({ setInternalValue })}
      label={`${label} (ms)`}
      disabled={disabled}
      placeholder={placeholder}
      type="number"
    />
  )
}
