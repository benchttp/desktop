import { ReactNode } from 'react'

import { IColors } from '@/interfaces/colors'

export interface IProps {
  children: ReactNode
  className?: string
  font?: 'inter' | 'poppins'
  element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'code' | 'pre' | 'span'
  size?: 'small' | 'base' | 'h4' | 'h3' | 'h2' | 'h1'
  weight?: 'regular' | 'medium' | 'semi' | 'bold'
  color?: IColors
}
