import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import taskSlice from './slices/taskSlice'
import aiSlice from './slices/aiSlice'
import mainSlice from './slices/mainSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    ai: aiSlice,
    main: mainSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
