import { IColors } from '@/typing/colors'

export type ITagColor = Extract<
  IColors,
  | IColors.baseWhite
  | IColors.baseGreen
  | IColors.baseRed
  | IColors.httpPost
  | IColors.httpGet
  | IColors.httpPut
  | IColors.httpPatch
  | IColors.httpDelete
>
