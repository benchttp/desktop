import { FC } from 'react'

import { getClassNames } from './core/textAreaInput.helpers'
import s from './core/textAreaInput.module.scss'
import { IProps } from './core/textAreaInput.typings'

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
