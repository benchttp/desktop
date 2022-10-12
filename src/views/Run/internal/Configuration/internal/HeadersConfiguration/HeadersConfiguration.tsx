import { FC } from 'react'
import { PlusSquare, Trash } from 'react-feather'

import { Button, IconButton } from '@/components'

import { SingleHeader } from './internal/components'
import s from './internal/headers-configuration.module.scss'
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
            onChange={handleChangeHeader({
              headers: arrayHeaders,
              index,
              onChange,
            })}
            index={index}
            key={index}
          />
          <IconButton
            className="ml-3"
            icon={Trash}
            data-testid={`remove-header-${index}`}
            onClick={handleRemoveHeader({
              headers: arrayHeaders,
              index,
              onChange,
            })}
          />
        </div>
      ))}
      <Button
        className={s['header-configuration__add-button']}
        data-testid="add-header"
        text="Add a new header"
        small
        iconEnd={PlusSquare}
        onClick={handleAddHeader({ headers: arrayHeaders, onChange })}
        style="outlined"
      />
    </div>
  )
}
