import React, { createContext, useState } from "react";
import {
  Connection,
  ConnectionReadyState,
  close,
  open,
  Path,
  readReadyState,
  sendCommandPull,
  sendCommandRun,
} from "./connection";

type Socket<T extends Path> = {
  path: T;
  conn: Connection<T> | null;
  readyState: () => ConnectionReadyState | null;
  messages: string[];
};

export type Connections = {
  [P in Path]: Socket<P>;
};

const nullSocket = (path: Path): Socket<any> => ({
  path,
  conn: null,
  readyState: () => null,
  messages: [],
});

/**
 * Represents the action to execute. Formatted as `<socketPath>:<command>`.
 */
type SocketAction = `${Path}:open` | `${Path}:close` | "run:run" | "run:pull";

export const SocketContext = createContext<{
  state: Connections;
  action: React.Dispatch<SocketAction>;
}>({
  state: {} as Connections,
  action: (() => {}) as React.Dispatch<SocketAction>,
});

async function openConnection<T extends Path>(socket: Socket<T>) {
  socket.conn = await open<T>(socket.path);
  socket.readyState = readReadyState(socket.conn);
}

async function reducer(
  state: Connections,
  action: SocketAction
): Promise<Connections> {
  const { run, status } = state;

  switch (action) {
    case "run:open":
      await openConnection(run);
      break;

    case "run:close":
      await close(assertNonNull(run.conn));
      break;

    case "run:run":
      try {
        const ack = await sendCommandRun(assertNonNull(run.conn));
        run.messages.push(ack);
      } catch (err) {
        run.messages.push(err as string);
      }
      break;

    case "run:pull":
      const m: string = await sendCommandPull(assertNonNull(run.conn));
      run.messages.push(m);
      break;

    case "status:open":
      await openConnection(status);
      assertNonNull(status.conn).onmessage = (ev) => {
        status.messages.push(ev.data);
      };
      break;

    case "status:close":
      await close(assertNonNull(status.conn));
      break;
  }

  return { run, status };
}

const isOpen = (conn: Socket<any> | null): boolean =>
  conn !== null && conn.readyState() !== null && conn.readyState() !== "closed";

async function idempotentReducer(
  state: Connections,
  action: SocketAction
): Promise<Connections> {
  if (
    (action === "run:open" && isOpen(state.run)) ||
    (action === "status:open" && isOpen(state.status))
  ) {
    return state;
  }

  return reducer(state, action);
}

function assertNonNull<T>(x: T | null): T {
  if (x === null) throw new Error("unexpected null value");
  return x;
}

type AsyncReducer<S, A> = (state: S, action: A) => Promise<S>;

function useAsyncReducer<S, A>(
  reducer: AsyncReducer<S, A>,
  initialState: S
): [S, React.Dispatch<A>] {
  const [state, setState] = useState(initialState);
  const dispatch = async (action: A) => setState(await reducer(state, action));
  return [state, dispatch];
}

export const SocketProvider: React.FunctionComponent<
  React.PropsWithChildren
> = (props) => {
  const [state, action] = useAsyncReducer(idempotentReducer, {
    run: nullSocket("run"),
    status: nullSocket("status"),
  });

  return (
    <SocketContext.Provider value={{ state, action }}>
      {props.children}
    </SocketContext.Provider>
  );
};
