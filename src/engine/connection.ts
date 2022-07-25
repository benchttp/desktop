import { Nominal } from "../utils/types";

export type Path = "run" | "status";

export type Connection<T extends Path> = Nominal<WebSocket, T>;

const addr = "localhost:8080";
const token = "6db67fafc4f5bf965a5a"; // Dummy token used for development.

const url = (socket: Path) => `ws://${addr}/${socket}?access_token=${token}`;

export async function open<T extends Path>(path: T): Promise<Connection<T>> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url(path));

    ws.onopen = () => {
      console.log(`WebSocket connection established at ${ws.url}`);
      resolve(ws as Connection<T>);
    };

    ws.onerror = (err) => {
      console.log(`WebSocket connection error at ${ws.url}`);
      reject(err);
    };
  });
}

export async function close(
  ws: Connection<any>
): Promise<{ code?: number; reason?: string }> {
  return new Promise((resolve, reject) => {
    ws.close();

    ws.onclose = (ev) => {
      console.log(`WebSocket connection closed at ${ws.url}`);
      resolve({ code: ev.code, reason: ev.reason });
    };

    ws.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * Sends a command "run" through the Socket and returns the response.
 * Awaits indefinitely until a response message is received.
 * @param ws A Socket connected under path `/run`.
 */
export async function sendCommandRun(ws: Connection<"run">): Promise<string> {
  return new Promise((resolve, reject) => {
    ws.send("run");

    ws.onmessage = (ev) => {
      if (ev.data === "ack") {
        resolve("ack");
      } else {
        reject("did not received ack");
      }
    };

    ws.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * Sends a command "pull" through the Socket and returns the response.
 * Awaits indefinitely until a response message is received.
 * @param ws A Socket connected under path `/run`.
 */
export async function sendCommandPull<T>(ws: Connection<"run">): Promise<T> {
  return new Promise((resolve, reject) => {
    ws.send("pull");

    ws.onmessage = (ev) => {
      resolve(ev.data);
    };

    ws.onerror = (err) => {
      reject(err);
    };
  });
}

export type ConnectionReadyState = "connecting" | "open" | "closing" | "closed";

const stateMap: { [S in 0 | 1 | 2 | 3]: ConnectionReadyState } = {
  0: "connecting",
  1: "open",
  2: "closing",
  3: "closed",
};

const isInMap = (n: number): n is keyof typeof stateMap => n in stateMap;

const readyStateToString = (state: number): ConnectionReadyState => {
  return isInMap(state) ? stateMap[state] : "connecting";
};

export const readReadyState = (conn: Connection<any> | null) => {
  return () => (conn ? readyStateToString(conn.readyState) : "connecting");
};
