import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'

import { api } from '../engine/api'
import { Cancel } from './Cancel'
import { Run } from './Run'
import { Stream } from './Stream'

export const EngineCommunication: React.FunctionComponent = () => {
  return (
    <ApiProvider api={api}>
      <div>
        <div>
          <Run />
          <Cancel />
        </div>

        <Stream />
      </div>
    </ApiProvider>
  )
}
