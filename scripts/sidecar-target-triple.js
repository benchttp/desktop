import { execa } from 'execa'
import { renameSync } from 'fs'

let extension = ''
if (process.platform === 'win32') {
  extension = '.exe'
}

const binaries = ['benchttp-server']

async function main() {
  const rustInfo = (await execa('rustc', ['-vV'])).stdout
  const targetTriple = /host: (\S+)/g.exec(rustInfo)[1]
  if (!targetTriple) {
    console.error('Failed to determine platform target triple')
  }
  for (const binary of binaries) {
    renameSync(
      `src-tauri/bin/${binary}${extension}`,
      `src-tauri/bin/${binary}-${targetTriple}${extension}`
    )
  }
}

main().catch((e) => {
  throw e
})
