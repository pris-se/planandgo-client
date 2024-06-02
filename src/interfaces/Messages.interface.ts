import { User } from "./User.interface";

export interface IMessage {
    _id: string
    chatId: string;
    senderId: string;
    content: string;
    media?: string;
    isRead?: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface IChat {
    _id: string
    members: User[];
    thumbnail: ""
    type: 'single' | 'group';
    title: string;
    lastMessage?: IMessage | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}
