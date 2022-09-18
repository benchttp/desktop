import { IProps } from './textInput.typings'

export const getClassName = ({
  className,
}: Pick<IProps, 'className'>): string[] => {
  const classNames: string[] = ['f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames
}
