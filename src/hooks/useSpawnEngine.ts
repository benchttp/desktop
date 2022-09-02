import { useEffect, useState } from 'react'

import { mustSpawnEngine } from '@/engine/spawn'

import { useOnce } from './useOnce'

export function useSpawnEngine() {
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState('')

  const spawnSync = () => {
    const spawn = async () => {
      setIsLoading(true)
      setAddress(await mustSpawnEngine())
      setIsLoading(false)
    }
    spawn()
  }

  const once = useOnce()

  useEffect(() => {
    once.do(spawnSync)
  }, [once])

  return { isLoading, address }
}
