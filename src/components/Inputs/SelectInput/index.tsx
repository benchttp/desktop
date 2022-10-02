import { FC } from 'react'

import { getClassName } from './core/selectInput.helpers'
import s from './core/selectInput.module.scss'
import { IProps } from './core/selectInput.typings'

export type { IProps as IPropsSelectInput } from './core/selectInput.typings'

export const SelectInput: FC<IProps> = ({
  value,
  onChange,
  id,
  label,
  options,
  className,
  disabled,
  'data-testid': dataTestid,
}) => {
  const classNames = getClassName({ className })

  return (
    <div className={classNames.join(' ')}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        disabled={disabled}
        value={value}
        onChange={onChange}
        data-testid={dataTestid}
        className={s['select']}
      >
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
