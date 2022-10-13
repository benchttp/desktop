import { Typography } from '@/components'

interface IProps {
  className?: string
  errors: string[]
}

export const RunErrorDisplay: React.FC<IProps> = ({ errors, className }) => (
  <section className={className}>
    <Typography element="h3">Error</Typography>
    {errors.map((error, index) => (
      <Typography key={index} element="p">
        {error}
      </Typography>
    ))}
  </section>
)
