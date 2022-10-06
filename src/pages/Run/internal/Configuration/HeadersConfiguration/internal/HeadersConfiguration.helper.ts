import { ChangeEventHandler, MouseEventHandler } from 'react'

import { Header } from './HeadersConfiguration.typing'

export const handleHeaderChange = (
  headers: Header[],
  headerIndex: number,
  onChange: (headers: Header[]) => void
): ((header: Header) => void) => {
  return (header) => {
    const newHeaders = [...headers]

    if (header.key === '' && header.values.every((v) => v === '')) {
      onChange(newHeaders.filter((_, index) => index !== headerIndex))
      return
    }

    newHeaders[headerIndex] = header
    onChange(newHeaders)
  }
}

export const handleAddHeader = (
  headers: Header[],
  onChange: (headers: Header[]) => void
): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers, { key: '', values: [''] }]
    onChange(newHeaders)
  }
}

export const handleHeaderKeyChange = (
  header: Header,
  onChange: (header: Header) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    header.key = e.target.value
    onChange(header)
  }
}

export const handleHeaderValueChange = (
  header: Header,
  valueIndex: number,
  onChange: (header: Header) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    header.values[valueIndex] = e.target.value
    onChange(header)
  }
}

export const handleAddHeaderValue = (
  header: Header,
  onChange: (header: Header) => void
): MouseEventHandler => {
  return () => {
    header.values.push('')
    onChange(header)
  }
}

export const handleRemoveHeaderValue = (
  header: Header,
  valueIndex: number,
  onChange: (header: Header) => void
): MouseEventHandler => {
  return () => {
    if (valueIndex === 0 && header.values.length === 1) {
      header.values[valueIndex] = ''
      onChange(header)
      return
    }

    header.values = header.values.filter((_, index) => index !== valueIndex)
    onChange(header)
  }
}
