import { FC } from 'react'

import { Typography } from '@/components'

import { getClassName } from './internal/Toggle.helpers'
import { IProps } from './internal/Toggle.typings'

export const Toggle: FC<IProps> = ({ checked, className, text }) => {
  return (
    <label className={getClassName({ className })}>
      <input type="checkbox" defaultChecked={checked} />
      <Typography>{text}</Typography>
    </label>
  )
}
