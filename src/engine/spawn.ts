import { Command } from '@tauri-apps/api/shell'

const program = 'benchttp-server'

const command = Command.sidecar(`bin/${program}`)

/**
 * Spawns benchttp-server as a child process and returns a Promise
 * that will resolve with the address the server is listening on,
 * or reject if the process closes or produces an unexpected error.
 */
const spawnEngine = async (): Promise<string> => {
  const child = await command.spawn()

  return new Promise((resolve, reject) => {
    command.on('close', (data) => {
      const { code, signal } = data
      console.log(`${program} finished with code ${code} and signal ${signal}`)
      reject({ message: `${program} closed unexpectedly`, code, signal })
    })

    command.on('error', (error) => {
      console.error(`${program} error: "${error}"`)
      reject({ message: `${program} error`, error })
    })

    command.stdout.on('data', (line) => {
      // Wait for the ready signal line before resolving the enclosing Promise.
      resolveAddr(resolve, line)

      console.log(`${program} stdout: "${line}"`)
    })

    command.stderr.on('data', (line) =>
      console.error(`${program} stderr: "${line}"`)
    )

    console.log(`${program} pid: ${child.pid}`)
  })
}

const readySignal = 'READY'

const host = 'localhost'

type ReadySignalLine = `${typeof readySignal} http://${typeof host}:${number}`

const isReadySignal = (line: unknown): line is ReadySignalLine =>
  typeof line === 'string' && line.startsWith(readySignal)

// Expect the engine to always respect the ready signal contract.
// Then we know the address is index 1.
const getAddr = (line: ReadySignalLine): string => line.split(' ')[1]

type PromiseResolve<T> = (value: T | PromiseLike<T>) => void

const resolveAddr = (resolve: PromiseResolve<string>, line: unknown): void => {
  isReadySignal(line) && resolve(getAddr(line))
}

/**
 * Spawns benchttp-server as a child process and returns a Promise
 * that will resolve with the address the server is listening on.
 *
 * If called in the browser, `mustSpawnEngine` will read and return
 * the address to use from the current environment.
 *
 * If the address cannot be resolved by any strategy, throws an exception.
 */
export async function mustSpawnEngine(): Promise<string> {
  if (isWeb()) {
    console.warn(
      `Running in the browser: cannot spawn sidecar with @tauri-apps/api/shell. Make sure engine is running:
      npm run sidecar:exec`
    )
    return import.meta.env.VITE_ENGINE_ADDRESS
  }

  return await spawnEngine()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowTauri = typeof window & { __TAURI__: any }

const isWeb = () => (window as WindowTauri).__TAURI__ === undefined
