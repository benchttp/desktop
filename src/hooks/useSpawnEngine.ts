import { useEffect, useState } from 'react'

import { spawnEngine } from '@/engine/spawn'

export function useSpawnEngine() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const spawn = async () => {
      setIsLoading(true)
      await spawnEngine()
      setIsLoading(false)
    }
    spawn()
  }, [])

  return { isLoading }
}
