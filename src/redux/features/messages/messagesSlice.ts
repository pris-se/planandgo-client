import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createMessageFetch, getMessagesByChatIdFetch } from './messagesThunk';
import { RootState } from '../../store';
import { IChat, IMessage } from '../../../interfaces';


interface PayloadType {
    data: IMessage[];
    message: string
    token: string;
}


interface MessagesState {
    data: IMessage[];
    isLoading: boolean;
    error: string | null;
    status?: string
}

const initialState: MessagesState = {
    isLoading: false,
    error: null,
    data: []
};


export const messagesSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMessagesByChatIdFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            getMessagesByChatIdFetch.fulfilled,
            (state, { payload }: PayloadAction<PayloadType>) => {
                state.isLoading = false;
                state.data = payload.data
                state.status = payload?.message;
            }
        );
        builder.addCase(
            getMessagesByChatIdFetch.rejected,
            (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false;
                state.status = payload?.message;
            }
        );
    },
});


export const { } = messagesSlice.actions;