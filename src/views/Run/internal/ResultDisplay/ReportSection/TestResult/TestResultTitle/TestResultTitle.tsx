import { FC } from 'react'

import { Typography } from '@/components'

import { ITestResultProps } from '../TestResult'
import { getClassNames } from './TestResultTitle.helpers'

export type IProps = Pick<ITestResultProps, 'pass' | 'name'>

export const TestResultTitle: FC<IProps> = ({ pass, name }) => {
  const classNames = getClassNames({ pass })

  return (
    <div className="f f-ai-center">
      <span className={classNames.join(' ')}></span>
      <Typography weight="semi">{name}</Typography>
    </div>
  )
}
