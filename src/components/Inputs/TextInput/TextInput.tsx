import { FC } from 'react'

import { TestingProps } from '@/testing'

import { getClassNames } from './internal/textInput.helpers'
import s from './internal/textInput.module.scss'
import { IProps } from './internal/textInput.types'

export const TextInput: FC<IProps & TestingProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  disabled = false,
  placeholder,
  type,
  invalid,
  'data-testid': dataTestid,
}) => {
  const classNames = getClassNames({ className, disabled })

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={s['input-container']}>
        <input
          className={classNames}
          data-testid={dataTestid}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          type={type}
          aria-invalid={`${invalid || false}`}
        />
      </div>
    </div>
  )
}
