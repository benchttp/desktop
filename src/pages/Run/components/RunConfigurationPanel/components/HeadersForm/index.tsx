import { FC, MouseEventHandler } from 'react'
import { PlusSquare } from 'react-feather'

import { Button } from '@/components'

import { HeaderInput } from './components'
import { Header } from './core/headersForm.typings'

interface IProps {
  headers: Header[]
  setHeaders: (headers: Header[]) => void
}

export const HeadersForm: FC<IProps> = ({ headers, setHeaders }) => {
  return (
    <div className="f f-direction-column f-ai-start">
      {headers.map((header, headerIndex) => (
        <HeaderInput
          key={headerIndex}
          value={header}
          onChange={handleHeaderChange(headers, headerIndex, setHeaders)}
        />
      ))}
      <Button
        text="Add a new header"
        small
        iconEnd={PlusSquare}
        onClick={handleAddHeader(headers, setHeaders)}
        style="outlined"
      />
    </div>
  )
}

const handleHeaderChange = (
  headers: Header[],
  headerIndex: number,
  onChange: (headers: Header[]) => void
): ((header: Header) => void) => {
  return (header) => {
    const newHeaders = [...headers]
    newHeaders[headerIndex] = header
    onChange(newHeaders)
  }
}

const handleAddHeader = (
  headers: Header[],
  onChange: (headers: Header[]) => void
): MouseEventHandler => {
  return () => {
    const newHeaders = [...headers, { key: '', values: [''] }]
    onChange(newHeaders)
  }
}
