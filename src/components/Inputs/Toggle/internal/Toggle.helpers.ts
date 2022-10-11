import { ChangeEventHandler, MouseEventHandler } from 'react'

import s from './toggle.module.scss'
import { IToggleLabelPosition } from './Toggle.types'

export const getClassName = ({
  labelPosition,
  className,
}: {
  labelPosition: IToggleLabelPosition
  className: string | undefined
}): string => {
  const classNames: string[] = ['f', 'f-ai-center']

  if (labelPosition === 'right') {
    classNames.push('f-direction-row-reverse')
  }

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const getLabelClassName = (
  labelPosition: IToggleLabelPosition
): string => {
  const classNames: string[] = [s['toggle__label']]

  if (labelPosition === 'left') {
    classNames.push('mr-2')
  } else {
    classNames.push('ml-2')
  }

  return classNames.join(' ')
}

export const handleToggleClick = ({
  onChange,
  checked,
}: {
  onChange: (value: boolean) => void
  checked: boolean
}): MouseEventHandler => {
  return () => {
    onChange(!checked)
  }
}

export const handleInputChange = (
  onChange: (value: boolean) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    onChange(e.target.checked)
  }
}

export const getWrapperClassName = (checked: boolean): string => {
  const classNames: string[] = [s['toggle__wrapper']]

  if (checked) {
    classNames.push(s['toggle__wrapper--checked'])
  }

  return classNames.join(' ')
}

export const getButtonClassName = (checked: boolean): string => {
  const classNames: string[] = [s['toggle__button']]

  if (checked) {
    classNames.push(s['toggle__button--checked'])
  }

  return classNames.join(' ')
}
