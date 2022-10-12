import { FC } from 'react'
import { AlertCircle } from 'react-feather'

import { Tooltip } from '@/components'
import { TestingProps } from '@/testing'

import { getClassNames } from './internal/TextInput.helpers'
import { IProps } from './internal/TextInput.types'

export const TextInput: FC<IProps & TestingProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  disabled = false,
  placeholder,
  type,
  helper,
  invalid,
  required,
  'data-testid': dataTestid,
}) => {
  const classNames = getClassNames({ className, disabled })

  return (
    <div>
      {label && (
        <label className="f" htmlFor={id}>
          {label}
          {helper && (
            <Tooltip className="ml-2" icon={AlertCircle} text={helper} />
          )}
        </label>
      )}
      <div>
        <input
          className={classNames}
          data-testid={dataTestid}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          type={type}
          aria-invalid={`${invalid || false}`}
        />
      </div>
    </div>
  )
}
