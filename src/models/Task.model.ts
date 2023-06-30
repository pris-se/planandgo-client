export interface ITask {
    _id?: string
    title: string
    description: string
    duration: number
    img?: string
    views?: number,
    label?: string,
    tags?: string[]
}
