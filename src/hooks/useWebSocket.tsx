import React, { useState, useEffect } from 'react';


const WS_URL = process.env.REACT_APP_BASE_WS_URL || "ws://localhost:3005"

export interface MessageData {
    _id: string
    content: string
    userId: string
    timestamp: string
}

interface WebSocketHook {
    sendMessage: (message: string) => void;
    receivedMessage: MessageData | null;
}



export const useWebSocket = (): WebSocketHook => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [receivedMessage, setReceivedMessage] = useState<MessageData | null>(null);

    useEffect(() => {
        const newSocket = new WebSocket(WS_URL);
        
        newSocket.onopen = () => {
            console.log('WebSocket connection open.');
        };

        newSocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            const messageData: MessageData = JSON.parse(event.data)
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

