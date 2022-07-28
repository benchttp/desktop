import { createApi } from "@reduxjs/toolkit/query/react";
import { IncomingMessage, isIncomingMessage, OutgoingMessage } from "./message";
import { getWebSocket } from "./socket";

type Store = {
  events: IncomingMessage["event"][];
  progress: string[];
  output: string | undefined;
};

export const api = createApi({
  // The function that will make the final query. It is used by each endpoint
  // declared with the method `query` (i.e. sendMessage) and will be called
  // with the return value of the endpoint `query()` method.
  //
  // We use `baseQuery` in order to send a message using the WebSocket connection.
  // The return value is irrelevant because we do not expect response data
  // from the WebSocket server on send. Thus the return value is an empty object.
  async baseQuery({ event }: OutgoingMessage) {
    const ws = await getWebSocket();
    ws.conn.send(event);

    return { data: {} };
  },

  endpoints: (build) => ({
    // Sends a message using the WebSocket connection through baseQuery.
    sendMessage: build.mutation<unknown, OutgoingMessage>({
      query: ({ event, data }) => {
        // TODO any value transformation should be here.
        return { event, data };
      },
    }),

    // Streams incoming messages from the WebSocket connection into cached data.
    // Uses the endpoint method `queryFn` in order to bypass `baseQuery`: the
    // query response is irrelevant as the incoming messages are streamed into
    // a store. Splitting the behavior from `baseQuery`, we are free to write
    // `baseQuery` as a WebSocket message sender.
    streamMessages: build.query<Store, void>({
      queryFn: () => {
        return {
          data: { events: [], progress: [], output: undefined },
        };
      },
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = await getWebSocket();

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            // Do not handle if not a message we deal with here.
            if (!isIncomingMessage(data)) {
              return;
            }

            // TODO Cleaner handling.
            switch (data.event) {
              case "progress":
                updateCachedData((draft) => {
                  draft.events.push(data.event);
                  draft.progress.push(data.data);
                });
                break;

              case "output":
                updateCachedData((draft) => {
                  draft.events.push(data.event);
                  draft.output = data.data;
                });
                break;

              default:
                updateCachedData((draft) => {
                  draft.events.push(data.event);
                });
                break;
            }
          };

          ws.conn.onmessage = listener;
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.conn.close();
      },
    }),
  }),
});

export const { useStreamMessagesQuery, useSendMessageMutation } = api;
