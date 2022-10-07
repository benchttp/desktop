import {
  CSSProperties,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'react'

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

export const getStyle = (
  expanded: boolean,
  collapsedScale: number | undefined,
  target: 'accordion' | 'wrapper'
): CSSProperties | undefined => {
  if (!collapsedScale || expanded) {
    return
  }

  return {
    transform:
      target === 'accordion'
        ? `scaleY(${collapsedScale})`
        : `scaleY(${1 / collapsedScale})`,
  }
}

export const calculateCollapsedScale = (
  accordion: HTMLDivElement | null,
  accordionTitle: HTMLDivElement | null
): number | undefined => {
  if (!accordion || !accordionTitle) {
    return
  }

  const expanded = accordion.getBoundingClientRect()
  const collapsed = accordionTitle.getBoundingClientRect()

  return collapsed.height / expanded.height
}

export const handleExpandeClick = (
  setExpanded: Dispatch<SetStateAction<boolean>>
): MouseEventHandler => {
  return () => setExpanded((prevState) => !prevState)
}
