import { FC } from 'react'

import { getClassNames } from './internal/Toggle.helpers'
import { IProps } from './internal/Toggle.types'

export const Toggle: FC<IProps> = ({
  className,
  id,
  checked,
  onChange,
  label,
}) => {
  const classNames = getClassNames({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} checked={checked} onChange={onChange} type="checkbox" />
    </div>
  )
}
