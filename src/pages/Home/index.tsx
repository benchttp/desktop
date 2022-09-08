import { FC } from 'react'

import { Typography } from '@/components'
import { Tab } from '@/components/Tab'
import { SimpleStream } from '@/examples'

export const Home: FC = () => {
  return (
    <>
      <Typography element="h1">Benchttp</Typography>
      <SimpleStream />
      <Tab color="primary" text="Oui bonsoir" />
    </>
  )
}
