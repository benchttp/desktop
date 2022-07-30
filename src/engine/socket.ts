import { Nominal } from '../utils/types'

const endpoint = 'run'

type Endpoint = typeof endpoint

type Connection = Nominal<WebSocket, Endpoint>

const addr = 'localhost:8080'
const token = '6db67fafc4f5bf965a5a' // Dummy token used for development.

const url = (addr: string, endpoint: Endpoint, token: string) =>
  `ws://${addr}/${endpoint}?access_token=${token}`

async function openAt(url: string): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log(`WebSocket connection established at ${ws.url}`)
      resolve(ws as Connection)
    }

    ws.onerror = () => {
      console.log(`WebSocket connection error at ${ws.url}`)
      reject(new Error('WebSocket connection error'))
    }

    ws.onclose = (ev) => {
      console.log(`WebSocket connection closed at ${ws.url}`)
      reject({ code: ev.code, reason: ev.reason })
    }
  })
}

const open = () => openAt(url(addr, endpoint, token))

type Socket = {
  /** The underlying WebSocket. */
  conn: Connection | null
}

type OpenSocket = Socket & {
  conn: Connection
}

const socket: Socket = {
  conn: null,
}

export async function getWebSocket(): Promise<OpenSocket> {
  if (socket.conn === null) {
    socket.conn = await open()
  }

  return socket as OpenSocket
}
