import { FC } from 'react'

import { getClassName } from './core/selectInput.helpers'
import { IProps } from './core/selectInput.typings'

export type { IProps as ISelectInputProps } from './core/selectInput.typings'

export const SelectInput: FC<IProps> = ({
  value,
  onChange,
  id,
  label,
  options,
  className,
  disabled,
}) => {
  const classNames = getClassName({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <select disabled={disabled} value={value} onChange={onChange}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.display}
          </option>
        ))}
      </select>
    </div>
  )
}
