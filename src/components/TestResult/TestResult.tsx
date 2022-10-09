import { FC } from 'react'

import { TestPredicate } from '@/benchttp/tests'

import { Accordion } from '../Accordion'
import { TestResultContent, TestResultTitle } from './internal/components'

export type { IProps as ITestResultProps }

export interface IProps {
  className?: string
  pass: boolean
  name: string
  field: string
  predicate: TestPredicate
  target: string
  value: string
}

export const TestResult: FC<IProps> = ({
  pass,
  name,
  field,
  predicate,
  target,
  value,
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
          value={value}
        />
      }
    />
  )
}
