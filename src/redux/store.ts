import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
<<<<<<< HEAD
import taskSlice from './features/task/slices/taskSlice'
// import { taskApi } from './features/api/taskApi'
// import { userApi } from './features/api/authApi'
=======
import taskSlice from './features/task/taskSlice'
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
<<<<<<< HEAD
    // [taskApi.reducerPath]: taskApi.reducer,
    // [userApi.reducerPath]: userApi.reducer
  },
  // middleware: getDefaultMiddleware =>
  // getDefaultMiddleware().concat([taskApi.middleware, userApi.middleware])
=======
  },
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
