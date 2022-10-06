import { FC } from 'react'

import { doSomething, getClassName } from './internal/Example.helper'
import { Foo } from './internal/Example.typing'

interface IProps {
  className: string
  foo: Foo
}

export const Example: FC<IProps> = ({ className, foo }) => {
  doSomething(foo)
  return <div className={getClassName(className)}></div>
}
