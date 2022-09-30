import { RunConfiguration } from '@/benchttp'

export interface IProps {
  onStart: (config: RunConfiguration) => void
}
