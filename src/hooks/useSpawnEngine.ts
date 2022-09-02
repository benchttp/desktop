import { useState } from 'react'

import { mustSpawnEngine } from '@/engine/spawn'

import { useEffectOnce } from './useEffectOnce'
import { useLoading } from './useLoading'

export function useSpawnEngine() {
  const [address, setAddress] = useState('')
  const [loadEngine, isLoading] = useLoading(mustSpawnEngine)

  useEffectOnce(() => {
    const spawn = async () => {
      setAddress(await loadEngine())
    }
    spawn()
  })

  return { isLoading, address }
}
