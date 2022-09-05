import { createElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import { APP_ROUTES } from './core/router.constants'

export const Router = () => {
  return (
    <Routes>
      {APP_ROUTES.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={createElement(route.element)}
        />
      ))}
    </Routes>
  )
}
