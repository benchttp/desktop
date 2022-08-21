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
      resolvePort(resolve, line)

      console.log(`${program} stdout: "${line}"`)
    })

    command.stderr.on('data', (line) =>
      console.error(`${program} stderr: "${line}"`)
    )

    console.log(`${program} pid: ${child.pid}`)
  })
}

const resolvePort = (
  resolve: (value: number | PromiseLike<number>) => void,
  line: unknown
): void => {
  const prefix = 'port:'
  if (typeof line === 'string' && line.startsWith(prefix)) {
    const port = parseInt(line.split(prefix)[1])
    resolve(port)
  }
}
