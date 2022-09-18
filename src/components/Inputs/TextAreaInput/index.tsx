import { FC } from 'react'

import { getClassNames } from './core/textAreaInput.helpers'
import { IProps } from './core/textAreaInput.typings'

export const TextAreaInput: FC<IProps> = ({
  className,
  id,
  value,
  onChange,
  label,
  disabled,
  placeholder,
}) => {
  const classNames = getClassNames({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
