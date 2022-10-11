export const getClassNames = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}
