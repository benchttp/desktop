import { FC } from 'react'

export interface AppRoute {
  key: string
  path: string
  element: FC
}
