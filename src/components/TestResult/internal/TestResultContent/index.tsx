import { FC } from 'react'

import { TestPredicate } from '@/benchttp/tests'
import { Typography } from '@/components'

import s from './internal/test-result-content.module.scss'
import { getPredicateSymbol } from './internal/testResultContent.helpers'

export interface IProps {
  field: string
  predicate: TestPredicate
  target: string
  value: string
}

export const TestResultContent: FC<IProps> = ({
  field,
  predicate,
  target,
  value,
}) => {
  return (
    <div>
      <div className="mb-2">
        <Typography element="span" weight="semi">
          Condition :{' '}
        </Typography>
        <Typography element="span">{field}</Typography>
        <Typography
          className={`${s['test-result-content__predicate']} ml-1 mr-1`}
          element="pre"
          weight="semi"
        >
          {getPredicateSymbol(predicate)}
        </Typography>
        <Typography element="span">{target}</Typography>
      </div>
      <Typography>
        <Typography element="span" weight="semi">
          Value :{' '}
        </Typography>
        {value}
      </Typography>
    </div>
  )
}
