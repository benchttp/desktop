import { FC } from 'react'
import { Typography } from '../Typography'

import { IProps } from './core/progressbar.typings'
import s from './core/progressbar.module.scss'

export const ProgressBar: FC<IProps> = ({ percentage }) => {
  return (
    <div className={s['container']}>
      <Typography>{percentage}%</Typography>
      <div className={s['progress-bar']}>
        <div
          className={s['progress-bar-active']}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
