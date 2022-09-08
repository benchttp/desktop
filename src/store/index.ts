import { configureStore } from '@reduxjs/toolkit'

import { runReducer } from './run'

export const store = configureStore({
  reducer: {
    run: runReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
