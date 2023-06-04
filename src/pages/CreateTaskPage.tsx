import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
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



    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(task);
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
        </div>
    )
}

