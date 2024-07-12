import { configureStore } from '@reduxjs/toolkit';
import { chatSlice, chatsSlice } from './features/chats';
import { eventSlice } from './features/events';
import { messageSlice, messagesSlice } from './features/messages';
import { profileSlice } from './features/profile';
import { settingsSlice } from './features/settings';
import { taskSlice, tasksSlice } from './features/tasks';
import { userSlice } from './features/users';
import { websocketSlice } from './features/websocket/websocketSlice';

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    tasks: tasksSlice.reducer,
    task: taskSlice.reducer,
    profile: profileSlice.reducer,
    settings: settingsSlice.reducer,
    events: eventSlice.reducer,
    chats: chatsSlice.reducer,
    chat: chatSlice.reducer,
    messages: messagesSlice.reducer,
    message: messageSlice.reducer,
    websocket: websocketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['websocket/setSocket',],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['websocket.socket', "meta.arg.body", "meta.arg"],
            // Ignore these paths in the state
            ignoredPaths: ['websocket.socket'],
        },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
