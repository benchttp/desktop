import { FC } from 'react'

import { Typography } from '@/components'
import { ITestResultProps } from '@/components/TestResult'

import { getClassNames } from './internal/testResultTitle.helpers'

export type { IProps as ITestResultTitleProps }

type IProps = Pick<ITestResultProps, 'pass' | 'name'>

export const TestResultTitle: FC<IProps> = ({ pass, name }) => {
  const classNames = getClassNames({ pass })

  return (
    <div className="f f-ai-center">
      <span className={classNames.join(' ')}></span>
      <Typography weight="semi">{name}</Typography>
    </div>
  )
}
