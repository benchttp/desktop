import { FC } from 'react'

import { TextInput } from '@/components/Inputs'

import {
  getDurationValue,
  getStringValue,
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
}) => (
  <TextInput
    className={className}
    id={id}
    value={getStringValue(value)}
    onChange={(e) => onChange(getDurationValue(e.target.value))}
    label={`${label} (ms)`}
    disabled={disabled}
    placeholder={placeholder}
    type="number"
  />
)
