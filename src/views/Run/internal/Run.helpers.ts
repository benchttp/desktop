import { useRef, useReducer } from 'react'

import { RunConfiguration, RunProgress, RunReport } from '@/benchttp'
import { address } from '@/engine/spawn'
import { RunStreamer, RunStream } from '@/engine/stream'

// Re-expose the internal hook.
export { useConfiguration } from './Configuration'

interface RunState {
  progress: RunProgress | null
  report: RunReport | null
  error: string
}

const initState = (): RunState => ({
  progress: null,
  report: null,
  error: '',
})

type Msg = ['STREAM', RunStream] | ['ERROR', string] | ['RESET']

function reducer(state: RunState, [type, data]: Msg) {
  switch (type) {
    case 'STREAM':
      switch (data.kind) {
        case 'progress':
          return { ...state, progress: data.data }
        case 'report':
          return { ...state, report: data.data }
        case 'error':
          return { ...state, error: data.data }
      }
      //@ts-expect-error unless non exhaustive switch
      throw new Error(`Unknown action type: ${type}.${data.kind}`)
    case 'ERROR':
      return { ...state, error: data }
    case 'RESET':
      return initState()
  }
  //@ts-expect-error unless non-exhaustive switch
  throw new Error(`Unknown action type: ${type.toString()}`)
}

export function useRunStream() {
  const [state, dispatch] = useReducer(reducer, initState())

  const stream = useRef(
    new RunStreamer(address, {
      onError: (err) => dispatch(['ERROR', err.message]),
      onStream: (stream) => dispatch(['STREAM', stream]),
    })
  )

  return {
    ...state,
    /**
     * Starts a Run stream, updating `progress` until `report` or `error`
     * is received. If any of these values were already set by a previous
     * call to start, they will be reset and the run will start over.
     */
    start: (config: RunConfiguration) => {
      if (isNonNull(state)) {
        stream.current.cancel()
        dispatch(['RESET'])
      }
      stream.current.start(config)
    },
    stop: () => stream.current.cancel() && dispatch(['ERROR', 'Run canceled']),
  }
}

const isNonNull = (state: RunState): boolean =>
  state.progress !== null || state.report !== null || state.error !== ''