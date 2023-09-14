export interface User {
    _id?: string;
    username?: string;
    email: string; 
    password: string;
    img?: string
    role?: 'admin'| 'client' | '';
    tasks?: IEvent[] | []
}

export interface IEvent {
    _id?: string;
    id: string;
    title: string;
    start: Date;
    end: Date;
    url?: string
  }