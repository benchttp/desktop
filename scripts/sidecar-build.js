import fs from 'fs'
import path from 'path'

import { execa } from 'execa'

// Note: all paths are defined via path.join, so they are OS agnostic.
// Node runtime will automatically use the correct path separator.

const ext = process.platform === 'win32' ? '.exe' : ''
const binary = 'benchttp-server'
const bindir = path.join(process.cwd(), 'src-tauri', 'bin')

const targetTriple = async () => {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout
  const res = /host: (\S+)/g.exec(rustInfo)[1]
  if (!res) {
    throw new Error('Failed to determine platform target triple')
  }
  return res
}

const goSource = (base) => path.join(base, 'cmd', 'server')

async function buildGo(outputPath) {
  process.chdir(path.join('vendor', 'engine'))
  await execa('go', ['build', '-o', outputPath, goSource(process.cwd())])
  process.chdir(path.join('..', '..'))
}

async function main() {
  const output = path.join(bindir, `${binary}-${await targetTriple()}${ext}`)

  fs.rmSync(output, { force: true })

  await buildGo(output)

  if (!fs.existsSync(output)) {
    throw new Error(`Failed to build binary at ${output}`)
  }
}

main().catch((e) => {
  throw e
})
