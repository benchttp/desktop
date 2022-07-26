import { useRef, useReducer } from 'react'

import { RunConfiguration, RunProgress, RunReport, RunError } from '@/benchttp'
import { address } from '@/engine/spawn'
import { RunStreamer, RunStream } from '@/engine/stream'

// Re-expose the internal hook.
export { useConfiguration } from './Configuration'

export interface RunState {
  progress: RunProgress | null
  report: RunReport | null
  error: RunError | null
  /**
   * Produced when the application encounters an internal error
   * while streaming. This is not a server error as opposed to `RunState.error`.
   */
  appError: Error | null
}

const initState = (): RunState => ({
  progress: null,
  report: null,
  error: null,
  appError: null,
})

type Mutation = ['STREAM', RunStream] | ['ERROR', Error] | ['RESET']

function reducer(state: RunState, [type, data]: Mutation) {
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
      return { ...state, appError: data }
    case 'RESET':
      return initState()
  }
  //@ts-expect-error unless non-exhaustive switch
  throw new Error(`Unknown action type: ${type.toString()}`)
}

const getNewRunStreamer = (dispatch: (v: Mutation) => void) => {
  return new RunStreamer(address, {
    onError: (err) => dispatch(['ERROR', err]),
    onStream: (stream) => dispatch(['STREAM', stream]),
  })
}

export function useRunStream() {
  const [state, dispatch] = useReducer(reducer, initState())

  const stream = useRef(getNewRunStreamer(dispatch))

  return {
    ...state,
    /**
     * Starts a Run stream, updating `progress` until `report` or `error`
     * is received. If any of these values were already set by a previous
     * call to start, they will be reset and the run will start over.
     */
    start: (config: RunConfiguration) => {
      // HACK the stream may be in a corrupted state:
      // "ReadableStreamDefaultController is not in a state where it can be closed". See issue #13.
      // This error will be caught in `appError`. Reset here for next run if it happens.
      if (state.appError !== null) {
        stream.current = getNewRunStreamer(dispatch)
      }

      if (isStarted(state)) {
        stream.current.cancel()
        dispatch(['RESET'])
      }
      stream.current.start(config)
    },
    stop: () =>
      stream.current.cancel() && dispatch(['ERROR', new Error('Run canceled')]),
  }
}

const isStarted = (state: RunState): boolean =>
  state.progress !== null || isFinished(state)

const isFinished = (state: RunState): boolean =>
  state.error !== null || state.report !== null

export const isTestResultsDisabled = (state: RunState) => {
  return !isStarted(state)
}

export const isSummaryDisabled = (state: RunState) => {
  return !isFinished(state)
}
