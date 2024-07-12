import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { IChat } from "../../interfaces";
import { createChatFetch, getChatsFetch } from '../../redux/features/chats';
import { getUser } from '../../redux/features/users';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getImageUrl } from '../../utils/helpers';
import { LoaderPage } from '../common/LoaderPage';

import { NavLink, Outlet, useParams } from 'react-router-dom';
import { ReactComponent as PlusIcon } from '../../assets/img/plus.svg';
import placeholderImage from "../../assets/img/placeholder.png";
import { Loader } from '../../components/Loader';
import { CreateChatModal } from './CreateChatModal';


export const MessagesPage = () => {
    const { chatId } = useParams()
    const dispatch = useAppDispatch()
    const { me, isLoading } = useAppSelector(state => state.profile)

    const { chat, isLoading: isChatLoading } = useAppSelector(state => state.chat)
    const { chats, isLoading: isChatsLoading } = useAppSelector(state => state.chats)

    const [selectedChat, setSelectedChat] = useState<IChat | null>(null)
    const [createChatModalShow, setCreateChatModalShow] = useState(false);

    const [search, setSearch] = useState('');
    const [shownChats, setShownChats] = useState<IChat[]>(chats)

    const handleSearchChat = (q: string) => {
        const filteredChats = chats
            .filter(shownChat =>
                shownChat.title.toLowerCase().includes(q.toLowerCase())
            )
        setShownChats(filteredChats)
    }



    const findRecipient = (chat: IChat) => {
        return chat?.members.find(member => member._id !== me?._id)
    }

    useEffect(() => {
        dispatch(getChatsFetch())
    }, [])

    useEffect(() => {
        if (!chatId) return;
        setSelectedChat(chats.find(chat => chat._id === chatId) || null)
    }, [chatId, isChatsLoading])

    useEffect(() => {
        const recipient = chat?.members.find(member => member._id !== me?._id)
        if (recipient && recipient._id)
            dispatch(getUser(recipient._id))
    }, [])

    useEffect(() => {
        handleSearchChat(search)
    }, [search])

    if (isLoading) {
        return <LoaderPage />
    }
    if (!me) {
        return <p>Сan`t find user</p>
    }


    const getChatAvatar = (chat: IChat): string => {
        const recipient = findRecipient(chat)
        return chat?.thumbnail ? getImageUrl(chat?.thumbnail) : recipient?.avatar ? getImageUrl(recipient?.avatar) : placeholderImage
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
                    {
                        !isChatsLoading && chats.length ?
                            <ul className="chat-list__body">
                                {
                                    chats.map(chat => (
                                        <li
                                            key={chat._id}
                                        >
                                            <NavLink
                                                className={({ isActive }) => `${isActive ? "chat-item active" : "chat-item"}`}
                                                to={chat._id}
                                            >
                                                <div className={`indicator indicator--${findRecipient(chat)?.status}`}>
                                                    <div className="chat-item__image ico image-wrapper">
                                                        <img src={getChatAvatar(chat)} alt={chat.title ? chat.title : findRecipient(chat)?.username} />
                                                    </div>
                                                </div>
                                                <div className="chat-item__details">
                                                    <div className="chat-item__heading row-group">
                                                        <p className="chat-item__title">{chat.title ? chat.title : findRecipient(chat)?.username}</p>
                                                        <p className="chat-item__time">08.02.2022</p>
                                                    </div>
                                                    <div className="chat-item__message">
                                                        {
                                                            chat.lastMessage ?
                                                                chat.lastMessage.content
                                                                : "No messages yet..."
                                                        }
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                            : !isChatLoading && !chats.length ?
                                <div className='chat-list__body items-center justify-center'>
                                    <p>There is no chats yet...</p>
                                </div>
                                :
                                <Loader />
                    }
                    <Button
                        onClick={() => setCreateChatModalShow(true)}
                        className="btn btn--create btn--square"
                    >
                        <PlusIcon />
                    </Button>
                </aside>
                {
                    chatId ?
                        <Outlet context={selectedChat} />
                        :
                        <p className='m-auto'>Select chat to start messaging</p>

                }
            </div>
            {
                createChatModalShow &&
                <CreateChatModal show={createChatModalShow} onClose={() => setCreateChatModalShow(false)} />
            }
        </>
    )
}
