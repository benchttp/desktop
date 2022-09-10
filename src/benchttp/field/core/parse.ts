import { Nullable } from '@/typing/nullable'

import { FieldRepr } from './field'
import { FieldNode } from './node'

export const parseField = (field: FieldRepr): Nullable<FieldNode> => {
  const stack = field.split('.')
  return parseFieldRecursive(null, stack)
}

function parseFieldRecursive(
  currentField: Nullable<FieldNode>,
  stack: string[]
): Nullable<FieldNode> {
  const [nextKey, ...nextStack] = stack
  const isLast = !nextKey

  if (isLast) {
    return currentField
  }

  const nextParsed = new FieldNode({ host: currentField, key: nextKey })
  if (!nextParsed.isValid()) {
    return null
  }

  return parseFieldRecursive(nextParsed, nextStack)
}
