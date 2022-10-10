import { IColors } from '@/typing/colors'

export type IButtonColor = Extract<IColors, 'base-white' | 'primary'>

export type IButtonStyle = 'full' | 'outlined'
