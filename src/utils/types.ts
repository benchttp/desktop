declare const brand: unique symbol;
export type Nominal<T, U> = T & { readonly [brand]: U };

type TypeGuard<T, U extends T> = (val: T) => val is U;

/**
 * Returns a custom type guard guarding that an object has `key`
 * and that `obj.key` is correctly type.
 * @example
 * const guard = typeGuardProperty("foo", (x): x is string => typeof x === "string")
 * if guard(obj) {
 *   obj.foo // string
 * } else {
 *   obj.foo // never
 * }
 */
export const typeGuardProperty = <Key extends string, Type>(
  key: Key,
  guard: TypeGuard<unknown, Type>
) => {
  return (obj: Record<string, unknown>): obj is { [K in Key]: Type } =>
    guard(obj[key]);
};

export const isObject = (val: unknown): val is Record<string, unknown> => {
  return typeof val === "object" && val !== null;
};
