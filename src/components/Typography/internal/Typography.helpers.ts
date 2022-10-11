import { IColors } from '@/typing/colors'

import s from './typography.module.scss'
import {
  ITypographyFont,
  ITypographySize,
  ITypographyWeight,
} from './Typography.types'

export const getClassName = ({
  font,
  weight,
  size,
  color,
  className,
}: {
  font: ITypographyFont | undefined
  weight: ITypographyWeight | undefined
  size: ITypographySize | undefined
  color: IColors | undefined
  className: string | undefined
}): string => {
  const classNames: string[] = []

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

  return classNames.join(' ')
}
