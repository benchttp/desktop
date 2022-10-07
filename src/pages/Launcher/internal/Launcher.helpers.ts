import { MouseEventHandler } from 'react'
import { NavigateFunction } from 'react-router-dom'

export const handleStartClick = (
  navigate: NavigateFunction
): MouseEventHandler => {
  return () => {
    navigate('run')
  }
}

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-center']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}
