import { configureStore } from '@reduxjs/toolkit'
import { profileSlice } from './features/profile';
import { userSlice } from './features/users';
import { tasksSlice, taskSlice } from './features/tasks';
import { eventSlice } from './features/events';
import { settingsSlice } from './features/settings';

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    tasks: tasksSlice.reducer,
    task: taskSlice.reducer,
    profile: profileSlice.reducer,
    settings: settingsSlice.reducer,
    events: eventSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
