import { Dispatch, SetStateAction } from 'react'

import { MetricField } from '@/benchttp/metrics'
import { TestPredicate } from '@/benchttp/tests'

export interface IProps {
  tests: {
    name: string
    field: MetricField['id']
    predicate: TestPredicate
    target: string
  }[]
  setTests: Dispatch<
    SetStateAction<
      {
        name: string
        field: MetricField['id']
        predicate: TestPredicate
        target: string
      }[]
    >
  >
}
