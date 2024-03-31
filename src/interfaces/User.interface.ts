export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    birthday?: Date;
    address?: string;
    phone?: string;
    bio?: string;
    socials?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        telegram?: string;
    };
    notifications?: {
        email?: boolean;
        push?: boolean;
    };
    preferences?: {
        language?: string;
        theme?: string;
    };
    history?: string[];
    followers?: string[];
    following?: string[];
    subscriptions?: string[];
    status?: 'online' | 'offline';
    role?: 'admin' | 'client';
    createdAt?: string,

}

export interface IEvent {
    _id?: string;
    id: string;
    title: string;
    start: Date;
    end: Date;
    url?: string
}

export interface UserResolver {
    _id?: string;
    username: string;
    email: string;
    password: string;
    avatar?: File | FileList | string;
    firstName?: string;
    lastName?: string;
    birthday?: Date;
    address?: string;
    phone?: string;
    bio?: string;
    socials?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        telegram?: string;
    };
    notifications?: {
        email?: boolean;
        push?: boolean;
    };
    preferences?: {
        language?: string;
        theme?: string;
    };
    history?: string[];
    followers?: string[];
    following?: string[];
    subscriptions?: string[];
    status?: 'online' | 'offline';
    role?: 'admin' | 'client';
    createdAt?: string,
}
