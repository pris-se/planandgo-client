import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import taskSlice from './features/task/slices/taskSlice'
// import { taskApi } from './features/api/taskApi'
// import { userApi } from './features/api/authApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    // [taskApi.reducerPath]: taskApi.reducer,
    // [userApi.reducerPath]: userApi.reducer
  },
  // middleware: getDefaultMiddleware =>
  // getDefaultMiddleware().concat([taskApi.middleware, userApi.middleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
