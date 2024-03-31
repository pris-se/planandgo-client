import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "../../components/Loader"
import { getById, updateTask } from "../../redux/features/tasks"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { TaskForm } from "./TaskForm"
import { LoaderPage } from "../common/LoaderPage"


export const EditTaskPage = () => {
    const { task, isLoading } = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if ((task && id && task._id !== id) || (!task && id)) {
            dispatch(getById(id))
        }
    }, [dispatch, task, id])


    const handleSubmit = async (formData: FormData) => {
        if (!task?._id) return
        try {
            // const newtask = await dispatch(submitHandlerProps({ ...data, tags: filteredTags }));
            const newtask = await dispatch(updateTask({ formData, id: task._id }));
            if (newtask && !isLoading) {
                console.log(newtask?.payload.task._id);

                navigate("/tasks/" + newtask?.payload.task._id ?? "error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <LoaderPage />
    }

    return (
        <div className="section">
            <div className='container'>
                <div className='text-center'>
                    <h2 className='text-primary mb-8'>Edit a Task</h2>
                </div>
                <div className='max-w-[360px] mx-auto'>
                    <TaskForm handleSubmitProps={handleSubmit} task={task} />
                </div>
            </div>
        </div>
    )
}
