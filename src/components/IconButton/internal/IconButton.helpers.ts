import { createElement, MouseEventHandler, ReactNode, RefObject } from 'react'
import { Icon } from 'react-feather'

import s from './icon-button.module.scss'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = [s['icon-button'], 'f', 'f-center', 'p-2']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const handleClick = ({
  buttonRef,
  onClick,
}: {
  buttonRef: RefObject<HTMLButtonElement>
  onClick: MouseEventHandler<HTMLButtonElement>
}): MouseEventHandler<HTMLButtonElement> | undefined => {
  return (e) => {
    if (!buttonRef.current) {
      return
    }

    buttonRef.current.classList.add(s['icon-button--clicked'])

    setTimeout(() => {
      if (!buttonRef.current) {
        return
      }

      buttonRef.current.classList.remove(s['icon-button--clicked'])
    }, 500)

    onClick(e)
  }
}

export const createIcon = (icon: Icon): ReactNode => {
  return createElement(icon, { size: 18, className: s['icon-button__icon'] })
}
