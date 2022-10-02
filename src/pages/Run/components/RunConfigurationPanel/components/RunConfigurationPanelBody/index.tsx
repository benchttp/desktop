import { FC } from 'react'

import { TextAreaInput } from '@/components/Inputs'

import { handleBodyChange } from './core/RunConfigurationPanelBody.helpers'
import { IProps } from './core/RunConfigurationPanelBody.typings'

export const RunConfigurationPanelBody: FC<IProps> = ({ body, setBody }) => {
  return (
    <TextAreaInput
      id="body"
      value={body}
      rows={7}
      className="mt-3"
      placeholder="{ firstname: “John”, lastname: “Doe }"
      onChange={handleBodyChange({ setBody })}
    />
  )
}
