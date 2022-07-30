import { isObject, typeGuardProperty } from '../utils/guards'

type ActionMessage<T extends 'run' | 'cancel'> = {
  action: T
}

export type RunMessage = ActionMessage<'run'> & {
  data: Record<string, unknown>
}

export type CancelMessage = ActionMessage<'cancel'>

export function serializeActionMessage(
  message: RunMessage | CancelMessage
): string {
  switch (message.action) {
    case 'run':
      return JSON.stringify({
        action: message.action,
        data: message.data,
      })
    case 'cancel':
      return JSON.stringify({ action: message.action })
  }
}

export type StateMessage =
  | {
      state: 'done'
      data: Record<string, unknown>
    }
  | {
      state: 'progress'
      data: string
    }
  | {
      state: 'error'
      error: string
    }

export const isStateMessage = (message: unknown): message is StateMessage => {
  const isValidEvent = typeGuardProperty(
    'state',
    (val: unknown): val is 'done' | 'progress' | 'error' =>
      val === 'done' || val === 'progress' || val === 'error'
  )

  return isObject(message) && isValidEvent(message)
}
