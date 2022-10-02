import s from './textInput.module.scss'
import { IProps } from './textInput.typings'

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
