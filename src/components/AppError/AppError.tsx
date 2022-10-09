import { Typography } from '@/components'

interface IProps {
  error: string
}

export const AppError: React.FC<IProps> = ({ error }) => (
  <section>
    <Typography element="h3">Error</Typography>
    <Typography element="p">{error}</Typography>
  </section>
)
