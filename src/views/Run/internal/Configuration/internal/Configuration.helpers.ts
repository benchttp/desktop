import { Dispatch, FormEvent, SetStateAction, useReducer } from 'react'

import {
  RunConfiguration,
  ConfigurationTestCase,
} from '@/benchttp/configuration'
import { ExactlyOne } from '@/typing'

import s from './configuration.module.scss'

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
  url: '',
  headers: {},
  body: '',
  requests: 0,
  concurrency: 0,
  interval: '0ms',
  requestTimeout: '0ms',
  globalTimeout: '0ms',
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
    configuration: state,
    /**
     * Sets the value of a field.
     */
    setConfiguration: (field: ConfigurationField) => {
      dispatch(['SET', field])
    },
    /**
     * Resets the configuration to its initial state.
     */
    resetConfiguration: () => {
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

export const handleSubmit = (onSubmit: () => void) => {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }
}

export const getActionClassName = (isScrolledBottom: boolean): string => {
  const classNames = [
    s['configuration__action'],
    'f',
    'f-ai-center',
    'f-jc-end',
    'p-4',
  ]

  if (isScrolledBottom) {
    classNames.push(s['configuration__action--bottom'])
  }

  return classNames.join(' ')
}

export const handleScroll = ({
  isScrolledBottom,
  setIsScrolledBottom,
}: {
  setIsScrolledBottom: Dispatch<SetStateAction<boolean>>
  isScrolledBottom: boolean
}): (() => void) => {
  return () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 2
    ) {
      setIsScrolledBottom(true)
    } else if (isScrolledBottom) {
      setIsScrolledBottom(false)
    }
  }
}
