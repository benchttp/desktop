/**
 * Casts `v` to an integer. If successful, calls `fn` with the casted integer
 * and returns the resulting value.
 *
 * @example
 * asInteger('2', (n) => 2 * n) // 4
 */
export const asInteger = <T>(v: unknown, fn: (n: number) => T) => {
  const n = Number(v)
  return Number.isInteger(n) && fn(n)
}
