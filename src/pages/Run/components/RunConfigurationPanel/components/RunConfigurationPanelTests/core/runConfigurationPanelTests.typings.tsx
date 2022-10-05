import { Dispatch, SetStateAction } from 'react'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'

export interface IProps {
  tests: {
    name: string
    field: ConfigurationTestCase['field']
    predicate: TestPredicate
    target: string
  }[]
  setTests: Dispatch<
    SetStateAction<
      {
        name: string
        field: ConfigurationTestCase['field']
        predicate: TestPredicate
        target: string
      }[]
    >
  >
  areTestsEnabled: boolean
}
