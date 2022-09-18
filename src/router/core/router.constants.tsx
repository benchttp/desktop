import { Run, UI } from '@/pages'
import { RunConfigurationPanel } from '@/temp/RunConfigurationPanel'

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
  {
    key: 'temp-config',
    path: '/temp-config/*',
    element: RunConfigurationPanel,
  },
]
