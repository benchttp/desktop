import { ChangeEventHandler, FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { parseInteger } from '@/tools'

type Millisecond = `${number}ms`

interface Props {
  className?: string
  id: string
  value: Millisecond | undefined
  onChange: (value: Millisecond | undefined) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}

export const MillisecondInput: FC<Props> = ({
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
    onChange={handleChangeAsDuration(onChange)}
    label={`${label} (ms)`}
    disabled={disabled}
    placeholder={placeholder}
    type="number"
  />
)

const handleChangeAsDuration = (
  onChange: Props['onChange']
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => onChange(getDurationValue(e.target.value))
}

const getDurationValue = (value: string): Millisecond => {
  if (value === '') {
    return '0ms'
  }
  return value === '' ? '0ms' : `${parseInteger(value)}ms`
}

const getStringValue = (value: Millisecond | undefined): string => {
  if (value === undefined) {
    return ''
  }
  return value.slice(0, -2)
}
