// useWebSocket.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSocket, setReceivedMessage, clearSocket } from "../redux/features/websocket/websocketSlice"
import { useAppSelector } from '../redux/hooks';

const WS_URL = process.env.REACT_APP_BASE_WS_URL || "ws://localhost:3005";

export const useWebSocket = () => {
    const userId = useAppSelector(state => state.profile.me?._id);
    const dispatch = useDispatch();
    const socket = useAppSelector((state) => state.websocket.socket);

    useEffect(() => {
        let newSocket: WebSocket | null = null;
        console.log(socket, userId, "----------");

        if (userId && !socket) {
            newSocket = new WebSocket(`${WS_URL}?userId=${userId}`);
            newSocket.onopen = () => {
                console.log('WebSocket connection open.');
                dispatch(setSocket(newSocket!));
            };
            newSocket.onmessage = (event) => {
                const messageData = JSON.parse(event.data);
                dispatch(setReceivedMessage(messageData));

            };
            newSocket.onclose = () => {
                console.log('WebSocket connection closed.');
                dispatch(clearSocket());
            };
        }
    }, [dispatch, socket, userId]);


    return socket;
};
