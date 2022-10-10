import { FC } from 'react'

import { Typography } from '../Typography'
import s from './internal/progress-bar.module.scss'

interface IProps {
  value: number
  max: number
}

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
