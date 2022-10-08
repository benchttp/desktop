import { createElement, FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Laucher, UI, Run } from '@/views'

import s from './internal/router.module.scss'
import { IAppRoute } from './internal/router.types'

const APP_ROUTES: IAppRoute[] = [
  {
    key: 'launcher',
    path: '/',
    element: Laucher,
    className: s['router__launcher'],
  },
  {
    key: 'ui',
    path: '/ui',
    element: UI,
  },
  {
    key: 'run',
    path: 'run/*',
    element: Run,
  },
]

export const Router: FC = () => {
  return (
    <main className={`${s['router']} p-4 f f-direction-column`}>
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={createElement(route.element, {
              className: route.className,
            })}
          />
        ))}
      </Routes>
    </main>
  )
}
