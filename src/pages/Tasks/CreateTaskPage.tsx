import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../redux/features/tasks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TaskForm } from "./TaskForm";

import placeholderImage from "../../assets/img/placeholder.png";

export const CreateTaskPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector((state) => state.task.isLoading);

  const [taskPreview, setTaskPreview] = useState({
    "title": "",
    "description": "",
    "duration": 0,
    "views": 0,
    "tags": [],
    "img": "",
    "category": "",
    "assignCount": 0
  })

  const handleSubmit = async (formData: FormData) => {
    try {
      console.log(formData);

      // const newtask = await dispatch(submitHandlerProps({ ...data, tags: filteredTags }));
      const newtask = await dispatch(createTask(formData));
      if (newtask && !isLoading) {
        console.log(newtask?.payload.task._id);

        navigate("/tasks/" + newtask?.payload.task._id ?? "error");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex full-screen">
      <div className="section flex flex-auto h-full">
        <div className="container h-fit max-h-full my-auto overflow-auto">
          <div className="text-center">
            <h2 className="text-primary mb-8">Create a Task</h2>
          </div>
          <div className="max-w-[360px] mx-auto">
            <TaskForm handleSubmitProps={handleSubmit} setTaskPreview={setTaskPreview} />
          </div>
        </div>
      </div>
      <div className="bg-secondary hidden items-center justify-center w-2/4 flex-shrink-0 md:flex">
        <div className="card card--preview aspect-square w-80">
          <div className="card-top">
            <div className="card-image">
              <span className="badge badge--left badge--success">Creator</span>
              <img
                className="w-full h-full"
                src={
                  taskPreview?.img
                    ? taskPreview?.img
                    : placeholderImage
                }
                alt={taskPreview?.title}
              />
              <span className="badge">Category</span>
              {/* <span className="badge">{taskPreview.category}</span> */}
            </div>
          </div>
          <div className="card-body">
            <h3 className="card-title">{taskPreview.title}</h3>
            {/* <p className="card-desc">{formatedDesc}</p> */}
            <p className="card-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <div className="card-row mt-auto">
              <span className="card-info">
                <span className="font-semibold">Avg. Duration:</span>{" "}
                0
                {/* {task.assignCount && (
                  <Duration time={formatTime(taskPreview.duration / taskPreview.assignCount)} />
                )} */}
              </span>
              <span className="card-info">
                <span className="font-semibold">Usage:</span> {taskPreview.assignCount}
              </span>
            </div>
          </div>
          <div className="card-footer">
            <a href="#"
              className="btn btn--primary rounded w-full btn--lg disabled"
            >
              View Task
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
