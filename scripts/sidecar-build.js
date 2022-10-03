import fs from 'fs'
import path from 'path'

import { execa } from 'execa'

const ext = process.platform === 'win32' ? '.exe' : ''
const binary = 'benchttp-server'
const bindir = path.join(process.cwd(), 'src-tauri', 'bin')

const source = (base) => path.join(base, 'cmd', 'server')

function cd(...parts) {
  process.chdir(path.join(...parts))
}

async function buildBinary(outputPath) {
  cd('vendor', 'engine')
  await execa('go', ['build', '-o', outputPath, source(process.cwd())])
  cd('..', '..')
}

async function getTargetTriple() {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout
  return /host: (\S+)/g.exec(rustInfo)[1]
}

async function main() {
  const targetTriple = await getTargetTriple()

  if (!targetTriple) {
    throw new Error('Failed to determine platform target triple')
  }

  const output = path.join(bindir, `${binary}-${targetTriple}${ext}`)

  fs.rmSync(output, { force: true })

  await buildBinary(output)

  if (!fs.existsSync(output)) {
    throw new Error(`Failed to build binary at ${output}`)
  }
}

main().catch((e) => {
  throw e
})
