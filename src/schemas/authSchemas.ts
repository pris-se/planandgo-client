import { ObjectSchema, array, boolean, date, object, string } from 'yup';
import { User } from '../interfaces';


export type UserResolver = Pick<User, Exclude<keyof User, 'avatar'>> & { avatar?: File | string | FileList  };


  
export const UserSchema: ObjectSchema<UserResolver> = object({
    _id: string().optional(),
    username: string().required('Username is required'),
    email: string().required('Email is required').email('Invalid email format'),
    password: string().required('Password is required'),
    avatar: string().optional(),
    firstName: string().optional(),
    lastName: string().optional(),
    birthday: date().optional(),
    address: string().optional(),
    phone: string().optional(),
    bio: string().optional(),
    socials: object({
      facebook: string().optional(),
      twitter: string().optional(),
      instagram: string().optional(),
      telegram: string().optional(),
    }).optional(),
    notifications: object({
      email: boolean().default(true).optional(),
      push: boolean().default(true).optional(),
    }).optional(),
    preferences: object({
      language: string().default('en').optional(),
      theme: string().default('light').optional(),
    }).optional(),
    history: array().of(string().defined()).optional(),
    followers: array().of(string().defined()).optional(),
    following: array().of(string().defined()).optional(),
    subscriptions: array().of(string().defined()).optional(),
    status: string().oneOf(['online', 'offline']).default('offline').optional(),
    role: string().oneOf(['admin', 'client']).default('client').optional(),
    createdAt: string().optional()
  });
  