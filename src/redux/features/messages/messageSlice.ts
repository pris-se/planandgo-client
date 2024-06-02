import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../../interfaces';
import { createMessageFetch } from './messagesThunk';


interface PayloadType {
    data: IMessage | null;
    message: string
    token: string;
}


interface MessagesState {
    data: IMessage | null;
    isLoading: boolean;
    error: string | null;
    status?: string
}

const initialState: MessagesState = {
    isLoading: false,
    error: null,
    data: null
};


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Message
        builder.addCase(createMessageFetch.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            createMessageFetch.fulfilled,
            (state, { payload }: PayloadAction<PayloadType>) => {
                state.data = payload.data
                state.status = payload?.message;
            }
        );
        builder.addCase(
            createMessageFetch.rejected,
            (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false;
                state.status = payload?.message;
            }
        );
    },
});


export const { } = messageSlice.actions;