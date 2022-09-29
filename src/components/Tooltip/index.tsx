import { FC } from 'react'
import { Info } from 'react-feather'

import { Typography } from '../Typography'
import s from './core/tooltip.module.scss'
import { IProps } from './core/tooltip.typings'

export const Tooltip: FC<IProps> = ({ text, colorIcon = 'white' }) => {
  return (
    <div className={s['tooltip']}>
      <div className={s['icon']}>
        <Info color={colorIcon} />
      </div>
      <div className={s['text']}>
        <Typography font="inter" size="base" weight="regular">
          {text}
        </Typography>
      </div>
    </div>
  )
}
