import { useRef } from 'react'

export function useOnce() {
  const done = useRef(false)

  const once = {
    do: (effect: React.EffectCallback) => {
      if (done.current) return
      done.current = true
      return effect()
    },
  }

  return once
}
