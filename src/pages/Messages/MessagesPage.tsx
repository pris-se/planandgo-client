import React, { useEffect, useState } from 'react'
import { User } from "../../interfaces"
import { MessageData, useWebSocket } from '../../hooks/useWebSocket';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppSelector } from '../../redux/hooks';
import { LoaderPage } from '../common/LoaderPage';
import { getImageUrl } from '../../utils/helpers';
import { TextArea } from '../../components/ui/TextArea';

interface Chat {
    roomId: string,
    title: string,
    messages: MessageData[] | []
    members: User[]
}

const chatsData: Chat[] = [
    {
        roomId: "room_1",
        title: "Chat 1",
        messages: [],
        members: []
    },
    {
        roomId: "room_2",
        title: "Chat 2",
        messages: [],
        members: []
    },
    {
        roomId: "room_3",
        title: "Chat 3",
        messages: [],
        members: []

    },
]

export const MessagesPage = () => {
    const { me, isLoading } = useAppSelector(state => state.profile)
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState(chatsData)
    const [shownChats, setShownChats] = useState<Chat[]>(chatsData)
    const { sendMessage, receivedMessage } = useWebSocket();

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.length) return;
        const data = {
            roomId: selectedChat?.roomId,
            userId: me?._id,
            content: message
        }
        sendMessage(JSON.stringify(data));
        setMessage('');
    };
    const handleSetCurrentChat = (chat: Chat) => {
        setSelectedChat(chat)
    }
    const handleSearchChat = (q: string) => {
        const filteredChats = chats
            .filter(shownChat =>
                shownChat.title.toLowerCase().includes(q.toLowerCase())
            )
        setShownChats(filteredChats)

    }

    useEffect(() => {
        if (receivedMessage) {
            const chatsCopy = [...chats]

            let current = chatsCopy.find(chat => chat.roomId === selectedChat?.roomId);
            if (current) {
                current.messages.push(receivedMessage as never)
                setChats(chatsCopy)
            }
        }
    }, [receivedMessage])

    if (isLoading) {
        return <LoaderPage />
    }
    if (!me) {
        return <p>cannot find user</p>
    }



    return (
        <>
            <div className="messages-page">
                <aside className="chat-list">
                    <div className="chat-list__header">
                        <Input
                            onChange={(e) => handleSearchChat(e.target.value)}
                            title='Search chats...'
                            classes='w-full'
                        />
                    </div>
                    <ul className="chat-list__body">
                        {
                            shownChats.map(chat => (
                                <li
                                    key={chat.roomId}
                                >
                                    <div
                                        className={`${selectedChat?.roomId === chat.roomId ? "chat-item active" : "chat-item"}`}
                                        onClick={() => handleSetCurrentChat(chat)}
                                    >
                                        <div className={`indicator ${true ? "" : "indicator--online"}`}>
                                            <div className="chat-item__image ico image-wrapper">
                                                <img src={me.avatar ? getImageUrl(me.avatar) : "../../placeholder.png"} alt={me.username} />
                                            </div>
                                        </div>
                                        <div className="chat-item__details">
                                            <div className="chat-item__heading row-group">
                                                <p className="chat-item__title">{chat.title}</p>
                                                <p className="chat-item__time">08.02.2022</p>
                                            </div>
                                            <div className="chat-item__message">
                                                {
                                                    chat.messages[chat.messages.length - 1] ?
                                                        chat.messages[chat.messages.length - 1].content
                                                        : "No messages yes"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </aside>
                <div className="messages">
                    {
                        selectedChat ?
                            <>
                                <div className="messages-header">
                                    <div className='row-group gap--md'>
                                        <div className="message-image ico image-wrapper">
                                            <img src={me.avatar ? getImageUrl(me.avatar) : "../../placeholder.png"} alt={me.username} />
                                        </div>
                                        <h3>{selectedChat.roomId}</h3>
                                    </div>
                                </div>
                                <div className="messages-body">
                                    <div className="container">
                                        {
                                            selectedChat.messages.length ?
                                                selectedChat.messages.map(message => (
                                                    <div
                                                        key={message._id}
                                                        className={`${message.userId === me._id ? "message message--outcome" : "message message--income"}`}>
                                                        {
                                                            message.userId !== me._id ?
                                                                <div className="message-image ico image-wrapper">
                                                                    <img src={me.avatar ? getImageUrl(me.avatar) : "../../placeholder.png"} alt={me.username} />
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        <div className="messages-list">
                                                            <div className="message-cloud">
                                                                <div className="message__text">
                                                                    <p>{message.content}</p>
                                                                </div>
                                                                <span className="message__time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                <p className='m-auto'>There is no messages yet</p>
                                        }
                                    </div>
                                </div>
                                <div className="messages-footer">
                                    <form className="w-full row-group items-end gap--sm" onSubmit={handleSendMessage}>
                                        <TextArea
                                            value={message}
                                            title='Type message...'
                                            handler={(value) => setMessage(value)}
                                            classes='w-full'
                                        />
                                        <Button classes="btn btn--primary btn--xs rounded" type="submit">
                                            Send
                                        </Button>
                                    </form>
                                </div>
                            </>
                            :
                            <p className='m-auto'>Select chat to start messaging</p>
                    }
                </div>
            </div>
        </>
    )
}
