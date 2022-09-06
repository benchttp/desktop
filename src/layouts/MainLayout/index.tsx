import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components'

import s from './core/main-layout.module.scss'

export const MainLayout = () => {
  return (
    <div className={`${s['main-layout']} f f-direction-row`}>
      <Sidebar className={s['main-layout__sidebar']} />
      <main className={`${s['main-layout__content']} p-4`}>
        <Outlet />
      </main>
    </div>
  )
}
