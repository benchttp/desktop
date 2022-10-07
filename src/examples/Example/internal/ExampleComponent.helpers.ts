import s from './example-component.module.scss'
import { Foo } from './ExampleComponent.types'

export const REUSED_CONSTANT = 'reused accross ExampleComponent module'

export const getClassName = (className: string | undefined): string => {
  const classNames = [s['example'], 'f']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export function doSomething(foo: Foo): void {
  foo
  REUSED_CONSTANT
}
