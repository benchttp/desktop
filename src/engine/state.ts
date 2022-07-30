import { StateMessage } from './messages'

/**
 * Represents the state of the call to the engine API.
 * EngineCall is continuously updated by streaming data
 * from the engine. To persist a snapshot of the state,
 * you must store the data yourself.
 */
export type EngineCall = {
  status: StateMessage['state'] | 'idle'
  progress?: string
  result?: Record<string, unknown>
  error?: string
}
