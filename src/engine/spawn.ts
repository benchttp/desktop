import { Command } from '@tauri-apps/api/shell'

const program = 'benchttp-server'

const command = Command.sidecar(`bin/${program}`)

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const spawn = async () => {
  command.on('close', (data) =>
    console.log(
      `${program} finished with code ${data.code} and signal ${data.signal}`
    )
  )

  command.on('error', (error) => console.error(`${program} error: "${error}"`))

  command.stdout.on('data', (line) =>
    console.log(`${program} stdout: "${line}"`)
  )

  command.stderr.on('data', (line) =>
    console.error(`${program} stderr: "${line}"`)
  )

  const child = await command.spawn()

  console.log(`${program} pid: ${child.pid}`)
}
