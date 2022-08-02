import { Button } from 'components'
import { useCancelRunMutation } from 'engine/api'

export const Cancel: React.FunctionComponent = () => {
  const [send] = useCancelRunMutation()

  const cancel = () => {
    send()
  }

  return <Button action={cancel}>Stop</Button>
}
