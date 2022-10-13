import { IColors } from '@/typing/colors'

export type IStatCardColor = Extract<
  IColors,
  | 'base-white'
  | 'base-blue'
  | 'base-purple'
  | 'base-green'
  | 'base-orange'
  | 'primary'
>
