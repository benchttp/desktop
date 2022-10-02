import { FC, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'react-feather'

import {
  calculateCollapsedScale,
  getClassNames,
  getStyle,
  handleExpandeClick,
} from './core/accordion.helpers'
import s from './core/accordion.module.scss'
import { IProps } from './core/accordion.typings'

export const Accordion: FC<IProps> = ({ className, title, content }) => {
  const [expanded, setExpanded] = useState(false)
  const [collapsedScale, setCollapsedScale] = useState<number>()

  const accordionRef = useRef<HTMLDivElement>(null)
  const accordionTitleRef = useRef<HTMLDivElement>(null)

  const classNames = getClassNames({ className })

  useEffect(() => {
    setCollapsedScale(
      calculateCollapsedScale(accordionRef.current, accordionTitleRef.current)
    )
  }, [])

  return (
    <div
      ref={accordionRef}
      style={getStyle(expanded, collapsedScale, 'accordion')}
      className={classNames.join(' ')}
    >
      <div
        style={getStyle(expanded, collapsedScale, 'wrapper')}
        className={`${s['accordion__wrapper']}`}
      >
        <div
          ref={accordionTitleRef}
          className={`${s['accordion__title']} f f-ai-center f-jc-space-b p-3`}
          onClick={handleExpandeClick(setExpanded)}
        >
          {title}
          <ChevronDown />
        </div>
        <div className="pt-2 pr-3 pl-3 pb-3">{content}</div>
      </div>
    </div>
  )
}
