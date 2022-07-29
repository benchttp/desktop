import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CancelRunMessage,
  IncomingMessage,
  isIncomingMessage,
  StartRunMessage,
} from "./message";
import { getWebSocket } from "./socket";

type RunState = {
  status: IncomingMessage["event"] | "idle";
  progressData?: string;
  runData?: Record<string, any>; // TODO
  error?: string;

  // Store all incoming messages. Development only.
  messages: unknown[];
};

export const api = createApi({
  // The function that will make the final query. It is used by each endpoint
  // declared with the method `query` (i.e. sendMessage) and will be called
  // with the return value of the endpoint `query()` method.
  //
  // We use `baseQuery` in order to send a message using the WebSocket connection.
  // The return value is irrelevant because we do not expect response data
  // from the WebSocket server on send. Thus the return value is an empty object.
  async baseQuery(arg: StartRunMessage | CancelRunMessage) {
    // TODO extract function ?
    let message: string;
    switch (arg.procedure) {
      case "run":
        message = JSON.stringify({ procedure: arg.procedure, data: arg.data });
        break;
      case "cancel":
        message = JSON.stringify({ procedure: arg.procedure });
        break;
    }

    const ws = await getWebSocket();

    ws.conn.send(message);

    return { data: {} };
  },

  endpoints: (build) => ({
    startRun: build.mutation<void, Omit<StartRunMessage, "procedure">>({
      query: ({ data }): StartRunMessage => {
        // TODO any value transformation should be here.
        return { procedure: "run", data };
      },
    }),

    cancelRun: build.mutation<void, void>({
      query: (): CancelRunMessage => {
        // TODO any value transformation should be here.
        return { procedure: "cancel" };
      },
    }),

    // Streams incoming messages from the WebSocket connection into cached data.
    // Uses the endpoint method `queryFn` in order to bypass `baseQuery`: the
    // query response is irrelevant as the incoming messages are streamed into
    // a store. Splitting the behavior from `baseQuery`, we are free to write
    // `baseQuery` as a WebSocket message sender.
    streamRun: build.query<RunState, void>({
      queryFn: () => {
        return {
          data: { status: "idle", messages: [] },
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
                  draft.status = "progress";
                  draft.progressData = data.data;
                });
                break;

              case "done":
                updateCachedData((draft) => {
                  draft.status = "done";
                  draft.runData = data.data;
                });
                break;

              case "error":
                break;
            }

            // Development only.
            updateCachedData((draft) => {
              draft.messages.push(data);
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

export const { useStreamRunQuery, useStartRunMutation, useCancelRunMutation } =
  api;
