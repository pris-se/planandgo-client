// websocketSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IMessage } from '../../../interfaces';

interface WebSocketState {
    socket: WebSocket | null;
    receivedMessage: IMessage | null;
}

const initialState: WebSocketState = {
    socket: null,
    receivedMessage: null,
};
export const sendMessage = createAsyncThunk(
    'websocket/sendMessage',
    async (message: string, { getState, rejectWithValue }) => {
        const state = getState() as { websocket: WebSocketState };
        const { socket } = state.websocket;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            return rejectWithValue('Socket is not connected or message is empty.');
        }
    }
);
export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<WebSocket>) => {
            state.socket = action.payload;
        },
        setReceivedMessage: (state, action: PayloadAction<IMessage>) => {
            state.receivedMessage = action.payload;
        },
        clearSocket: (state) => {
            state.socket?.close();
            state.socket = null;
            state.receivedMessage = null;
        },
    },
});

export const { setSocket, setReceivedMessage, clearSocket } = websocketSlice.actions;

export const selectSocket = (state: RootState) => state.websocket.socket;
export const selectReceivedMessage = (state: RootState) => state.websocket.receivedMessage;
