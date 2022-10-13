import { Typography } from '@/components'

interface IProps {
  className?: string
  error: string
}

export const AppError: React.FC<IProps> = ({ error, className }) => (
  <section className={className}>
    <Typography element="h3">Error</Typography>
    <Typography element="p">{error}</Typography>
  </section>
)
