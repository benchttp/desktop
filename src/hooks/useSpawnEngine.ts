import { useEffect, useState } from 'react'

import { spawnEngine } from '@/engine/spawn'

import { useOnce } from './useOnce'

export function useSpawnEngine() {
  const [isLoading, setIsLoading] = useState(false)

  const spawnSync = () => {
    const spawn = async () => {
      setIsLoading(true)

      try {
        await spawnEngine()
      } catch (error) {
        if (!isWeb()) throw error
        console.warn(
          `Running in the browser: cannot spawn sidecar with @tauri-apps/api/shell. Make sure engine is running:
                    npm run sidecar:exec`
        )
      }

      setIsLoading(false)
    }
    spawn()
  }

  const once = useOnce()

  useEffect(() => {
    once.do(spawnSync)
  }, [once])

  return { isLoading }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowTauri = typeof window & { __TAURI__: any }

const isWeb = () => (window as WindowTauri).__TAURI__ === undefined
