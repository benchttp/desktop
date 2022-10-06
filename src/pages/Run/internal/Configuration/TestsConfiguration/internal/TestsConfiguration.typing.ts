import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'

export interface IProps {
  tests: {
    name: string
    field: ConfigurationTestCase['field']
    predicate: TestPredicate
    target: string
  }[]
  setTests: (
    tests: {
      name: string
      field: ConfigurationTestCase['field']
      predicate: TestPredicate
      target: string
    }[]
  ) => void
  areTestsEnabled: boolean
}
