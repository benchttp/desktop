export type FixedArray<
  T,
  N extends number,
  A extends readonly T[] = []
> = A extends {
  length: N
}
  ? A
  : FixedArray<T, N, readonly [...A, T]>
