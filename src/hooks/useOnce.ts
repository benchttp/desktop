import { useRef } from 'react'

export function useOnce() {
  const done = useRef(false)

  const once = {
    done,
    do: (effect: React.EffectCallback) => {
      if (done.current) return
      effect()
      done.current = true
    },
  }

  return once
}
