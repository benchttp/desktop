import { FC } from 'react'
import { Trash } from 'react-feather'

import { Typography } from '@/components'

import { getClassNames } from './core/sidebarItem.helpers'
import { IProps } from './core/sidebarItem.typings'

export const SidebarItem: FC<IProps> = ({ text, selected, className }) => {
  const classNames = getClassNames({ selected, className })

  return (
    <div className={classNames.join(' ')}>
      <Typography weight="medium">{text}</Typography>
      {selected && <Trash />}
    </div>
  )
}
