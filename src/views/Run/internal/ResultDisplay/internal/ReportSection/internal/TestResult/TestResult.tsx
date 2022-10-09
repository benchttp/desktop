import { FC } from 'react'

import { TestPredicate } from '@/benchttp/tests'
import { Accordion } from '@/components'

import { TestResultContent, TestResultTitle } from './internal/components'

interface IProps {
  className?: string
  pass: boolean
  name: string
  field: string
  predicate: TestPredicate
  target: string
  got: string
}

export const TestResult: FC<IProps> = ({
  pass,
  name,
  field,
  predicate,
  target,
  got,
  className,
}) => {
  return (
    <Accordion
      className={className}
      title={<TestResultTitle pass={pass} name={name} />}
      content={
        <TestResultContent
          field={field}
          predicate={predicate}
          target={target}
          value={got}
        />
      }
    />
  )
}
