import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
<<<<<<< HEAD
import { createTask } from '../redux/features/task/thunks/taskThunks'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { calcDuration, formatTime } from '../utils/time'
import { labels } from '../data/data'
import { tagsFilter } from '../utils/tagsFilter'

export const CreateTaskPage = () => {

    const setValue = (date:Date):string => {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        date.setSeconds(0,0)
        const isoString = date.toISOString().slice(0, -1);        
        return isoString
      }
    
    const { task, isLoading } = useAppSelector(state => state.task)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [endTime, setEndTime] = useState('')
    const [startTime, setStartTime] = useState(setValue(new Date()))
    const [image, setImage] = useState<File | string>('')
    const [label, setLabel] = useState('Other')


=======
import { createTask } from '../redux/features/task/taskSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export const CreateTaskPage = () => {
    const {task, isLoading} = useAppSelector(state => state.task)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [image, setImage] = useState<File | string>('')
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
<<<<<<< HEAD
            const filteredTags = tagsFilter(description)

            const data = new FormData()
            data.append('title', title)
            data.append('description', description)
            data.append('duration', calcDuration(startTime, endTime).toString())
            data.append('image', image)
            data.append('tags', JSON.stringify(filteredTags))

            const newtask = await dispatch(createTask(data))

            if (newtask && !isLoading) {
                navigate('/tasks/' + newtask?.payload.task._id ?? 'error')
            }
=======
            const data = new FormData()
            data.append('title', title)
            data.append('description', description)
            data.append('duration', duration)
            data.append('image', image)
            const newtask = await dispatch(createTask(data))
                        
            if (newtask && !isLoading) {
                navigate('/tasks/' + newtask?.payload.task._id ?? 'error')
              }
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(task);
<<<<<<< HEAD
    }, [task])

    return (
        <div className="section">
            <div className='container'>
                <div className='text-center'>
                    <h2 className='text-primary mb-8'>Create a Task</h2>
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
                                        <img
                                            src={image ? URL.createObjectURL(image as Blob) : '../../img/placeholder.png'}
                                            alt={image ? image.toString() : 'placeholder'} />
                                    </div>
                                    <div className='text-primary font-semibold'>
                                        {!image ? "Upload a task’s photo" : "Change a photo"}
                                    </div>
                                    <input type="file" className='hidden' onChange={e => setImage(e.target?.files?.[0] || '')} />
                                </label>
                            </div>
                            <div className="col-12">
                                <Input handler={e => setTitle(e.target.value)} title="Task Name" value={title} />
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
                                <Input handler={e => setStartTime(e.target.value)} value={startTime} title="Start Time" type='datetime-local' />
                            </div>
                            <div className="col-6">
                                <Input handler={e => setEndTime(e.target.value)} value={endTime} title="Ending time" type='datetime-local' />
                            </div>
                            <div className="col-12">
                                <p className='-mt-2 mb-3 text-info'>Estimated Time: {startTime && endTime && formatTime(calcDuration(startTime, endTime))}</p>
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
                                                            onChange={(e) => setLabel(lbl)}
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
                            <Button title='Create' onClick={submitHandler} />
                        </div>
                    </form>
                </div>
            </div>
=======
      }, [task])

    return (
        <div className='container'>
            <form
                className='flex flex-col gap-2 py-10'
                onSubmit={e => e.preventDefault()}
            >
                <label className="form-group w-full cursor-pointer p-3 bg-slate-300 text-white border border-dashed border-slate-900">
                    Attach image
                    <input type="file" className='hidden' onChange={e => setImage(e.target?.files?.[0] || '')} />
                </label>
                <div className='flex object-cover py-2 w-24 h-24 overflow-hidden'>
                    <img
                        src={image ? URL.createObjectURL(image as Blob) : '../../img/placeholder.png'}
                        alt={image ? image.toString() : 'placeholder'} />
                </div>
                <Input handler={e => setTitle(e.currentTarget.value)} title="Title" />
                <Input handler={e => setDuration(e.currentTarget.value)} title="Duration" type='number' />
                <div className='flex flex-col mb-3'>
                    <label className='mb-3 capitalize'>
                        Description
                    </label>
                    <textarea
                        className='input bg-white text-[#2A2831] placeholder:text-[#8D8D8D]'
                        placeholder='Enter your decription here...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className='flex gap-2'>
                    <Button title='Add' onClick={submitHandler} />
                    <Button title='Cancel' />
                </div>
            </form>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
        </div>
    )
}

