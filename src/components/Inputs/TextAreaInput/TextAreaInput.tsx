import { FC } from 'react'

import { getClassNames } from './internals/TextAreaInput.helpers'
import s from './internal/TextAreaInput.module.scss'
import { IProps } from './internals/TextAreaInput.types'

export const TextAreaInput: FC<IProps> = ({
  className,
  id,
  value,
  onChange,
  label,
  rows,
  disabled,
  placeholder,
}) => {
  const classNames = getClassNames({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        className={s['textarea']}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
