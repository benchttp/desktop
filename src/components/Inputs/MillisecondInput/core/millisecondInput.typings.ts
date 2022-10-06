export interface IProps {
  className?: string
  id: string
  value: `${number}ms` | undefined
  onChange: (value: `${number}ms` | undefined) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}
