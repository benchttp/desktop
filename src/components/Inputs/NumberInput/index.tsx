import { ChangeEventHandler, FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { parseInteger } from '@/tools'

interface Props {
  className?: string
  id: string
  value: number | undefined
  onChange: (value: number | undefined) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}

export const NumberInput: FC<Props> = ({
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
    onChange={handleChangeAsNumber(onChange)}
    label={label}
    disabled={disabled}
    placeholder={placeholder}
    type="number"
  />
)

const handleChangeAsNumber = (
  onChange: Props['onChange']
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => onChange(getNumberValue(e.target.value))
}

const getNumberValue = (value: string): number => {
  if (value === '') {
    return 0
  }
  return parseInteger(value)
}

const getStringValue = (value: number | undefined): string => {
  if (value === undefined) {
    return ''
  }
  return `${value}`
}
