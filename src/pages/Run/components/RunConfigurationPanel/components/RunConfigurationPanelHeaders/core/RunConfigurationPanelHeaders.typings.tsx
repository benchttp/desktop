import { Dispatch, SetStateAction } from 'react'

export interface IProps {
  headers: { key: string; values: string[] }[]
  setHeaders: Dispatch<SetStateAction<{ key: string; values: string[] }[]>>
}
