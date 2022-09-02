import { useState, useCallback } from 'react'

/**
 * `useLoading` returns a wrapped version of the callback which
 * will set the value of `isLoading` to true once the callback has returned.
 *
 * @example
 * const [loadFoos, isLoading] = useLoading(fetchFoos)
 * // isLoading === true
 * const foos = await loadFoos(params)
 * // isLoading === false
 */
export function useLoading<P, R>(
  action: (...args: P[]) => Promise<R>
): [actionWithLoading: typeof action, isLoading: boolean] {
  const [isLoading, setIsLoading] = useState(false)
  return [
    useCallback(
      (...args: P[]) => {
        setIsLoading(true)
        return action(...args).finally(() => setIsLoading(false))
      },
      [action]
    ),
    isLoading,
  ]
}
