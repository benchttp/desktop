import { parseInteger } from '@/tools'

export const getNumberValue = (value: string): number => {
  if (value === '') {
    return 0
  }

  return parseInteger(value)
}
