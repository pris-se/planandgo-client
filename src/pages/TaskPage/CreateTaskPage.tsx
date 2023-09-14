import React from "react";
import { TaskForm } from "./TaskForm";
import { createTask } from "../../redux/thunks/taskThunks";

export const CreateTaskPage = () => {

  return (
    <div className="section">
      <div className="container">
        <div className="text-center">
          <h2 className="text-primary mb-8">Create a Task</h2>
        </div>
        <div className="max-w-[360px] mx-auto">
          <TaskForm submitHandlerProps={createTask} />
        </div>
      </div>
    </div>
  );
};
