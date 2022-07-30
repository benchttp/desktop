import { createApi } from '@reduxjs/toolkit/query/react'

import {
  CancelMessage,
  isStateMessage,
  serializeActionMessage,
  RunMessage,
} from './messages'
import { getWebSocket } from './socket'
import { State } from './state'

export const api = createApi({
  // The function that will make the final query. It is used by each endpoint
  // declared with the method `query` (i.e. sendMessage) and will be called
  // with the return value of the endpoint `query()` method.
  //
  // We use `baseQuery` in order to send a message using the WebSocket connection.
  // The return value is irrelevant because we do not expect response data
  // from the WebSocket server on send. Thus the return value is an empty object.
  async baseQuery(message: CancelMessage | RunMessage) {
    const ws = await getWebSocket()
    ws.conn.send(serializeActionMessage(message))
    return { data: {} }
  },

  endpoints: (build) => ({
    startRun: build.mutation<void, Omit<RunMessage, 'action'>>({
      query: ({ data }): RunMessage => {
        return { action: 'run', data }
      },
    }),

    cancelRun: build.mutation<void, void>({
      query: (): CancelMessage => {
        return { action: 'cancel' }
      },
    }),

    // Streams incoming messages from the WebSocket connection into cached data.
    // Uses the endpoint method `queryFn` in order to bypass `baseQuery`: the
    // query response is irrelevant as the incoming messages are streamed into
    // a store. Splitting the behavior from `baseQuery`, we are free to write
    // `baseQuery` as a WebSocket message sender.
    streamRun: build.query<State, void>({
      queryFn: () => {
        return {
          data: { status: 'idle' },
        }
      },
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = await getWebSocket()

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          ws.conn.onmessage = (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data)

            // Do not handle if not a message we deal with here.
            if (!isStateMessage(message)) {
              return
            }

            switch (message.state) {
              case 'progress':
                updateCachedData((draft) => {
                  draft.status = 'progress'
                  draft.progressData = message.data
                })
                break

              case 'done':
                updateCachedData((draft) => {
                  draft.status = 'done'
                  draft.runData = message.data
                })
                break

              case 'error':
                updateCachedData((draft) => {
                  draft.status = 'error'
                  draft.error = message.error
                })
                break
            }
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.conn.close()
      },
    }),
  }),
})

export const { useStreamRunQuery, useStartRunMutation, useCancelRunMutation } =
  api
