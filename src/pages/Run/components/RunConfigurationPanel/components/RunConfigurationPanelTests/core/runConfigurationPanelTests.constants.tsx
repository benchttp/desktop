import { ISelectInputProps } from '@/components/Inputs/SelectInput'

export const FIELD_OPTIONS: ISelectInputProps['options'] = [
  { value: 'ResponseTimes.Mean', display: 'Mean response time' },
  { value: 'ResponseTimes.Max', display: 'Maximum response time' },
  { value: 'ResponseTimes.Min', display: 'Minimum response time' },
  { value: 'RequestFailureCount', display: 'Number of requests that failed' },
  { value: 'RequestSuccessCount', display: 'Number of successfull requests' },
]

export const PREDICATE_OPTIONS: ISelectInputProps['options'] = [
  { value: 'EQ', display: 'Equals' },
  { value: 'NEQ', display: 'Non equals' },
  { value: 'GT', display: 'Greater than' },
  { value: 'GTE', display: 'Greater than or equals' },
  { value: 'LT', display: 'Lower than' },
  { value: 'LTE', display: 'Lower than or equals' },
]
