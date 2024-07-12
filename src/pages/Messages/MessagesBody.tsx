import React, { useEffect, useRef, useState } from 'react'
import { useOutlet, useOutletContext, useParams } from 'react-router-dom';
import { useWebSocket } from '../../hooks/useWebSocket';
import { IChat, IMessage } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createMessageFetch, getMessagesByChatIdFetch } from '../../redux/features/messages';
import { getUser } from '../../redux/features/users';
import { LoaderPage } from '../common/LoaderPage';
import { getImageUrl } from '../../utils/helpers';

import placeholderImage from "../../assets/img/placeholder.png"
import { Loader } from '../../components/Loader';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/ui/TextArea';
import moment from 'moment';
import { sendMessage } from '../../redux/features/websocket/websocketSlice';


export const MessagesBody = () => {
    const { chatId } = useParams()
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null);

    const chat = useOutletContext<IChat>()

    const { me, isLoading } = useAppSelector(state => state.profile)
    const { data: messagesData, isLoading: isMessagesLoading } = useAppSelector(state => state.messages)
    const { data: messageData, isLoading: isMessageLoading } = useAppSelector(state => state.message)
    const { receivedMessage } = useAppSelector(state => state.websocket)
    const [messages, setMessages] = useState<IMessage[] | []>([])
    const [message, setMessage] = useState('');


    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.length || !me?._id || !chat?._id || !chat?.members?.length) return;

        const data: IMessage = {
            _id: "",
            chatId: chat?._id,
            recipients: chat?.members.map(member => member._id).filter(id => typeof id === "string") as string[],
            senderId: me?._id,
            content: message,
            createdAt: "",
            updatedAt: "",
        }
        try {
            const res = await dispatch(createMessageFetch(data)).unwrap()
            dispatch(sendMessage(JSON.stringify(res.data)));
            setMessage('');

        } catch (error) {
            console.log(error);

        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            setMessage(message + '\n');
            return;
        }
        if (e.key === 'Enter' && formRef?.current) {
            e.preventDefault()

            formRef.current.requestSubmit()
        }
    };

    const getRecipient = () => {
        return chat?.members.find(member => member._id !== me?._id)
    }

    useEffect(() => {
        if (!chatId) return;
        dispatch(getMessagesByChatIdFetch(chatId))
    }, [chatId])

    useEffect(() => {
        const recipient = chat?.members.find(member => member._id !== me?._id)
        if (recipient && recipient._id)
            dispatch(getUser(recipient._id))
    }, [])


    useEffect(() => {
        console.log(receivedMessage, "receivedMessage");
        if (receivedMessage) {
            const messagesCopy = [...messages]
            messagesCopy.push(receivedMessage)
            setMessages(messagesCopy)
        }
    }, [receivedMessage, isMessageLoading])


    useEffect(() => {
        if (!messagesData) return;
        setMessages(messagesData)
    }, [messagesData, isMessagesLoading])

    if (!me) {
        return <p>cannot find chat</p>
    }

    const getChatAvatar = (): string => {
        const recipient = getRecipient()
        return chat?.thumbnail ? getImageUrl(chat?.thumbnail) : recipient?.avatar ? getImageUrl(recipient?.avatar) : placeholderImage
    }

    const getRecipientAvatar = (): string => {
        const recipient = getRecipient()
        return recipient?.avatar ? getImageUrl(recipient?.avatar) : placeholderImage
    }


    return (
        <div className="messages">
            {
                chat ?
                    <>
                        <div className="messages-header">
                            <div className='row-group gap--md'>
                                <div className="message-image ico image-wrapper">
                                    <img src={getChatAvatar()} alt={me.username} />
                                </div>
                                <div className='col-group'>
                                    <h4>{chat.title ? chat.title : getRecipient()?.username}</h4>
                                    <p className='text-info'>Last seen {getRecipient()?.lastSeen ? moment(getRecipient()?.lastSeen).format("DD MMM, YYYY") : "a while ago"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="messages-body">
                            {
                                !isMessagesLoading && messages?.length ?
                                    <div className="container">
                                        {messages.map(message => (
                                            <div
                                                key={message._id}
                                                className={`${message.senderId === me._id ? "message message--outcome" : "message message--income"}`}>
                                                {
                                                    message.senderId !== me._id ?
                                                        <div className="message-image ico image-wrapper">
                                                            <img src={getRecipientAvatar()} alt={getRecipient()?.firstName} />
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className="messages-list">
                                                    <div className="message-cloud">
                                                        <div className="message__text">
                                                            <p>{message.content}</p>
                                                        </div>
                                                        <span className="message__time">{new Date(message.createdAt).toLocaleTimeString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    isMessagesLoading ?
                                        <Loader />
                                        :
                                        <p className='m-auto'>There is no messages yet</p>
                            }
                        </div>
                        <div className="messages-footer">
                            <form ref={formRef}
                                className="w-full row-group items-end gap--sm"
                                onSubmit={handleSendMessage}
                            >
                                <TextArea
                                    value={message}
                                    title='Type message...'
                                    handler={(value) => setMessage(value)}
                                    classes='w-full'
                                    onKeyDown={handleKeyPress}
                                />
                                <Button classes="btn btn--primary btn--xs rounded" type="submit">
                                    Send
                                </Button>
                            </form>
                        </div>
                    </>
                    :
                    <p className='m-auto'>Chat not found</p>
            }
        </div>
    )
}

