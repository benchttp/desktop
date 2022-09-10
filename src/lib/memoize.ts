const cache = new WeakMap()

export const memoize = <T>(fn: () => T): T =>
  cache.get(fn) ?? cache.set(fn, fn()).get(fn)
