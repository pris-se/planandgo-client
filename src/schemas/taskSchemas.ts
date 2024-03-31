import { AnyObject, ISchema, ObjectSchema, array, number, object, string } from 'yup';
import { TaskResolver } from '../interfaces';



// export type TaskResolver = Pick<Task, Exclude<keyof Task, 'img'>> & { img?: File | string | FileList  };

export const TaskSchema: ObjectSchema<TaskResolver> = object({
  _id: string().optional(),
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  duration: number().default(0),
  img: string().optional(),
  views: number().default(0),
  category: string().default("other"),
  tags: array().of(string()) as unknown as ISchema<string[], AnyObject>,
  createdBy: string(),
  assignCount: number().default(0),
});