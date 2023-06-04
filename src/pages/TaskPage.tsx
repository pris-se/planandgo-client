<<<<<<< HEAD
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import { getById } from "../redux/features/task/thunks/taskThunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Loader } from "../components/Loader";

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const {task, isLoading} = useAppSelector((state) => state.task);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }
  if (!task) {
    return <p>There is no tasks</p>;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-[360px] mx-auto">
          <TaskCard task={task} />
        </div>
      </div>
    </section>
  );
};
=======
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
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
