import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createChatFetch } from './chatsThunk';
import { RootState } from '../../store';
import { IChat } from '../../../interfaces';


interface PayloadType {
    chat: IChat;
    token: string;
    message: string;
}


interface ChatsState {
    chat: IChat | null;
    isLoading: boolean;
    error: string | null;
    status?: string
}

const initialState: ChatsState = {
    chat: null,
    isLoading: false,
    error: null,
};


export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Chat
        builder.addCase(createChatFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            createChatFetch.fulfilled,
            (state, { payload }: PayloadAction<PayloadType>) => {
                state.isLoading = false;
                state.chat = payload.chat
                state.status = payload?.message;
            }
        );
        builder.addCase(
            createChatFetch.rejected,
            (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false;
                state.status = payload?.message;
            }
        );
    },
});


export const { } = chatSlice.actions;