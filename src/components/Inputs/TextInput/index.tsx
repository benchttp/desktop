import { FC } from 'react'

import { getClassName } from './core/textInput.helpers'
import { IProps } from './core/textInput.typings'

export const TextInput: FC<IProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  disabled,
  placeholder,
}) => {
  const classNames = getClassName({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
