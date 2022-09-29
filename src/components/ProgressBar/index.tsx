import { FC } from 'react'

import { Typography } from '../Typography'
import s from './core/progressbar.module.scss'
import { IProps } from './core/progressbar.typings'

export const ProgressBar: FC<IProps> = ({ max, value }) => {
  const percentage = (value: number, max: number) => (100 * value) / max
  return (
    <div className={s['container']}>
      <Typography className={s['percentage']}>
        {value}/{max} requests ({percentage(value, max)}%)
      </Typography>
      <progress className={s['progress-bar']} max={max} value={value} />
    </div>
  )
}
