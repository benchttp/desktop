import { FC } from 'react'

import { Typography } from '@/components'

import { getClassNames } from './internal/Tag.helpers'
import { ITagColor } from './internal/Tag.types'

interface IProps {
  className?: string
  text: string
  color?: ITagColor
}

export const Tag: FC<IProps> = ({ text, color = 'base-white', className }) => {
  const classNames = getClassNames(color, className)

  return (
    <div className={classNames.join(' ')}>
      <Typography font="poppins" weight="semi">
        {text}
      </Typography>
    </div>
  )
}
