import { useEffect, useState } from 'react'

import { mustSpawnEngine } from '@/engine/spawn'

import { useLoading } from './useLoading'
import { useOnce } from './useOnce'

export function useSpawnEngine() {
  const [address, setAddress] = useState('')
  const [loadEngine, isLoading] = useLoading(mustSpawnEngine)
  const once = useOnce()

  useEffect(() => {
    once.do(() => {
      const spawn = async () => {
        setAddress(await loadEngine())
      }
      spawn()
    })
  }, [once, loadEngine])

  return { isLoading, address }
}
