import s from './text-input.module.scss'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const getLabelClassName = (disabled: boolean): string => {
  const classNames: string[] = [s['text-input__label']]

  if (disabled) {
    classNames.push(s['text-input__label--disabled'])
  }

  return classNames.join(' ')
}
