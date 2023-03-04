import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import taskSlice from './features/task/taskSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
