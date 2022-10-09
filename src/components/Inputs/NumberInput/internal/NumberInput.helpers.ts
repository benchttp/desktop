import { ChangeEventHandler } from 'react'

import { parseInteger } from '@/tools/parsers'

export const handleChangeAsNumber = (
  onChange: (value: number) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => onChange(getNumberValue(e.target.value))
}

export const getNumberValue = (value: string): number => {
  if (value === '') {
    return 0
  }
  return parseInteger(value)
}

export const getStringValue = (value: number | undefined): string => {
  if (value === undefined) {
    return ''
  }
  return `${value}`
}
