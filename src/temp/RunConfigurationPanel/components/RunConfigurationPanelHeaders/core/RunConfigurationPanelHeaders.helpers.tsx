import { ChangeEventHandler, MouseEventHandler } from 'react'

import { IProps } from './RunConfigurationPanelHeaders.typings'

export const handleHeaderKeyChange = ({
  headerIndex,
  headers,
  setHeaders,
}: {
  headerIndex: number
} & Pick<
  IProps,
  'headers' | 'setHeaders'
>): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    const newHeaders = [...headers]
    newHeaders[headerIndex].key = e.target.value
    setHeaders(newHeaders)
  }
}

export const handleHeaderValueChange = ({
  headerIndex,
  headerValueIndex,
  headers,
  setHeaders,
}: {
  headerIndex: number
  headerValueIndex: number
} & Pick<
  IProps,
  'headers' | 'setHeaders'
>): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    const newHeaders = [...headers]
    newHeaders[headerIndex].values[headerValueIndex] = e.target.value
    setHeaders(newHeaders)
  }
}

export const handleAddHeaderValue = ({
  headerIndex,
  headers,
  setHeaders,
}: { headerIndex: number } & Pick<
  IProps,
  'headers' | 'setHeaders'
>): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers]
    newHeaders[headerIndex].values.push('')
    setHeaders(newHeaders)
  }
}

export const handleRemoveHeaderValue = ({
  headerIndex,
  headerValueIndex,
  headers,
  setHeaders,
}: {
  headerIndex: number
  headerValueIndex: number
} & Pick<IProps, 'headers' | 'setHeaders'>): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers]

    if (headerValueIndex === 0 && newHeaders[headerIndex].values.length === 1) {
      if (newHeaders.length === 1) {
        newHeaders[headerIndex].key = ''
        newHeaders[headerIndex].values[headerValueIndex] = ''
        setHeaders(newHeaders)
        return
      }

      setHeaders(newHeaders.filter((_, index) => index !== headerIndex))
      return
    }

    newHeaders[headerIndex].values = newHeaders[headerIndex].values.filter(
      (_, index) => index !== headerValueIndex
    )

    setHeaders(newHeaders)
  }
}

export const handleAddHeader = ({
  headers,
  setHeaders,
}: Pick<IProps, 'headers' | 'setHeaders'>): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers, { key: '', values: [''] }]
    setHeaders(newHeaders)
  }
}
