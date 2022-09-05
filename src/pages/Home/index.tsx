import { FC } from 'react'

import { Typography } from '@/components'
import { SimpleStream } from '@/examples'

export const Home: FC = () => {
  return (
    <>
      <Typography element="h1">Benchttp</Typography>
      <SimpleStream />
    </>
  )
}
