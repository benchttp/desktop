import { ChangeEventHandler, FC } from 'react'

import {
  getClassName,
  getTextAreaClassName,
} from './internal/TextAreaInput.helpers'
import { ITextAreaResize } from './internal/TextAreaInput.types'

interface IProps {
  className?: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  label?: string
  disabled?: boolean
  placeholder?: string
  rows?: number
  resize?: ITextAreaResize
}

export const TextAreaInput: FC<IProps> = ({
  className,
  id,
  value,
  onChange,
  label,
  rows,
  disabled,
  placeholder,
  resize,
}) => {
  return (
    <div className={getClassName(className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        className={getTextAreaClassName(resize)}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
