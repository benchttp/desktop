import { createApi } from "@reduxjs/toolkit/query/react";
import { getWebSocket } from "./socket";

type IncomingMessage = string;

const isIncomingMessage = (data: unknown): data is IncomingMessage => {
  // TODO
  return data != null;
};

type OutgoingMessage = {
  message: "run" | "stop" | "pull";
};

export const api = createApi({
  // The function that will make the final query. It is used by each endpoint
  // declared with the method `query` (i.e. sendMessage) and will be called
  // with the return value of the endpoint `query()` method.
  //
  // We use `baseQuery` in order to send a message using the WebSocket connection.
  // The return value is irrelevant because we do not expect response data
  // from the WebSocket server on send. Thus the return value is an empty object.
  async baseQuery({ message }: OutgoingMessage) {
    const ws = await getWebSocket();
    ws.conn.send(message);

    return { data: {} };
  },

  endpoints: (build) => ({
    // Sends a message using the WebSocket connection through baseQuery.
    sendMessage: build.mutation<unknown, OutgoingMessage>({
      query: ({ message }) => {
        // TODO any value transformation should be here.
        return { message };
      },
    }),

    // Streams incoming messages from the WebSocket connection into cached data.
    // Uses the endpoint method `queryFn` in order to bypass `baseQuery`: the
    // query response is irrelevant as the incoming messages are streamed into
    // a store. Splitting the behavior from `baseQuery`, we are free to write
    // `baseQuery` as a WebSocket message sender.
    streamMessages: build.query<IncomingMessage[], void>({
      queryFn: () => {
        return { data: [] as IncomingMessage[] };
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
            const data = event.data;

            // Do not handle if not a message we deal with here.
            if (!isIncomingMessage(event.data)) {
              return;
            }

            updateCachedData((draft) => {
              draft.push(data);
            });
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
