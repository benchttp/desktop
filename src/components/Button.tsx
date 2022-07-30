import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  action: () => void
  disabled?: boolean
}

export const Button: React.FunctionComponent<Props> = ({
  action,
  disabled,
  children,
}: Props) => {
  return (
    <button onClick={action} disabled={disabled}>
      {children}
    </button>
  )
}
