import { useReducer } from 'react'

import { ConfigurationTestCase } from '@/benchttp/configuration'
import { ExactlyOne } from '@/typing'

interface State {
  method: 'GET'
  url: string
  headers: Record<string, string[]>
  body: string
  requests: number
  concurrency: number
  interval: `${number}ms`
  requestTimeout: `${number}ms`
  globalTimeout: `${number}ms`
  tests: ConfigurationTestCase[]
  testsEnabled: boolean
}

export type IRunConfigurationInput = State

const initState = (): State => ({
  method: 'GET',
  url: 'http://example.com',
  headers: {},
  body: '',
  requests: 1000,
  concurrency: 10,
  interval: '0ms',
  requestTimeout: '1000ms',
  globalTimeout: '30000ms',
  tests: [],
  testsEnabled: false,
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
