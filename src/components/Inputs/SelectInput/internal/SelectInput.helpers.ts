import s from './select-input.module.scss'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const getLabelClassName = (disabled: boolean): string => {
  const classNames: string[] = ['mb-2']

  if (disabled) {
    classNames.push(s['select-input__label--disabled'])
  }

  return classNames.join(' ')
}

export const getSelectClassName = ({
  placeholder,
  value,
}: {
  placeholder: string | undefined
  value: string
}) => {
  const classNames: string[] = [s['select-input__select'], 'pb-2', 'pr-3']

  if (placeholder && value === '') {
    classNames.push(s['select-input__select--placeholder'])
  }

  return classNames.join(' ')
}

export const getIconClassName = (disabled: boolean): string => {
  const classNames: string[] = [s['select-input__icon'], 'pb-2']

  if (disabled) {
    classNames.push(s['select-input__icon--disabled'])
  }

  return classNames.join(' ')
}
