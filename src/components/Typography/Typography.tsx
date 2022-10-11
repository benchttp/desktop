import { FC, ReactNode } from 'react'

import { IColors } from '@/typing/colors'

import { getClassName } from './internal/Typography.helpers'
import {
  ITypographyElement,
  ITypographyFont,
  ITypographySize,
  ITypographyWeight,
} from './internal/Typography.types'

interface IProps {
  children: ReactNode
  className?: string
  font?: ITypographyFont
  element?: ITypographyElement
  size?: ITypographySize
  weight?: ITypographyWeight
  color?: IColors
}

export const Typography: FC<IProps> = ({
  children,
  className,
  font,
  size,
  element = 'p',
  weight,
  color,
}) => {
  const props = {
    className: getClassName({ font, weight, size, color, className }),
    children,
  }

  switch (element) {
    case 'p':
      return <p {...props} />
    case 'pre':
      return <pre {...props} />
    case 'span':
      return <span {...props} />
    case 'code':
      return <code {...props} />
    case 'h1':
      return <h1 {...props} />
    case 'h2':
      return <h2 {...props} />
    case 'h3':
      return <h3 {...props} />
    case 'h4':
      return <h4 {...props} />
    default:
      return null
  }
}
