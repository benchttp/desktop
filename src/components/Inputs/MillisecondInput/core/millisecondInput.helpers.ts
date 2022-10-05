import { parseInteger } from '@/tools'

import { IProps } from './millisecondInput.typings'

export const getDurationValue = (value: string): `${number}ms` => {
  if (value === '') {
    return '0ms'
  }

  return `${parseInteger(value)}ms`
}

export const getStringValue = (value: IProps['value']): string => {
  if (value === undefined) {
    return ''
  }

  return value.slice(0, -2)
}
