import { Dispatch, SetStateAction } from 'react'

export interface IProps {
  body: string
  setBody: Dispatch<SetStateAction<string>>
}
