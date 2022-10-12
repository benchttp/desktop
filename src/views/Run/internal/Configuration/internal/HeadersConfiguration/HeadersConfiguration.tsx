import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { Button } from '@/components'

import { SingleHeader } from './internal/components'
import {
  arrayifyHeaders,
  handleAddHeader,
  handleChangeHeader,
  handleRemoveHeader,
} from './internal/HeadersConfiguration.helpers'
import { Headers } from './internal/HeadersConfiguration.types'

interface IProps {
  headers: Headers
  onChange: (headers: Headers) => void
}

export const HeadersConfiguration: FC<IProps> = ({ headers, onChange }) => {
  const arrayHeaders = arrayifyHeaders(headers)

  return (
    <div className="f f-direction-column f-ai-start mt-3">
      {arrayHeaders.map((header, index) => (
        <div className="f f-ai-center mb-4" key={`header-value-${index}`}>
          <SingleHeader
            header={header}
            onChange={handleChangeHeader(arrayHeaders, index, onChange)}
            index={index}
            key={index}
          />
          <Trash
            data-testid={`remove-header-${index}`}
            onClick={handleRemoveHeader(arrayHeaders, index, onChange)}
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
