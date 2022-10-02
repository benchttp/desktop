import {
  CSSProperties,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'react'

import s from './accordion.module.scss'
import { IProps } from './accordion.typings'

export const getClassNames = ({
  className,
}: Pick<IProps, 'className'>): string[] => {
  const classNames = [s['accordion'], 'f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames
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
