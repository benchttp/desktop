import { ChangeEventHandler, FC, MouseEventHandler } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { TextInput } from '@/components/Inputs'

import { Header } from '../core/headersForm.typings'

interface IProps {
  className?: string
  value: Header
  onChange: (value: Header) => void
  key: number
}

export const HeaderInput: FC<IProps> = ({
  value: header,
  key: headerIndex,
  onChange,
}) => {
  return (
    <div
      key={`header-${headerIndex}`}
      className="f f-direction-row f-ai-center"
    >
      <TextInput
        className="mr-3"
        id={`header-key-${headerIndex}`}
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

const handleHeaderKeyChange = (
  header: Header,
  onChange: (header: Header) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    header.key = e.target.value
    onChange(header)
  }
}

const handleHeaderValueChange = (
  header: Header,
  valueIndex: number,
  onChange: (header: Header) => void
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    header.values[valueIndex] = e.target.value
    onChange(header)
  }
}

const handleAddHeaderValue = (
  header: Header,
  onChange: (header: Header) => void
): MouseEventHandler => {
  return () => {
    header.values.push('')
    onChange(header)
  }
}

const handleRemoveHeaderValue = (
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
