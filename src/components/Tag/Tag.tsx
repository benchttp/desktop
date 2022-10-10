import { FC } from 'react'

import { Typography } from '@/components'

import { getClassName } from './internal/Tag.helpers'
import { ITagColor } from './internal/Tag.types'

interface IProps {
  className?: string
  text: string
  color?: ITagColor
}

export const Tag: FC<IProps> = ({ text, color = 'base-white', className }) => {
  return (
    <div className={getClassName({ color, className })}>
      <Typography font="poppins" weight="semi">
        {text}
      </Typography>
    </div>
  )
}
