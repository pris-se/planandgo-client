import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskCard } from '../components/TaskCard'
import { getById } from '../redux/features/task/taskSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export const TaskPage = () => {
    const dispatch = useAppDispatch()
    const task = useAppSelector(state => state.task.task)
    
    const {id} = useParams()

    useEffect(()=> {
        if(id) {
            dispatch(getById(id))
        }
    },[dispatch, id])

    if(!task) {
        return <p>There is no tasks</p>
    }

  return (
    <TaskCard task={task} />
  )
}
