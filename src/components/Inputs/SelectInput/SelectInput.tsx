import { FC } from 'react'

import { getClassName } from './internals/SelectInput.helpers'
import s from './internals/SelectInput.module.scss'
import { IProps } from './internals/SelectInput.types'

export type { IProps as IPropsSelectInput } from './internals/SelectInput.types'

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
