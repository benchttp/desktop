import { createElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '@/layouts'

import { APP_ROUTES } from './core/router.constants'

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {APP_ROUTES.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={createElement(route.element)}
          />
        ))}
      </Route>
    </Routes>
  )
}
