import s from './toggle.module.scss'
import { IProps } from './Toggle.typings'

export const getClassNames = ({
  className,
}: Pick<IProps, 'className'>): string[] => {
  const classNames: string[] = [s['toggle'], 'f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames
}
