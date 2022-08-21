import { useEffect, useState } from 'react'

import { spawnEngine } from '@/engine/spawn'

import { useOnce } from './useOnce'

export function useSpawnEngine() {
  const [isLoading, setIsLoading] = useState(false)
  const [port, setPort] = useState(0)

  const spawnSync = () => {
    const spawn = async () => {
      setIsLoading(true)

      try {
        setPort(await spawnEngine())
      } catch (error) {
        tryWeb(setPort) || throwError(error)
      }

      setIsLoading(false)
    }
    spawn()
  }

  const once = useOnce()

  useEffect(() => {
    once.do(spawnSync)
  }, [once])

  return { isLoading, port }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowTauri = typeof window & { __TAURI__: any }

const isWeb = () => (window as WindowTauri).__TAURI__ === undefined

const tryWeb = (
  setPort: React.Dispatch<React.SetStateAction<number>>
): boolean => {
  if (!isWeb()) return false

  console.warn(
    `Running in the browser: cannot spawn sidecar with @tauri-apps/api/shell. Make sure engine is running:
    npm run sidecar:exec`
  )
  setPort(import.meta.env.VITE_ENGINE_PORT)
  return true
}

const throwError = (error: unknown) => {
  throw error
}
