import { FC } from 'react'

import { Typography } from '../Typography'
import s from './core/progressbar.module.scss'
import { IProps } from './core/progressbar.typings'

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
