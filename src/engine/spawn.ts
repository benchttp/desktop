import { Command } from '@tauri-apps/api/shell'

const program = 'benchttp-server'

const command = Command.sidecar(`bin/${program}`)

export const spawnEngine = async (): Promise<number> => {
  const child = await command.spawn()

  return new Promise((resolve) => {
    command.on('close', (data) =>
      console.log(
        `${program} finished with code ${data.code} and signal ${data.signal}`
      )
    )

    command.on('error', (error) =>
      console.error(`${program} error: "${error}"`)
    )

    command.stdout.on('data', (line) => {
      // Wait for the ready signal line before resolving the enclosing Promise.
      resolvePort(resolve, line)

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
// Then we know the port is index 2.
const getPort = (line: ReadySignalLine): number => parseInt(line.split(':')[2])

type PromiseResolve<T> = (value: T | PromiseLike<T>) => void

const resolvePort = (resolve: PromiseResolve<number>, line: unknown): void => {
  isReadySignal(line) && resolve(getPort(line))
}
