import { existsSync, renameSync } from 'fs'
import path from 'path'

import { execa } from 'execa'

const ext = process.platform === 'win32' ? '.exe' : ''
const bin = 'benchttp-server'
const bindir = path.join('src-tauri', 'bin')
const oldPath = path.join(bindir, bin + ext)

function withTargetTriple(targetTriple) {
  return path.join(bindir, `${bin}-${targetTriple}${ext}`)
}

async function getTargetTriple() {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout
  return /host: (\S+)/g.exec(rustInfo)[1]
}

async function main() {
  const s = await getTargetTriple()

  if (!s) {
    throw new Error('Failed to determine platform target triple')
  }

  const newPath = withTargetTriple(s)

  if (!existsSync(newPath)) {
    renameSync(oldPath, newPath)
  }
}

main().catch((e) => {
  throw e
})
