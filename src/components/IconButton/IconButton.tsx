import { FC, MouseEventHandler, useRef } from 'react'
import { Icon } from 'react-feather'

import { TestingProps } from '@/testing'

import {
  createIcon,
  getClassName,
  handleClick,
} from './internal/IconButton.helpers'

interface IProps {
  className?: string
  icon: Icon
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export const IconButton: FC<IProps & TestingProps> = ({
  icon,
  className,
  onClick,
  'data-testid': dataTestid,
  disabled,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <button
      ref={buttonRef}
      className={getClassName(className)}
      type="button"
      onClick={handleClick({ buttonRef, onClick })}
      disabled={disabled}
      data-testid={dataTestid}
    >
      {createIcon(icon)}
    </button>
  )
}
