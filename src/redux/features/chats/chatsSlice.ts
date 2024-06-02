import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createChatFetch, getChatsFetch } from './chatsThunk';
import { RootState } from '../../store';
import { IChat } from '../../../interfaces';


interface PayloadType {
    chats: IChat[];
    token: string;
    message: string;
}


interface ChatsState {
    chats: IChat[];
    isLoading: boolean;
    error: string | null;
    status?: string
}

const initialState: ChatsState = {
    chats: [],
    isLoading: false,
    error: null,
};


export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get Chats
        builder.addCase(getChatsFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            getChatsFetch.fulfilled,
            (state, { payload }: PayloadAction<PayloadType>) => {
                state.isLoading = false;
                state.chats = payload.chats
                state.status = payload?.message;
            }
        );
        builder.addCase(
            getChatsFetch.rejected,
            (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false;
                state.status = payload?.message;
            }
        );
    },
});


export const { } = chatsSlice.actions;