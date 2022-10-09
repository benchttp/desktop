import { FC } from 'react'

import { Typography } from '@/components'

import { getClassNames } from './internal/TestResultTitle.helpers'

export interface IProps {
  pass: boolean
  name: string
}

export const TestResultTitle: FC<IProps> = ({ pass, name }) => {
  const classNames = getClassNames({ pass })

  return (
    <div className="f f-ai-center">
      <span className={classNames.join(' ')}></span>
      <Typography weight="semi">{name}</Typography>
    </div>
  )
}
