import { IColors } from '@/typing/colors'

export type ITagColor = Extract<
  IColors,
  | 'base-white'
  | 'base-green'
  | 'base-red'
  | 'http-post'
  | 'http-get'
  | 'http-put'
  | 'http-patch'
  | 'http-delete'
>
