import { IProps } from './typography.interfaces'
import s from './typography.module.scss'

export const getClassNames = (
  font: IProps['font'],
  weight: IProps['weight'],
  size: IProps['size'],
  color: IProps['color'],
  className: IProps['className']
): string[] => {
  const classNames = []

  if (font) {
    classNames.push(s[`typography--font-${font}`])
  }
  if (weight) {
    classNames.push(s[`typography--weight-${weight}`])
  }
  if (size) {
    classNames.push(s[`typography--size-${size}`])
  }
  if (color) {
    classNames.push(s[`typography--color-${color}`])
  }
  if (className) {
    classNames.push(className)
  }

  return classNames
}
