import { useRef, useReducer } from 'react'

import { RunConfiguration, RunProgress, RunReport } from '@/benchttp'
import { address } from '@/engine/spawn'
import { RunStreamer, RunStream } from '@/engine/stream'

interface State {
  progress: RunProgress | null
  report: RunReport | null
  error: string
}

const initState = (): State => ({
  progress: null,
  report: null,
  error: '',
})

type Msg = ['STREAM', RunStream] | ['ERROR', string] | ['RESET']

function reducer(state: State, [type, data]: Msg) {
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
     * `start` calls `RunStreamer.start` and triggers the update of the state.
     * If the streamer has already run to completion, it will reset the state and start again.
     * If the streamer is already running, it will cancel the run,
     * reset the state and start again.
     */
    start: (config: RunConfiguration) => {
      if (state.progress !== null) {
        stream.current.cancel()
      }
      if (state.report !== null || state.error !== '') {
        dispatch(['RESET'])
      }
      stream.current.start(config)
    },
    stop: () => stream.current.cancel() && dispatch(['ERROR', 'Run canceled']),
  }
}
