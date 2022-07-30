import { Button } from 'components'
import { useStartRunMutation } from 'engine/api'

import config from './benchttp.json'

export const Run: React.FunctionComponent = () => {
  const [send] = useStartRunMutation()

  const start = () => {
    send({ data: config })
  }

  return <Button action={start}>Run</Button>
}
