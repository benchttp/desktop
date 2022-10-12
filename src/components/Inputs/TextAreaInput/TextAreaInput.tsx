import { FC } from 'react'

import s from './internal/text-area-input.module.scss'
import { getClassNames } from './internal/TextAreaInput.helpers'
import { IProps } from './internal/TextAreaInput.types'

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
  return (
    <div className={getClassNames(className)}>
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
