import { useEffect, useRef } from 'react'

export function useEffectOnce(action: React.EffectCallback) {
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return action()
    }
  }, [action])
}
