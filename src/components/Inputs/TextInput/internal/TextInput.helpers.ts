import s from './text-input.module.scss'
import { IProps } from './TextInput.types'

export const getClassNames = ({
  disabled,
  className,
}: Pick<IProps, 'className'> & Pick<Required<IProps>, 'disabled'>) => {
  const classNames: string[] = [s['input-field']]
  if (disabled) {
    classNames.push(s['input-field--disabled'])
  }

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}
