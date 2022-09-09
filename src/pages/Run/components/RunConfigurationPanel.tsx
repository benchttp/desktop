import { ChevronRight } from 'react-feather'

import { RunConfiguration } from '@/benchttp'
import { Button, Typography } from '@/components'
import { inputConfig } from '@/examples/inputConfig'

interface Props {
  onStart: (config: RunConfiguration) => void
}

export const RunConfigurationPanel: React.FC<Props> = ({ onStart }) => {
  const config = inputConfig

  return (
    <div>
      <Typography element="h3">Configuration</Typography>
      <Button
        text="Start run"
        onClick={() => onStart(config)}
        iconEnd={ChevronRight}
      />
    </div>
  )
}
