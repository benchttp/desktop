import { RunConfiguration } from '@/benchttp'
import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'

export interface IProps {
  onStart: (config: RunConfiguration) => void
}

export interface IRunConfigurationInput {
  method: string
  url: string
  headers: { key: string; values: string[] }[]
  body: string
  requests: number | undefined
  concurrency: number | undefined
  interval: `${number}ms` | undefined
  requestTimeout: `${number}ms` | undefined
  globalTimeout: `${number}ms` | undefined
  areTestsEnabled: boolean
  tests: {
    name: string
    field: ConfigurationTestCase['field']
    predicate: TestPredicate
    target: string
  }[]
}
