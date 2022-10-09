import { FC } from 'react'

import { TestingProps } from '@/testing'

import { getClassNames } from './TextInput.helpers'
import { IProps } from './internals/TextInput.types'

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
      <div>
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
