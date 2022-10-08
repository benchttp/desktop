import { useReducer } from 'react'

import {
  RunConfiguration,
  ConfigurationTestCase,
} from '@/benchttp/configuration'
import { ExactlyOne } from '@/typing'

export interface ConfigurationState {
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

const initState = (): ConfigurationState => ({
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

export type ConfigurationField = ExactlyOne<ConfigurationState>

type Mutation = ['SET', ConfigurationField] | ['RESET']

function reducer(
  state: ConfigurationState,
  [type, data]: Mutation
): ConfigurationState {
  switch (type) {
    case 'SET':
      return { ...state, ...data }
    case 'RESET':
      return initState()
  }
  //@ts-expect-error unless non-exhaustive switch
  throw new Error(`Unknown action type: ${type.toString()}`)
}

export function useConfiguration() {
  const [state, dispatch] = useReducer(reducer, initState())

  return {
    state,
    /**
     * Sets the value of a field.
     */
    setState: (field: ConfigurationField) => {
      dispatch(['SET', field])
    },
    /**
     * Resets the configuration to its initial state.
     */
    resetState: () => {
      dispatch(['RESET'])
    },
    /**
     * Returns a copy of the configuration as a `RunConfiguration`
     * usable in `benchttp` context.
     */
    getRunConfiguration: (): RunConfiguration => {
      return {
        request: {
          method: state.method,
          url: state.url,
          header: state.headers,
          body:
            state.body !== ''
              ? { type: 'raw', content: state.body }
              : undefined,
        },
        runner: {
          requests: state.requests,
          concurrency: state.concurrency,
          interval: state.interval,
          requestTimeout: state.requestTimeout,
          globalTimeout: state.globalTimeout,
        },
        tests: state.testsEnabled ? state.tests : undefined,
      }
    },
  }
}
