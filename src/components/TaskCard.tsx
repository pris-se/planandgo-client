import React from "react";
import { Link } from "react-router-dom";
import { ITask } from "../models/Task.model";

import "react-toastify/dist/ReactToastify.css";
import { formatTime } from "../utils/time";

import placeholderImage from "../assets/img/placeholder.png";
import { addTagLink } from "../utils/tagsFilter";
import { elipsis } from "../utils/elipsis";

interface Props {
  task: ITask;
}

export const TaskCard = ({ task }: Props) => {


  const formatedDesc = addTagLink(elipsis(task.description, 70)).map((str, idx) => {
    if (str?.link) {
      return (
        <Link
          className="tag"
          to={{
            pathname: "/tasks",
            search: `tags=${str.link}`,
          }}
          key={idx}
        >
          {str.string}{" "}
        </Link>
      );
    } else {
      return str.string + " ";
    }
  });

  return (
    <>
      <div className="card">
        <div className="card-top">
          <div className="card-image">
            <img
              className="w-full h-full"
              src={
                task?.img
                  ? process.env.REACT_APP_BASE_IMAGE_URL + task.img
                  : placeholderImage
              }
              alt={task?.title}
            />
            <span className="label">{task.label}</span>
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <p className="card-desc">{formatedDesc}</p>
          <div className="card-row mt-auto">
            <span className="card-info">
              <span className="font-semibold">Duration:</span>{" "}
              {formatTime(task.duration)}
            </span>
            <span className="card-info">
              <span className="font-semibold">Views:</span> {task.views}
            </span>
          </div>
        </div>
        <div className="card-footer">
            <Link
              to={"/tasks/" + task._id ?? "error"}
              className="btn btn--primary radius w-full btn--md"
              key={task._id}
            >
              View Task
            </Link>
        </div>
      </div>
    </>
  );
};
