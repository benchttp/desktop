import { useEffect, useState } from 'react'

import { spawnEngine } from '@/engine/spawn'

export function useSpawnEngine() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    spawnEngine()
    setIsLoading(false)
  }, [])

  return { isLoading }
}
