import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
<<<<<<< HEAD
import { updateTask } from '../redux/features/task/thunks/taskThunks'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { tagsFilter } from '../utils/tagsFilter'
import { calcDuration, formatTime } from '../utils/time'
import { Loader } from '../components/Loader'
import { labels } from '../data/data'


export const EditTaskPage = () => {
    const { task, isLoading } = useAppSelector(state => state.task)

    const { id } = useParams()
    const [title, setTitle] = useState(task?.title || "")
    const [description, setDescription] = useState(task?.description || "")
    const [label, setLabel] = useState(task?.label || 'Other')
    const [newImage, setNewImage] = useState<File | string>("")
    const [endTime, setEndTime] = useState("")
    const [startTime, setStartTime] = useState("")

=======
import { updateTask } from '../redux/features/task/taskSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { tagsFilter } from '../utils/tagsFilter'


export const EditTaskPage = () => {
    const {task, isLoading} = useAppSelector(state => state.task)

    const { id } = useParams()
    const [title, setTitle] = useState(task?.title ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [duration, setDuration] = useState(task?.duration ?? '')
    const [label, setLabel] = useState(task?.label ?? '')
    const [tags, setTags] = useState(task?.tags?.join(' ') ?? ' ')
    const [image, setImage] = useState<File | string>(task?.img ?? '')
    const [newImage, setNewImage] = useState<File | string>('')
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
            if (id) {
<<<<<<< HEAD
                const filteredTags = tagsFilter(description)

                const data = new FormData()
                data.append('title', title)
                data.append('description', description)
                data.append('duration', (startTime && endTime && calcDuration(startTime, endTime).toString()) || task?.duration.toString() || "")
                data.append('image', newImage)
                data.append('label', label)
                data.append('id', id)
                data.append('tags', JSON.stringify(filteredTags))

=======
                const filteredTags = tagsFilter(tags)
            
                const data = new FormData()
                data.append('title', title)
                data.append('description', description)
                data.append('duration', duration as string)
                data.append('image', newImage)
                data.append('label', label)
                data.append('id', id)
                data.append('tags', filteredTags.join(' '))
                
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
                const newtask = await dispatch(updateTask(data))

                if (newtask) {
                    navigate('/tasks/' + id ?? 'error')
                }
            }
<<<<<<< HEAD

=======
            
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
        } catch (error) {
            console.log(error);
        }
    }

<<<<<<< HEAD
    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="section">
            <div className='container'>
                <div className='text-center'>
                    <h2 className='text-primary mb-8'>Edit a Task</h2>
                </div>
                <div className='max-w-[360px] mx-auto'>
                    <form
                        className='flex flex-col'
                        onSubmit={e => e.preventDefault()}
                    >
                        <div className="row">
                            <div className="col-12">
                                <label className="form-group w-full cursor-pointer text-center mb-4">
                                    <div className='upload-image mb-2'>
                                        {
                                            !newImage && task?.img && 
                                            <img
                                                src={task.img ? process.env.REACT_APP_BASE_IMAGE_URL! + task.img : '../../img/placeholder.png'}
                                                alt={task.img ? task.img.toString() : 'placeholder'} />
                                        }
                                        {
                                            newImage &&
                                            <img
                                                src={newImage ? URL.createObjectURL(newImage as Blob) : '../../img/placeholder.png'}
                                                alt={newImage ? newImage.toString() : 'placeholder'} />
                                        }
                                    </div>
                                    <div className='text-primary font-semibold'>
                                        {!task?.img ? "Upload a task’s photo" : "Change a photo"}
                                    </div>
                                    <input type="file" className='hidden' onChange={e => setNewImage(e.target?.files?.[0] || '')} />
                                </label>
                            </div>
                            <div className="col-12">
                                <Input handler={(e) => setTitle(e.target.value)} title="Task Name" value={title} />
                            </div>
                            <div className="col-12">
                                <div className='flex flex-col mb-3'>
                                    <textarea
                                        className='textarea'
                                        placeholder='Task Description & Hashtags'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* <div className="col-6">
                                <div className='flex flex-col mb-3'>
                                    <select className='input'>
                                        <option value="">Date</option>
                                        <option value="">Today</option>
                                        <option value="">Tomorrow</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='flex flex-col mb-3'>
                                    <select className='input'>
                                        <option value="">Repeat</option>
                                        <option value="">Today</option>
                                        <option value="">Tomorrow</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="col-6">
                                <Input handler={e => setStartTime(e.target.value)} value={startTime.toString()} title="Start Time" type='datetime-local' />
                            </div>
                            <div className="col-6">
                                <Input handler={e => setEndTime(e.target.value)} value={endTime.toString()} title="Ending time" type='datetime-local' />
                            </div>
                            <div className="col-12">
                                <p className='-mt-2 mb-3 text-info'>Estimated Time: {(startTime && endTime && formatTime(calcDuration(startTime, endTime))) || (task?.duration && formatTime(task?.duration))}</p>
                            </div>
                            <div className="col-12">
                                <div className='mb-3'>
                                    <h4 className='mb-2'>Labels</h4>
                                    <div className="row">
                                        {
                                            labels && labels.map(lbl => (
                                                <div className="col-4 mb-2" key={lbl}>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name='label'
                                                            className='hidden'
                                                            onChange={() => setLabel(lbl)}
                                                            checked={lbl === label}
                                                        />
                                                        <div className='label'>
                                                            {lbl}
                                                        </div>
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Button onClick={submitHandler}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
=======
    if(isLoading) {
        return <p>Loading</p>
    }

    return (
        <div className='container'>
            <form
                className='flex flex-col gap-2 py-10'
                onSubmit={e => e.preventDefault()}
            >
                <label className="form-group w-full">
                    Attach image
                    <input type="file" className='hidden' onChange={e => {
                        setImage('')
                        setNewImage(e.target?.files?.[0] || '')
                    }} />
                </label>
                <div className='flex object-cover py-2 w-24 h-24 overflow-hidden'>
                    {
                        image &&
                        <img
                            src={process.env.REACT_APP_BASE_IMAGE_URL! + image}
                            alt={image ? image.toString() : 'placeholder'} />
                    }
                    {
                        newImage &&
                        <img
                            src={image ? URL.createObjectURL(newImage as Blob) : '../../img/placeholder.png'}
                            alt={image ? image.toString() : 'placeholder'} />
                    }
                </div>
                <Input handler={e => setTitle(e.currentTarget.value)} title="Title" value={title} />
                <Input handler={e => setDuration(e.currentTarget.value)} title="Duration" type='number' value={duration} />
                <Input handler={e => setLabel(e.currentTarget.value)} title="Label" value={label}/>
                <Input handler={e => setTags(e.currentTarget.value)} title="Tags" value={tags}/>
                <label className='form-group w-full'>
                    Decription
                    <textarea
                        className='input bg-white text-[#2A2831] placeholder:text-[#8D8D8D]'
                        placeholder='Enter your decription here...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <div className='flex gap-2'>
                    <Button title='Add' onClick={submitHandler} />
                    <Button title='Cancel' />
                </div>
            </form>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
        </div>
    )
}
