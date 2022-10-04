import { FC } from 'react'

import { Typography } from '@/components'

import { getClassNames } from './core/tag.helpers'
import { IProps } from './core/tag.typings'

export const Tag: FC<IProps> = ({ text, color = 'white', className }) => {
  const classNames = getClassNames({ color, className })

  return (
    <div className={classNames.join(' ')}>
      <Typography font="poppins" weight="semi">
        {text}
      </Typography>
    </div>
  )
}
