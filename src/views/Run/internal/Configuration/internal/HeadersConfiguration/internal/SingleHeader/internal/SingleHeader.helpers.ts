import { ChangeEventHandler } from 'react'

import { Header } from './SingleHeader.types'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-ai-center']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const handleChangeHeaderKey = (
  header: Header,
  onChange: (header: Header) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    header.key = e.target.value
    onChange(header)
  }
}

export const isValidHeader = (header: Header): boolean => {
  return header.key !== '' && header.value !== ''
}

export const handleChangeHeaderValue = (
  header: Header,
  onChange: (header: Header) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    header.value = e.target.value
    onChange(header)
  }
}
