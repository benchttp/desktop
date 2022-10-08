import { ChangeEventHandler } from 'react'

import { parseInteger } from '@/tools'

import { Millisecond } from './Millisecond.types'

export const handleChangeAsDuration = (
  onChange: (value: Millisecond) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => onChange(getDurationValue(e.target.value))
}

export const getDurationValue = (value: string): Millisecond => {
  if (value === '') {
    return '0ms'
  }
  return value === '' ? '0ms' : `${parseInteger(value)}ms`
}

export const getStringValue = (value: Millisecond | undefined): string => {
  if (value === undefined) {
    return ''
  }
  return value.slice(0, -2)
}
