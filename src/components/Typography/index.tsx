import { FC } from 'react'

import { getClassNames } from './core/typography.helpers'
import { IProps } from './core/typography.typings'

export const Typography: FC<IProps> = ({
  children,
  className,
  font,
  size,
  element = 'p',
  weight,
  color,
}) => {
  const classNames = getClassNames({ font, weight, size, color, className })

  const props = {
    className: classNames.join(' '),
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
