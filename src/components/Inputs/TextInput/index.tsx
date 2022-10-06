import { FC } from 'react'

import { TestingProps } from '@/testing'

import { getClassName } from './core/textInput.helpers'
import { IProps } from './core/textInput.typings'

export const TextInput: FC<IProps & TestingProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  disabled,
  placeholder,
  type,
  'data-testid': dataTestid,
}) => {
  const classNames = getClassName({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        data-testid={dataTestid}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  )
}
