import { FC } from 'react'
import { CheckCircle, PieChart, Settings } from 'react-feather'

import { Typography } from '@/components'
import { Tab } from '@/components/Tab'
import { SimpleStream } from '@/examples'

export const Home: FC = () => {
  return (
    <>
      <Typography element="h1">Benchttp</Typography>
      <SimpleStream />
      <Tab color="primary" text="Configure" iconStart={Settings} />
      <Tab color="white" text="Test results" iconStart={CheckCircle} />
      <Tab color="white" text="Summary" iconStart={PieChart} />
    </>
  )
}
