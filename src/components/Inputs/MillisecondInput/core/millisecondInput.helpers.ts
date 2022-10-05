import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'

import { parseInteger } from '@/tools'

import { IProps } from './millisecondInput.typings'

export const handleInternalChange = ({
  setInternalValue,
}: {
  setInternalValue: Dispatch<SetStateAction<string>>
}): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    setInternalValue(e.target.value)
  }
}

export const handleChange = ({
  internalValue,
  onChange,
}: Pick<IProps, 'onChange'> & {
  internalValue: string
}) => {
  if (internalValue === '') {
    onChange(undefined)
    return
  }

  onChange(`${parseInteger(internalValue)}ms`)
}

export const getInternalValue = ({ value }: Pick<IProps, 'value'>): string => {
  if (value === undefined) {
    return ''
  }

  return value.slice(0, -2)
}
