export interface Task {
    _id: string
    title: string
    description: string
    duration: number
    img: string
    views: number,
    category: string,
    tags: string[] | [];
    createdBy: string;
    assignCount: number
}

export interface TaskResolver {
    _id?: string;
    title: string;
    description: string;
    duration: number;
    img?: File | string | FileList;
    views: number;
    category: string;
    tags: string[];
    createdBy?: string;
    assignCount: number;
  }