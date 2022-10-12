import { MouseEventHandler } from 'react'

import { Headers } from './HeadersConfiguration.types'
import { Header } from './SingleHeader/internal/SingleHeader.types'

export const arrayifyHeaders = (headers: Headers): Header[] => {
  return Object.entries(headers).map(([key, value]) => ({
    key,
    value: value.join(', '),
  }))
}

const splitOnComma = (values: string) => values.split(',').map((v) => v.trim())

const objectifyHeaders = (headers: Header[]): Headers => {
  return headers.reduce<Headers>((acc, { key, value }) => {
    if (key === '') {
      console.warn(
        'Empty header key, setting HeadersConfiguration state to invalid'
      )
    }
    return {
      ...acc,
      [key]: splitOnComma(value),
    }
  }, {})
}

const adaptChangeHandler = (handler: (headers: Headers) => void) => {
  return (headers: Header[]) => {
    handler(objectifyHeaders(headers))
  }
}

export const handleChangeHeader = (
  headers: Header[],
  index: number,
  onChange: (headers: Headers) => void
): ((header: Header) => void) => {
  return (header) => {
    const newHeaders = [...headers]
    newHeaders[index] = header
    adaptChangeHandler(onChange)(newHeaders)
  }
}

export const handleAddHeader = (
  headers: Header[],
  onChange: (headers: Headers) => void
): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers, { key: '', value: '' }]
    adaptChangeHandler(onChange)(newHeaders)
  }
}

export const handleRemoveHeader = (
  headers: Header[],
  index: number,
  onChange: (headers: Headers) => void
): MouseEventHandler => {
  return () => {
    const newHeaders = headers.filter((_, i) => i !== index)
    adaptChangeHandler(onChange)(newHeaders)
  }
}
