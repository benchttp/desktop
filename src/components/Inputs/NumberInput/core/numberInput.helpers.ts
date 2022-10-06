import { ChangeEventHandler } from 'react'

import { parseInteger } from '@/tools'

import { IProps } from './numberInput.typings'

export const handleChange = (
  onChange: IProps['onChange']
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    if (e.target.value === '') {
      onChange(undefined)
      return
    }

    const numberValue = parseInteger(e.target.value)

    onChange(numberValue)
  }
}
