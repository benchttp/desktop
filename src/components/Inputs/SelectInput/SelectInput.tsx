import { ChangeEventHandler, FC } from 'react'
import { ChevronDown } from 'react-feather'

import { Typography } from '@/components/Typography'
import { TestingProps } from '@/testing'

import s from './internal/select-input.module.scss'
import {
  getClassName,
  getIconClassName,
  getLabelClassName,
  getSelectClassName,
} from './internal/SelectInput.helpers'

interface IProps extends TestingProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: { value: string; display: string; disabled?: boolean }[]
  label?: string
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
}

export const SelectInput: FC<IProps> = ({
  value,
  onChange,
  id,
  label,
  options,
  className,
  disabled = false,
  invalid,
  'data-testid': dataTestid,
  placeholder,
}) => {
  return (
    <div className={getClassName(className)}>
      {label && (
        <label className={getLabelClassName(disabled)} htmlFor={id}>
          <Typography element="span" weight="semi">
            {label}
          </Typography>
        </label>
      )}
      <div className={`${s['select-input__wrapper']}`}>
        <select
          disabled={disabled}
          value={value}
          onChange={onChange}
          data-testid={dataTestid}
          className={getSelectClassName({ placeholder, value })}
          aria-invalid={invalid || false}
        >
          {placeholder && (
            <option value="" hidden disabled>
              {placeholder}
            </option>
          )}
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
        <ChevronDown size={16} className={getIconClassName(disabled)} />
      </div>
    </div>
  )
}
