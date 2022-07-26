import {
  Connection,
  ConnectionReadyState,
  close,
  open as openAt,
  Path,
  readReadyState,
  sendCommandPull,
  sendCommandRun,
} from "./connection";

const addr = "localhost:8080";
const token = "6db67fafc4f5bf965a5a"; // Dummy token used for development.

const url = (path: Path) => `ws://${addr}/${path}?access_token=${token}`;

export const open = <T extends Path>(path: T) => openAt<T>(url(path));

export { close, readReadyState, sendCommandPull, sendCommandRun };
export type { Connection, ConnectionReadyState, Path };
