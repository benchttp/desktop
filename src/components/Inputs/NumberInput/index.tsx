import { ChangeEventHandler, FC } from 'react'

import { TextInput } from '@/components/Inputs'
import { TestingProps } from '@/testing'
import { parseInteger } from '@/tools'

interface Props extends TestingProps {
  className?: string
  id: string
  value: number | undefined
  onChange: (value: number | undefined) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}

export const NumberInput: FC<Props> = ({ value, onChange, ...props }) => (
  <TextInput
    value={getStringValue(value)}
    onChange={handleChangeAsNumber(onChange)}
    type="number"
    {...props}
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
