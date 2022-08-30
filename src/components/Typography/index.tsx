import { FC, useEffect, useState } from 'react'

import { IProps } from './core/typography.interfaces'
import s from './core/typography.module.scss'

export const Typography: FC<IProps> = ({
  children,
  className,
  font,
  size,
  element = 'p',
  weight,
  color,
}) => {
  const [classNames, setClassNames] = useState<string[]>([])

  useEffect(() => {
    const classNames = []

    if (font) {
      classNames.push(s[`typography--font-${font}`])
    }
    if (weight) {
      classNames.push(s[`typography--weight-${weight}`])
    }
    if (size) {
      classNames.push(s[`typography--size-${size}`])
    }
    if (color) {
      classNames.push(s[`typography--color-${color}`])
    }
    if (className) {
      classNames.push(className)
    }

    setClassNames(classNames)
  }, [element, font, size, weight, color, className])

  switch (element) {
    case 'p':
      return <p className={classNames.join(' ')}>{children}</p>
    case 'pre':
      return <pre className={classNames.join(' ')}>{children}</pre>
    case 'span':
      return <span className={classNames.join(' ')}>{children}</span>
    case 'code':
      return <code className={classNames.join(' ')}>{children}</code>
    case 'h1':
      return <h1 className={classNames.join(' ')}>{children}</h1>
    case 'h2':
      return <h2 className={classNames.join(' ')}>{children}</h2>
    case 'h3':
      return <h3 className={classNames.join(' ')}>{children}</h3>
    case 'h4':
      return <h4 className={classNames.join(' ')}>{children}</h4>
    default:
      return null
  }
}
