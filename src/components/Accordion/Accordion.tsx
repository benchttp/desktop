import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'react-feather'

import {
  getAccordionClassName,
  getContentClassName,
  handleExpandClick,
} from './internal/Accordion.helpers'
import s from './internal/accordion.module.scss'

interface IProps {
  className?: string
  title: ReactNode
  content: ReactNode
}

export const Accordion: FC<IProps> = ({ className, title, content }) => {
  const [expanded, setExpanded] = useState(false)
  const [titleHeight, setTitleHeight] = useState<number>()

  const titleRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) {
      return
    }

    setTitleHeight(titleRef.current.getBoundingClientRect().height)
  }, [])

  return (
    <div
      ref={accordionRef}
      style={{ height: expanded ? 'auto' : `${titleHeight}px` }}
      className={getAccordionClassName(className)}
    >
      <div className={`${s['accordion__wrapper']} f f-direction-column`}>
        <div
          ref={titleRef}
          onClick={handleExpandClick(setExpanded)}
          className={`${s['accordion__title']} f f-ai-center f-jc-space-b p-3`}
        >
          {title}
          <ChevronDown />
        </div>
        <div className={getContentClassName(expanded)}>{content}</div>
      </div>
    </div>
  )
}
