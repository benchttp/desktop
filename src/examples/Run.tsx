import { Button } from 'components'
import { useDoRunMutation } from 'engine/api'

import config from './benchttp.json'

export const Run: React.FunctionComponent = () => {
  const [send] = useDoRunMutation()

  const start = () => {
    send({ data: config })
  }

  return <Button action={start}>Run</Button>
}
