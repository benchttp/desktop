import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { Button } from '@/components'
import { TextInput } from '@/components/Inputs'

import {
  handleAddHeader,
  handleAddHeaderValue,
  handleHeaderChange,
  handleHeaderKeyChange,
  handleHeaderValueChange,
  handleRemoveHeaderValue,
} from './internal/HeadersConfiguration.helper'
import { Header } from './internal/HeadersConfiguration.typing'

interface IProps {
  headers: Header[]
  onChange: (headers: Header[]) => void
}

export const HeadersConfiguration: FC<IProps> = ({ headers, onChange }) => {
  return (
    <div className="f f-direction-column f-ai-start">
      {headers.map((header, headerIndex) => (
        <SingleHeader
          header={header}
          onChange={handleHeaderChange(headers, headerIndex, onChange)}
          key={headerIndex}
        />
      ))}
      <Button
        text="Add a new header"
        small
        iconEnd={PlusSquare}
        onClick={handleAddHeader(headers, onChange)}
        style="outlined"
      />
    </div>
  )
}

interface IPropsSingleHeader {
  className?: string
  header: Header
  onChange: (value: Header) => void
  key: number
}

const SingleHeader: FC<IPropsSingleHeader> = ({ header, key, onChange }) => {
  return (
    <div key={`header-${key}`} className="f f-direction-row f-ai-center">
      <TextInput
        className="mr-3"
        id={`header-key-${key}`}
        value={header.key}
        onChange={handleHeaderKeyChange(header, onChange)}
        label="Key"
      />
      {header.values.map((value, valueIndex) => (
        <div
          className="f f-direction-row f-ai-center mb-3"
          key={`header-value-${valueIndex}`}
        >
          <TextInput
            className="mr-3"
            id={`header-value-${valueIndex}`}
            value={value}
            onChange={handleHeaderValueChange(header, valueIndex, onChange)}
            label="Value"
          />
          <Trash
            onClick={handleRemoveHeaderValue(header, valueIndex, onChange)}
            className="mr-3"
          />
          {valueIndex === header.values.length - 1 && (
            <PlusSquare onClick={handleAddHeaderValue(header, onChange)} />
          )}
        </div>
      ))}
    </div>
  )
}
