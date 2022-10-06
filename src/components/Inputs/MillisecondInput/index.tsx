import { ChangeEventHandler, FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { TestingProps } from '@/testing'
import { parseInteger } from '@/tools'

type Millisecond = `${number}ms`

interface Props extends TestingProps {
  className?: string
  id: string
  value: Millisecond
  onChange: (value: Millisecond) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}

export const MillisecondInput: FC<Props> = ({
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
