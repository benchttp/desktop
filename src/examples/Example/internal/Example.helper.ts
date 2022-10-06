import s from './Example.module.scss'
import { Foo } from './Example.typing'

export const getClassName = (className: string | undefined): string => {
  const classNames = [s['example'], 'f']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function doSomething(foo: Foo): void {
  //
}
