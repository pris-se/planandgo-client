import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
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

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
            if (id) {
                const filteredTags = tagsFilter(tags)
            
                const data = new FormData()
                data.append('title', title)
                data.append('description', description)
                data.append('duration', duration as string)
                data.append('image', newImage)
                data.append('label', label)
                data.append('id', id)
                data.append('tags', filteredTags.join(' '))
                
                const newtask = await dispatch(updateTask(data))

                if (newtask) {
                    navigate('/tasks/' + id ?? 'error')
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

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
        </div>
    )
}
