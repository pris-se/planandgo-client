import { object, number, string, ObjectSchema, array, ISchema, AnyObject, date } from 'yup';
import { User } from '../models/User.model';

export const UserSchema: ObjectSchema<User> = object({
    _id: string().optional(),
    username: string().optional(),
    email: string().email('Invalid email format').required('Email is required'),
    password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    img: string().optional(),
    role: string().oneOf(['admin', 'client', ''], 'Invalid role').optional(),
    tasks: array().of(
        object().shape({
            _id: string().optional(),
            id: string().required('Task ID is required'),
            title: string().required('Task title is required'),
            start: date().required('Task start date is required'),
            end: date().required('Task end date is required'),
            url: string().optional(),
        })
    ),
});