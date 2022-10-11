import { FC } from 'react'

import { Typography } from '@/components/Typography'

import {
  getButtonClassName,
  getClassName,
  getLabelClassName,
  getWrapperClassName,
  handleInputChange,
  handleToggleClick,
} from './internal/Toggle.helpers'
import { IToggleLabelPosition } from './internal/Toggle.types'

interface IProps {
  className?: string
  id: string
  checked: boolean
  onChange: (value: boolean) => void
  label?: string
  labelPosition?: IToggleLabelPosition
}

export const Toggle: FC<IProps> = ({
  className,
  id,
  checked,
  onChange,
  label,
  labelPosition = 'left',
}) => {
  return (
    <div className={getClassName({ className, labelPosition })}>
      {label && (
        <label htmlFor={id} className={getLabelClassName(labelPosition)}>
          <Typography element="span" weight="semi">
            {label}
          </Typography>
        </label>
      )}
      <div
        onClick={handleToggleClick({ onChange, checked })}
        className={getWrapperClassName(checked)}
      >
        <input
          id={id}
          checked={checked}
          onChange={handleInputChange(onChange)}
          type="checkbox"
          hidden
        />
        <div className={getButtonClassName(checked)}></div>
      </div>
    </div>
  )
}
