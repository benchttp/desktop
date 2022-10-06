export const parseInteger = (v: string): number => {
  const i = parseInt(v, 10)

  if (Number.isNaN(i)) throw new Error(`not a number: ${v}`)
  if (i !== Math.floor(i)) throw new Error(`not an integer: ${i}`)
  return i
}

export const parseMilliseconds = (v: string): `${number}ms` => {
  return `${parseInteger(v)}ms`
}
