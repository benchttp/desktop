import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RunProgress, RunReport } from '@/benchttp'

interface State {
  progress: RunProgress | null
  report: RunReport | null
  error: string
}

const initialState: State = {
  progress: null,
  report: null,
  error: '',
}

const runSlice = createSlice({
  name: 'run',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<RunProgress>) => {
      state.progress = action.payload
    },
    setReport: (state, action: PayloadAction<RunReport>) => {
      state.report = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    reset: () => initialState,
  },
})

export const { setProgress, setReport, setError, reset } = runSlice.actions

export const runReducer = runSlice.reducer
