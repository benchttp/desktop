import { useReducer } from 'react'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { TestPredicate } from '@/benchttp/tests'
import { ExactlyOne } from '@/typing'

interface State {
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

export type IRunConfigurationInput = State

const initState = (): State => ({
  method: 'GET',
  url: 'http://example.com',
  headers: [],
  body: '',
  requests: 1000,
  concurrency: 10,
  interval: '0ms',
  requestTimeout: '1000ms',
  globalTimeout: '30000ms',
  areTestsEnabled: true,
  tests: [],
})

type Field = ExactlyOne<State>

type Mutation = ['SET', Field] | ['RESET']

function reducer(state: State, [type, data]: Mutation): State {
  switch (type) {
    case 'SET':
      return { ...state, ...data }
    case 'RESET':
      return initState()
  }
  //@ts-expect-error unless non-exhaustive switch
  throw new Error(`Unknown action type: ${type.toString()}`)
}

export function useConfigurationForm() {
  const [state, dispatch] = useReducer(reducer, initState())

  return {
    form: state,
    /**
     * Sets the value of a form field.
     */
    set: (field: Field) => {
      dispatch(['SET', field])
    },
    /**
     * Resets the form to its initial state.
     */
    reset: () => {
      dispatch(['RESET'])
    },
  }
}
