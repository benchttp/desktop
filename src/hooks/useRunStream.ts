import { useRef, useReducer } from 'react'

import { RunProgress, RunReport } from '@/benchttp'
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

export function useRunStream(port: number) {
  const [state, dispatch] = useReducer(reducer, initState())

  const stream = useRef(
    new RunStreamer(port, {
      onError: (err) => dispatch(['ERROR', err.message]),
      onStream: (stream) => dispatch(['STREAM', stream]),
    })
  )

  return {
    ...state,
    start: stream.current.start,
    reset: () => dispatch(['RESET']),
    stop: () => stream.current.cancel() && dispatch(['ERROR', 'Run canceled']),
  }
}
