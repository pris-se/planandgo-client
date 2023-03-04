import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { createTask } from '../redux/features/task/taskSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export const CreateTaskPage = () => {
    const {task, isLoading} = useAppSelector(state => state.task)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [image, setImage] = useState<File | string>('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('description', description)
            data.append('duration', duration)
            data.append('image', image)
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
        </div>
    )
}

