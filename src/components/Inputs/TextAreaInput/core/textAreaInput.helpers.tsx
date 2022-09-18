import { IProps } from './textAreaInput.typings'

export const getClassNames = ({
  className,
}: Pick<IProps, 'className'>): string[] => {
  const classNames: string[] = ['f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames
}
