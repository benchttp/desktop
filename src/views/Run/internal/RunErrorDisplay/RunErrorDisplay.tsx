import { Typography } from '@/components'

interface IProps {
  errors: string[]
}

export const RunErrorDisplay: React.FC<IProps> = ({ errors }) => (
  <section>
    <Typography element="h3">Error</Typography>
    {errors.map((error, index) => (
      <Typography key={index} element="p">
        {error}
      </Typography>
    ))}
  </section>
)
