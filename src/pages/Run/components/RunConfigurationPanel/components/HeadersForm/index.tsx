import { ChangeEventHandler, FC, MouseEventHandler } from 'react'
import { Trash, PlusSquare } from 'react-feather'

import { Button } from '@/components'
import { TextInput } from '@/components/Inputs'

interface IProps {
  headers: { key: string; values: string[] }[]
  setHeaders: (headers: { key: string; values: string[] }[]) => void
}

export const HeadersForm: FC<IProps> = ({ headers, setHeaders }) => {
  return (
    <div className="f f-direction-column f-ai-start">
      {headers.map((header, headerIndex) => (
        <div
          key={`header-${headerIndex}`}
          className="f f-direction-row f-ai-center"
        >
          <TextInput
            className="mr-3"
            id={`header-key-${headerIndex}`}
            value={header.key}
            onChange={handleHeaderKeyChange({
              headerIndex,
              headers,
              setHeaders,
            })}
            label="Key"
          />
          <div className="f f-direction-column">
            {header.values.map((headerValue, headerValueIndex) => (
              <div
                className="f f-direction-row f-ai-center mb-3"
                key={`header-value-${headerValueIndex}`}
              >
                <TextInput
                  className="mr-3"
                  id={`header-value-${headerValueIndex}`}
                  value={headerValue}
                  onChange={handleHeaderValueChange({
                    headerIndex,
                    headerValueIndex,
                    headers,
                    setHeaders,
                  })}
                  label="Value"
                />
                <Trash
                  onClick={handleRemoveHeaderValue({
                    headerIndex,
                    headerValueIndex,
                    headers,
                    setHeaders,
                  })}
                  className="mr-3"
                />
                {headerValueIndex === header.values.length - 1 && (
                  <PlusSquare
                    onClick={handleAddHeaderValue({
                      headerIndex,
                      headers,
                      setHeaders,
                    })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        text="Add a new header"
        small
        iconEnd={PlusSquare}
        onClick={handleAddHeader({ headers, setHeaders })}
        style="outlined"
      />
    </div>
  )
}

const handleHeaderKeyChange = ({
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

const handleHeaderValueChange = ({
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

const handleAddHeaderValue = ({
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

const handleRemoveHeaderValue = ({
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

const handleAddHeader = ({
  headers,
  setHeaders,
}: Pick<IProps, 'headers' | 'setHeaders'>): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers, { key: '', values: [''] }]
    setHeaders(newHeaders)
  }
}
