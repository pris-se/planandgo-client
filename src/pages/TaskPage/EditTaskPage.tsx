import { useParams } from "react-router-dom"
import { TaskForm } from "./TaskForm"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { updateTask } from "../../redux/thunks/taskThunks"
import { useEffect } from "react"
import { getById } from "../../redux/thunks/taskThunks"
import { Loader } from "../../components/Loader"


export const EditTaskPage = () => {
    const { task, isLoading } = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()
    const { id } = useParams()
    useEffect(() => {
        if((task && id && task._id !== id) || (!task && id)) {
            dispatch(getById(id))
        }
    }, [dispatch, task, id])

    if(isLoading) {
        return <Loader />
    }

    return (
        <div className="section">
            <div className='container'>
                <div className='text-center'>
                    <h2 className='text-primary mb-8'>Edit a Task</h2>
                </div>
                <div className='max-w-[360px] mx-auto'>
                    <TaskForm submitHandlerProps={updateTask} task={task} />
                </div>
            </div>
        </div>
    )
}
