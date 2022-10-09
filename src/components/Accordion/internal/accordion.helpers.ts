import { Dispatch, MouseEventHandler, SetStateAction } from 'react'

import s from './accordion.module.scss'

export const getAccordionClassName = (
  className: string | undefined
): string => {
  const classNames = []

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const getContentClassNames = (expanded: boolean): string => {
  const classNames = [s['accordion__content'], 'pt-2', 'pr-3', 'pl-3', 'pb-3']

  if (expanded) {
    classNames.push(s['accordion__content--expanded'])
  }

  return classNames.join(' ')
}

export const handleExpandClick = (
  setExpanded: Dispatch<SetStateAction<boolean>>
): MouseEventHandler => {
  return () => setExpanded((prevState) => !prevState)
}
