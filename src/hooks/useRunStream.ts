import { useRef } from 'react'

import { address } from '@/engine/spawn'
import { RunStreamer, RunStream } from '@/engine/stream'
import { reset, setError, setProgress, setReport } from '@/store/run'

import { useAppDispatch } from './useAppDispatch'

function matchPayloadAction(stream: RunStream) {
  switch (stream.kind) {
    case 'progress':
      return setProgress(stream.data)
    case 'report':
      return setReport(stream.data)
    case 'error':
      return setError(stream.data)
  }
  // @ts-expect-error unless non-exhaustive switch
  throw new Error(`Unknown stream kind: ${stream.kind}`)
}

export function useRunStream() {
  const dispatch = useAppDispatch()

  const stream = useRef(
    new RunStreamer(address, {
      onError: (err) => dispatch(setError(err.message)),
      onStream: (stream) => dispatch(matchPayloadAction(stream)),
    })
  )

  return {
    start: stream.current.start,
    reset: () => dispatch(reset()),
    stop: () => stream.current.cancel() && dispatch(setError('Run canceled')),
  }
}
