import { useEffect, useState } from 'react';
import { IMessage } from '../interfaces';


const WS_URL = process.env.REACT_APP_BASE_WS_URL || "ws://localhost:3005"



interface WebSocketHook {
    sendMessage: (message: string) => void;
    receivedMessage: IMessage | null;
}



export const useWebSocket = (): WebSocketHook => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [receivedMessage, setReceivedMessage] = useState<IMessage | null>(null);


    useEffect(() => {
        const newSocket = new WebSocket(WS_URL);

        newSocket.onopen = () => {
            console.log('WebSocket connection open.');
        };

        newSocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            const messageData: IMessage = JSON.parse(event.data)
            setReceivedMessage(messageData);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = (message: string) => {
        if (socket && message.trim() !== '') {
            socket.send(message);
        }
    };

    return { sendMessage, receivedMessage };
};

