import { FC } from 'react'

import { getClassNames } from './core/textInput.helpers'
import s from './core/textInput.module.scss'
import { IProps } from './core/textInput.typings'

export const TextInput: FC<IProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  disabled = false,
  placeholder,
  type,
}) => {
  const classNames = getClassNames({ className, disabled })

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={s['input-container']}>
        <input
          className={classNames}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
    </div>
  )
}
