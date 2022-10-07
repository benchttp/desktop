import { FC } from 'react'

export interface IAppRoute {
  key: string
  path: string
  element: FC<{ className?: string }>
  className?: string
}
