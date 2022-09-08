import { Run, UI } from '@/pages'

import { AppRoute } from './router.interfaces'

export const APP_ROUTES: AppRoute[] = [
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
