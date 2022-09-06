import { FC } from 'react'
import { Zap } from 'react-feather'

import { Typography } from '@/components'

import { SidebarItem } from './components'
import { getClassNames } from './core/sidebar.helpers'
import s from './core/sidebar.module.scss'
import { IProps } from './core/sidebar.typings'

export const Sidebar: FC<IProps> = ({ className }) => {
  const classNames = getClassNames({ className })
  return (
    <nav className={classNames.join(' ')}>
      <div
        className={`${s['sidebar__logo']} f f-direction-row f-ai-center mb-5`}
      >
        <Zap className="mr-1" />
        <Typography element="h1" size="h4">
          Benchttp
        </Typography>
      </div>
      <SidebarItem className="mb-2" text="Test 1" selected={true} />
      <SidebarItem text="Test 2" selected={false} />
    </nav>
  )
}
