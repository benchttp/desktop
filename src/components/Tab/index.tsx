import { FC } from 'react'

import { createIcon, getClassNames } from './core/tab.helpers'
import { IProps } from './core/tab.typings'

export const Tab: FC<IProps> = ({
  text,
  color = 'grey-light',
  iconStart,
  link,
  className,
}) => {
  const classNames = getClassNames({ color, className })

  return (
    <a href={link} className={classNames.join(' ')}>
      {iconStart && createIcon({ icon: iconStart })}
      {text}
    </a>
  )
}
