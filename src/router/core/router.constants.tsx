import { Home, UI } from '@/pages'

import { AppRoute } from './router.interfaces'

export const APP_ROUTES: AppRoute[] = [
  {
    key: 'ui',
    path: '/ui',
    element: UI,
  },
  {
    key: 'home',
    path: '/',
    element: Home,
  },
]
