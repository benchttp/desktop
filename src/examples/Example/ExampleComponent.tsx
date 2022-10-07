import { FC } from 'react'

import { NestedComponent } from './internal/components'
import { doSomething, getClassName } from './internal/ExampleComponent.helpers'
import { Foo } from './internal/ExampleComponent.types'

interface IProps {
  className?: string
  foo: Foo
}

const LOCAL_CONSTANT = 'limited to the scope of this file'

export const ExampleComponent: FC<IProps> = ({ className, foo }) => {
  doSomething(foo)
  return (
    <div className={getClassName(className)}>
      <NestedComponent />
      <p>{LOCAL_CONSTANT}</p>
    </div>
  )
}
