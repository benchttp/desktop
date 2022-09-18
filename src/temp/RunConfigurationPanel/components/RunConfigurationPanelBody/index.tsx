import { FC } from 'react'

import { TextAreaInput } from '@/components/Inputs/TextAreaInput'

import { handleBodyChange } from './core/RunConfigurationPanelBody.helpers'
import { IProps } from './core/RunConfigurationPanelBody.typings'

export const RunConfigurationPanelBody: FC<IProps> = ({ body, setBody }) => {
  return (
    <TextAreaInput
      id="body"
      value={body}
      onChange={handleBodyChange({ setBody })}
    />
  )
}
