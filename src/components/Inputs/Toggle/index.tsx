import { FC } from 'react'

import { getClassNames } from './core/toggle.helpers'
import { IProps } from './core/toggle.typings'

export const Toggle: FC<IProps> = ({
  className,
  id,
  value,
  onChange,
  label,
  disabled,
}) => {
  const classNames = getClassNames({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        disabled={disabled}
        id={id}
        value={value}
        onChange={onChange}
        type="checkbox"
      ></input>
    </div>
  )
}