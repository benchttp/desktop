import { Nullable } from '@/typing/nullable'

import {
  isHTTPCodeKey,
  isIndexKey,
  isQuantileKey,
  isRootKey,
  isStatisticsKey,
} from './key'

type FieldValidator =
  | RootFieldValidator
  | StatisticsFieldValidator
  | QuantileFieldValidator
  | HTTPCodeFieldValidator
  | IndexFieldValidator

type FieldClass =
  | typeof RootFieldValidator
  | typeof StatisticsFieldValidator
  | typeof QuantileFieldValidator
  | typeof HTTPCodeFieldValidator
  | typeof IndexFieldValidator

interface IFieldValidator {
  keyValidator: (key: string) => boolean
  childValidators: FieldClass[]
}

abstract class AbstractFieldValidator implements IFieldValidator {
  key: string
  child: Nullable<FieldValidator>

  constructor({ child, key }: Pick<AbstractFieldValidator, 'key' | 'child'>) {
    this.child = child
    this.key = key
  }

  abstract keyValidator: IFieldValidator['keyValidator']

  abstract childValidators: IFieldValidator['childValidators']

  public readonly isValid = (): boolean =>
    this.keyValidator(this.key) && this.hasValidChild()

  private hasValidChild = (): boolean =>
    !this.child ||
    this.childValidators.some((Allowed) => this.child instanceof Allowed)
}

export class QuantileFieldValidator extends AbstractFieldValidator {
  keyValidator = isQuantileKey
  childValidators = [IndexFieldValidator]
}

export class StatisticsFieldValidator extends AbstractFieldValidator {
  keyValidator = isStatisticsKey
  childValidators = [QuantileFieldValidator]
}

export class RootFieldValidator extends AbstractFieldValidator {
  keyValidator = isRootKey
  childValidators = [StatisticsFieldValidator]
}

export class IndexFieldValidator extends AbstractFieldValidator {
  keyValidator = isIndexKey
  childValidators = []
}

export class HTTPCodeFieldValidator extends AbstractFieldValidator {
  keyValidator = isHTTPCodeKey
  childValidators = [IndexFieldValidator]
}
