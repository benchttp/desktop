import { Run, UI, Laucher } from '@/pages'

import { AppRoute } from './router.interfaces'

export const APP_ROUTES: AppRoute[] = [
  {
    key: 'launcher',
    path: '/',
    element: Laucher,
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
