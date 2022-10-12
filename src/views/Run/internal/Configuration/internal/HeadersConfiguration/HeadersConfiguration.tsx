import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { Button } from '@/components'
import { TextInput } from '@/components/Inputs'

import {
  arrayifyHeaders,
  handleAddHeader,
  handleChangeHeader,
  handleChangeHeaderKey,
  handleChangeHeaderValue,
  handleRemoveHeader,
  isValidHeader,
} from './internal/HeadersConfiguration.helpers'
import { Header, Headers } from './internal/HeadersConfiguration.types'

interface IProps {
  headers: Headers
  onChange: (headers: Headers) => void
}

export const HeadersConfiguration: FC<IProps> = ({ headers, onChange }) => {
  const arrayHeaders = arrayifyHeaders(headers)

  return (
    <div className="f f-direction-column f-ai-start mt-3 mb-3">
      {arrayHeaders.map((header, index) => (
        <div
          className="f f-direction-row f-ai-center mb-3"
          key={`header-value-${index}`}
        >
          <SingleHeader
            header={header}
            onChange={handleChangeHeader(arrayHeaders, index, onChange)}
            index={index}
            key={index}
          />
          <Trash
            data-testid={`remove-header-${index}`}
            onClick={handleRemoveHeader(arrayHeaders, index, onChange)}
            className="mr-3"
          />
        </div>
      ))}
      <Button
        data-testid="add-header"
        text="Add a new header"
        small
        iconEnd={PlusSquare}
        onClick={handleAddHeader(arrayHeaders, onChange)}
        style="outlined"
      />
    </div>
  )
}

interface IPropsSingleHeader {
  header: Header
  index: number
  onChange: (value: Header) => void
}

const SingleHeader: FC<IPropsSingleHeader> = ({ header, index, onChange }) => {
  return (
    <div key={`header-${index}`} className="f f-direction-row f-ai-center">
      <TextInput
        data-testid={`change-key-header-${index}`}
        className="mr-3"
        id={`header-${index}-key`}
        value={header.key}
        onChange={handleChangeHeaderKey(header, onChange)}
        label="Key"
        invalid={!isValidHeader(header)}
        required
      />
      <TextInput
        data-testid={`change-value-header-${index}`}
        className="mr-3"
        id={`header-${index}-values`}
        value={header.value}
        onChange={handleChangeHeaderValue(header, onChange)}
        label="Values"
        helper="Accept many if comma separated"
        invalid={!isValidHeader(header)}
        required
      />
    </div>
  )
}
