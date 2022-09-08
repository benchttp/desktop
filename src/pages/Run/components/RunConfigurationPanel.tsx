import { ChevronRight } from 'react-feather'

import { RunConfiguration } from '@/benchttp'
import { Button, Typography } from '@/components'
import { inputConfig } from '@/examples/inputConfig'

interface Props {
  start: (config: RunConfiguration) => void
  redirectOnStart: () => void
}

export const RunConfigurationPanel: React.FC<Props> = ({
  start,
  redirectOnStart,
}) => {
  const config = inputConfig

  const onStart = () => {
    start(config)
    redirectOnStart()
  }

  return (
    <div>
      <Typography element="h3">Configuration</Typography>
      <Button text="Start run" onClick={onStart} iconEnd={ChevronRight} />
    </div>
  )
}
