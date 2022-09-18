import { ChangeEventHandler } from 'react'

import { IProps } from './RunConfigurationPanelBody.typings'

export const handleBodyChange = ({
  setBody,
}: Pick<IProps, 'setBody'>): ChangeEventHandler<HTMLTextAreaElement> => {
  return (e) => {
    setBody(e.target.value)
  }
}
