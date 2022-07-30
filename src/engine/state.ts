import { StateMessage } from './messages'

export type State = {
  status: StateMessage['state'] | 'idle'
  progressData?: string
  runData?: Record<string, unknown>
  error?: string
}
