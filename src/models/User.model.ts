export interface User {
    _id?: string,
    username?: string,
    email: string, 
    password: string,
    img?: string
    role?: 'admin'| 'client' | ''
}