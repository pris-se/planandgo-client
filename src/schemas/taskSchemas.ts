import { ITask } from '../models/Task.model';
import { object, number, string, ObjectSchema, array, ISchema, AnyObject } from 'yup';


export const TaskSchema: ObjectSchema<ITask> = object({
  _id: string().optional(),
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  duration: number().optional().default(0),
  img: string().optional(),
  views: number().optional(),
  label: string().default("other"),
  tags: array().of(string()).optional() as unknown as ISchema<string[], AnyObject>,
  creator: string().optional(),
  usage: number().default(0),
});