import { Zap } from 'react-feather'
import { Outlet } from 'react-router-dom'

import { Typography } from '@/components'

import s from './core/main-layout.module.scss'

export const MainLayout = () => {
  return (
    <div className={`${s['main-layout']} f f-direction-row`}>
      <aside
        className={`${s['sidebar']} f f-direction-column pt-4 pb-4 pl-3 pr-3`}
      >
        <div
          className={`${s['sidebar__logo']} f f-direction-row f-ai-center mb-5`}
        >
          <Zap className="mr-1" />
          <Typography element="h1" size="h4">
            Benchttp
          </Typography>
        </div>
      </aside>
      <main className={`${s['main-content']} p-4`}>
        <Outlet />
      </main>
    </div>
  )
}
