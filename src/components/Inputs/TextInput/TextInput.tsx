import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import { AlertCircle } from 'react-feather'

import { Tooltip } from '@/components'
import { Typography } from '@/components/Typography'
import { TestingProps } from '@/testing'

import s from './internal/text-input.module.scss'
import { getClassName, getLabelClassName } from './internal/TextInput.helpers'

interface IProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  label?: string
  disabled?: boolean
  placeholder?: string
  type?: HTMLInputTypeAttribute
  hint?: string
  invalid?: boolean
  required?: boolean
}

export const TextInput: FC<IProps & TestingProps> = ({
  value,
  onChange,
  label,
  id,
  className,
  disabled = false,
  placeholder,
  type,
  hint,
  invalid,
  required,
  'data-testid': dataTestid,
}) => {
  return (
    <div className={getClassName(className)}>
      <div className="f f-ai-center mb-2">
        {label && (
          <label className={getLabelClassName(disabled)} htmlFor={id}>
            <Typography element="span" weight="semi">
              {label}
            </Typography>
          </label>
        )}
        {hint && <Tooltip className="ml-2" icon={AlertCircle} text={hint} />}
      </div>
      <input
        className={`${s['text-input__input']} pb-2`}
        data-testid={dataTestid}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        aria-invalid={invalid || false}
      />
    </div>
  )
}
