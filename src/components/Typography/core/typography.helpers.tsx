import s from './typography.module.scss'
import { IProps } from './typography.typings'

export const getClassNames = ({
  font,
  weight,
  size,
  color,
  className,
}: Pick<
  IProps,
  'font' | 'weight' | 'size' | 'color' | 'className'
>): string[] => {
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
