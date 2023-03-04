import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Task } from '../models/Task.model'
import { checkIsAuth } from '../redux/features/auth/authSlice'
import { removeTask } from '../redux/features/task/taskSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Button } from './ui/Button'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  task: Task
}

export const TaskCard = ({ task }: Props) => {
  const state = useAppSelector(state => state)
  const user = useAppSelector(state => state.auth.user)
  const isAuth = checkIsAuth(state)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const removeHandler = async () => {
    try {
      if (id) {
        const task = await dispatch(removeTask(id))
        if (task) {
          toast(task.payload.message)
          navigate('/tasks')
        }
      }
    } catch (error) {
      console.log(error);

    }

  }


  return (
    <div className="container">
      <div className='flex gap-5'>
        <div className='w-52 h-52 rounded-lg overflow-hidden'>
          <img
            className="w-full h-full"
            src={task?.img ? process.env.REACT_APP_BASE_IMAGE_URL + task.img : '/img/placeholder.png'}
            alt={task?.title} />
        </div>
        <div className='flex flex-col justify-center gap-3'>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <span>Time: {task.duration} hours</span>
          <span>Views: {task.views}</span>
          <p>Description: {task.description}</p>
          <div className='flex'>label: 
            <span className='bg-purple-500 ml-2 px-2.5 py-0.5 rounded'>
              {task.label}
            </span>
          </div>
          <p>
            <span className='mr-2'>tags: </span>
            {
              task?.tags?.map(tag => <span className='font-bold' key={tag}>{tag}</span>)
            }
            <span className='font-bold'></span></p>
        </div>
        {isAuth && id && user?.role && user?.role === 'admin' &&
          <div className='flex flex-col justify-between gap-1'>
            <Button onClick={removeHandler} >
              <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" fill='currentColor' />
              </svg>
            </Button>
            <Link to={'/tasks/edit/' + task?._id ?? 'error'} className="btn btn--primary radius">
              <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" fill='currentColor' />
              </svg>
            </Link>
          </div>
        }
      </div>

    </div>
  )
}
