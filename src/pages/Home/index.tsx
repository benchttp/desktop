import { FC } from 'react'

import { Typography } from '@/components'
import { SimpleStream } from '@/examples'
import { useSpawnEngine } from '@/hooks'

export const Home: FC = () => {
  const { isLoading } = useSpawnEngine()

  return (
    <div className="App">
      <Typography element="h1">Benchttp</Typography>
      {isLoading ? <div>Loading</div> : <SimpleStream />}
    </div>
  )
}
