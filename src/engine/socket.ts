import { Nominal } from "../utils/types";

export type Topic = "run";

type Connection<T extends Topic> = Nominal<WebSocket, T>;

const addr = "localhost:8080";
const token = "6db67fafc4f5bf965a5a"; // Dummy token used for development.

const url = (topic: Topic = "run") =>
  `ws://${addr}/${topic}?access_token=${token}`;

async function openAt<T extends Topic>(url: string): Promise<Connection<T>> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log(`WebSocket connection established at ${ws.url}`);
      resolve(ws as Connection<T>);
    };

    ws.onerror = (err) => {
      console.log(`WebSocket connection error at ${ws.url}`);
      reject(new Error("WebSocket connection error"));
    };

    ws.onclose = (ev) => {
      console.log(`WebSocket connection closed at ${ws.url}`);
      reject({ code: ev.code, reason: ev.reason });
    };
  });
}

const open = <T extends Topic>(topic: T) => openAt<T>(url(topic));

type Socket<T extends Topic> = {
  topic: T;
  /** The underlying WebSocket. */
  conn: Connection<T> | null;
  /** Getter for WebSocket.readyState. */
};

type OpenSocket<T extends Topic> = Socket<T> & {
  conn: Connection<T>;
};

const socket: Socket<"run"> = {
  topic: "run",
  conn: null,
};

export async function getWebSocket<T extends Topic>(
  topic: T
): Promise<OpenSocket<T>> {
  if (socket.conn === null) {
    socket.conn = await open(topic);
  }

  return socket as OpenSocket<T>;
}
