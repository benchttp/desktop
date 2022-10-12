import { FC } from 'react'

import { TextInput } from '@/components/Inputs'

import s from './internal/single-header.module.scss'
import {
  handleChangeHeaderKey,
  handleChangeHeaderValue,
  isValidHeader,
} from './internal/SingleHeader.helpers'
import { Header } from './internal/SingleHeader.types'

interface IProps {
  header: Header
  index: number
  onChange: (value: Header) => void
}

export const SingleHeader: FC<IProps> = ({ header, index, onChange }) => {
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
        placeholder="Content-Type"
      />
      <TextInput
        className={`${s['single-header__value']}`}
        data-testid={`change-value-header-${index}`}
        id={`header-${index}-values`}
        value={header.value}
        onChange={handleChangeHeaderValue(header, onChange)}
        label="Values ( comma separated )"
        invalid={!isValidHeader(header)}
        placeholder="text/html, multipart/form-data"
        required
      />
    </div>
  )
}
