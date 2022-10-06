export interface IProps {
  className?: string
  id: string
  value: number | undefined
  onChange: (value: number | undefined) => void
  label?: string
  disabled?: boolean
  placeholder?: string
}
