import { ISelectInputProps } from '@/components/Inputs/SelectInput'

export const FIELD_OPTIONS: ISelectInputProps['options'] = [
  { value: 'MEAN', display: 'Mean response time' },
  { value: 'MAX', display: 'Maximum response time' },
  { value: 'MIN', display: 'Minimum response time' },
  { value: 'FAILURE_COUNT', display: 'Number of requests that failed' },
  { value: 'SUCCESS_COUNT', display: 'Number of successfull requests' },
  { value: 'TOTAL_COUNT', display: 'Minimum response time' },
]

export const PREDICATE_OPTIONS: ISelectInputProps['options'] = [
  { value: 'EQ', display: 'Equals' },
  { value: 'NEQ', display: 'Non equals' },
  { value: 'GT', display: 'Greater than' },
  { value: 'GTE', display: 'Greater than or equals' },
  { value: 'LT', display: 'Lower than' },
  { value: 'LTE', display: 'Lower than or equals' },
]
