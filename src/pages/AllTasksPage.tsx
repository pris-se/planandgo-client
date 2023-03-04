import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { TaskCard } from '../components/TaskCard'
import { getAll } from '../redux/features/task/taskSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export const AllTasksPage = () => {

    const dispatch = useAppDispatch()
    const {tasks, isLoading} = useAppSelector(state => state.task)

    useEffect(()=> {
        dispatch(getAll())
    },[dispatch])

    if(isLoading) {
        return <Loader />
      }

  return (
    <div className='container'>
        <div className='flex flex-wrap gap-2 py-10'>
            {
                tasks && tasks.map(task => 
                <Link to={'/tasks/' + task._id ?? 'error'} key={task._id}>
                    <TaskCard task={task}/>
                </Link>
                )
            }
        </div>
    </div>
  )
}
